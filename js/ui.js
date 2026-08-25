/* ============================================================
   ui.js — vẽ bàn cờ / ma trận / chip, xử lý chạm
   ============================================================ */

const $ = id => document.getElementById(id);

function render(){
  const lv=L(), res=evalCons();

  $("dots").innerHTML = LEVELS.map((l,i)=>
    `<button class="dot ${l.type==='matrix'?'mtx':''} ${i===cur?'cur':done.includes(i)?'done':''}" data-i="${i}" aria-label="Màn ${i+1}: ${l.name}"></button>`).join("");
  $("dots").querySelectorAll(".dot").forEach(d=>d.onclick=()=>{ const i=+d.dataset.i;
    if(i===cur||done.includes(i)||i===Math.min(done.length,LEVELS.length-1)) load(i); });

  $("scene").innerHTML=`<span class="lv-name">Màn ${cur+1} · ${lv.name}</span> ${lv.scene}`;

  const list = lv.type==="matrix" ? lv.clues : lv.cons;
  $("chips").innerHTML = `<h3>${lv.type==="matrix"?"Manh mối":"Việc cần xếp"}</h3>` +
    list.map((k,i)=>`<div class="chip ${res[i]===true?'ok':res[i]===false?'bad':''}"><span class="mark"></span>${k.txt}</div>`).join("");

  if(lv.type==="matrix") renderMatrix(lv); else renderBoard(lv);

  if(isWon(res)) setTimeout(win,450);
}

function renderBoard(lv){
  $("tray").style.display="";
  const em=envCellMap();
  const wide = window.innerWidth>=880;
  const avail = wide ? Math.min(window.innerWidth-440,700) : Math.min(window.innerWidth,660)-60;
  const cw=Math.min(76,Math.floor((avail-30)/lv.cols));

  const hints=new Set();
  for(const k of lv.cons) if(k.t==="behind"){ const b=behindCell(k.target);
    if(b&&!charAt(b[0],b[1])&&!isBlocked(b[0],b[1])&&!em[key(b[0],b[1])]) hints.add(key(b[0],b[1])); }

  let html=`<div class="board" style="--cw:${cw}px;grid-template-columns:repeat(${lv.cols},${cw}px)">`;
  for(let y=0;y<lv.rows;y++) for(let x=0;x<lv.cols;x++){
    const e=em[key(x,y)], blk=isBlocked(x,y), mud=isMud(x,y), ch=charAt(x,y);
    const climbable = e && held && canOccupy(held,e) && !ch;
    let cls="cell";
    if(e){ cls+=" env"; if(ENVS[e].water) cls+=" water"; }
    if(mud) cls+=" mud";
    if(blk) cls+=" rocked";
    if(held&&((!e&&!blk&&!ch)||climbable)) cls+=" sel-target";
    if(hints.has(key(x,y))) cls+=" behind-hint";

    /* nền môi trường vẽ trước, nhân vật chồng lên trên (Tấm trèo cau) */
    let inner="";
    if(e) inner+=ENVS[e].svg;
    if(blk) inner+=ENVS.rom.svg;
    if(mud&&!ch&&!e) inner+=ENVS.bunsvg.svg;
    if(ch){
      const hiding = e && lv.cons.some(k=>k.t==="hideIn"&&k.c===ch&&k.e===e);
      inner+=`<div class="tok ${held===ch?'held':''} ${hiding?'hiding':''}">${CHARS[ch].svg}</div>`;
      const f=facingOf(ch);
      if(f){ let st="";
        if(f[0]===1)  st=`right:-2px;top:50%;margin-top:-7px;border-left-color:#C8452A`;
        if(f[0]===-1) st=`left:-2px;top:50%;margin-top:-7px;border-right-color:#C8452A`;
        if(f[1]===1)  st=`bottom:-2px;left:50%;margin-left:-7px;border-top-color:#C8452A`;
        if(f[1]===-1) st=`top:-2px;left:50%;margin-left:-7px;border-bottom-color:#C8452A`;
        inner+=`<div class="face-arrow" style="${st}"></div>`;
      }
    }
    for(const w of wallsOf()) if(w[0]===x&&w[1]===y)
      inner+=`<div class="wall wall-${w[2]}"></div>`;
    const lbl = e?ENVS[e].name : blk?"đống rơm" : ch?CHARS[ch].name : mud?"vũng bùn" : `ô đất ${x+1},${y+1}`;
    html+=`<button class="${cls}" data-x="${x}" data-y="${y}" aria-label="${lbl}">${inner}</button>`;
  }
  html+="</div>";
  $("stagebox").innerHTML=html;
  $("stagebox").querySelectorAll(".cell").forEach(c=>{
    const x=+c.dataset.x, y=+c.dataset.y;
    c.onclick=()=>tapCell(x,y);
    c.onmouseenter=()=>showName(x,y);
    c.onmouseleave=()=>{ $("nameplate").innerHTML=""; };
  });

  $("tray").innerHTML=lv.chars.map(c=>{
    const p=place[c];
    return `<button class="tray-slot ${held===c?'held':''} ${p?'placed':''}" data-c="${c}">
      ${CHARS[c].svg}<span>${CHARS[c].name}</span></button>`;
  }).join("");
  $("tray").querySelectorAll(".tray-slot").forEach(s=>s.onclick=()=>{
    const c=s.dataset.c; if(place[c]) return;
    held = held===c ? null : c; render();
  });
}

function renderMatrix(lv){
  $("tray").style.display="none";
  const n=lv.colsM.length;
  let html=`<div class="mgrid" style="grid-template-columns:76px repeat(${n},minmax(76px,110px))">`;
  html+=`<div class="mcorner"></div>`;
  for(const col of lv.colsM){ const P=PLACES[col];
    html+=`<div class="mhead">${P.svg}<b>${P.name}</b>${P.ter?`<span class="mter">${P.ter}</span>`:""}</div>`; }
  for(const r of lv.rows){
    html+=`<div class="mrowhead">${CHARS[r].svg}<b>${CHARS[r].name}</b></div>`;
    for(const col of lv.colsM){
      const a=mAssign[r];
      const mark = a===col ? `<span class="tick">✓</span>` : (a ? `<span class="no">·</span>` : "");
      html+=`<button class="mcell" data-r="${r}" data-col="${col}" aria-label="${CHARS[r].name} ở ${PLACES[col].name}">${mark}</button>`;
    }
  }
  html+="</div>";
  $("stagebox").innerHTML=html;
  $("stagebox").querySelectorAll(".mcell").forEach(c=>c.onclick=()=>{
    const r=c.dataset.r, col=c.dataset.col;
    mAssign[r] = mAssign[r]===col ? null : col;
    render();
  });
}

function showName(x,y){
  const em=envCellMap(), e=em[key(x,y)];
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  let t="";
  if(e) t=`<b>${cap(ENVS[e].name)}</b> — ${LORE[e]||""}`;
  else if(isBlocked(x,y)) t=`<b>Đống rơm</b> — ${LORE.rom}`;
  else if(isMud(x,y)) t=`<b>Vũng bùn</b> — ${LORE.bunsvg}`;
  else { const ch=charAt(x,y); if(ch) t=`<b>${CHARS[ch].name}</b>`; }
  $("nameplate").innerHTML=t;
}

function tapCell(x,y){
  const em=envCellMap(), e=em[key(x,y)];
  const ch=charAt(x,y);
  if(e){
    if(ch && !held){ held=ch; place[ch]=null; render(); return; }      // nhấc người đang trèo/nấp
    if(held && canOccupy(held,e) && !ch){ place[held]=[x,y]; held=null; render(); return; } // trèo lên / nấp vào
    showName(x,y); return;
  }
  if(isBlocked(x,y)){ showName(x,y); return; }
  if(held){
    if(ch){ held=ch; render(); return; }
    place[held]=[x,y]; held=null; render();
  } else if(ch){ held=ch; place[ch]=null; render(); }
}
