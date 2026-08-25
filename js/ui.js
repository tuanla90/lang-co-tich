/* ============================================================
   ui.js — vẽ bàn cờ / ma trận / chip, xử lý chạm
   ============================================================ */

const $ = id => document.getElementById(id);

let _lastBad = 0;   // đếm chip đỏ để kêu "sai" đúng lúc chuyển đỏ

function render(){
  const lv=L(), res=evalCons();

  renderNav(lv);

  if(lv._ch) $("chapterName").textContent = lv._ch;
  $("scene").innerHTML=`<span class="lv-name">Màn ${cur+1} · ${lv.name}</span> ${lv.scene}`
    + (window.speechSynthesis ? ` <button class="say" id="sayBtn" aria-label="Đọc to lời dẫn">🔊</button>` : "");
  const sb=$("sayBtn");
  if(sb) sb.onclick=()=>speak(`Màn ${cur+1}. ${lv.name}. ${stripTags(lv.scene)}`);

  const list = lv.type==="matrix" ? lv.clues : lv.type==="story" ? lv.panels : lv.cons;
  const head = lv.type==="matrix" ? "Manh mối" : lv.type==="story" ? "Bốn khung tranh" : "Việc cần xếp";
  $("chips").innerHTML = `<h3>${head}</h3>` +
    list.map((k,i)=>`<div class="chip ${res[i]===true?'ok':res[i]===false?'bad':''}" data-i="${i}"><span class="mark"></span><span class="chip-t">${decorateChipText(k.txt||k.label,k,lv)}</span></div>`).join("");
  $("chips").querySelectorAll(".chip").forEach(el=>el.onclick=()=>highlightCons(+el.dataset.i));
  $("chips").querySelectorAll(".ref").forEach(el=>{
    const [kind,id]=el.dataset.ref.split(":");
    el.onclick=e=>{ e.stopPropagation(); if(window.SFX) SFX.play("cham"); flashRef(kind,id); };
    el.onpointerenter=e=>{ if(e.pointerType==="mouse") flashRef(kind,id); };   // hover chỉ là quà thêm cho desktop
  });

  const badN = res.filter(r=>r===false).length;
  if(badN>_lastBad && window.SFX) SFX.play("sai");
  _lastBad = badN;

  if(lv.type==="matrix") renderMatrix(lv);
  else if(lv.type==="story") renderStory(lv);
  else renderBoard(lv);

  if(isWon(res)){
    if(lv.type==="story"){
      const w=$("stagebox").querySelector(".storywrap");
      if(w) w.classList.add("revealed");
      setTimeout(win,2600);              // nhường chỗ cho cú lộ trước khi hiện hộp thắng
    } else setTimeout(win,450);
  }
}

/* ===== Bộ chọn chương (bản đồ làng thu nhỏ) + chấm màn theo chương ===== */
const CH_ICON = {1:"tam",2:"bom",3:"khoai",4:"giongts",5:"sontinh",6:"tan",7:"antiem",8:"cuoi"};

function renderNav(lv){
  let idx=0;
  const spans = CHAPTERS.map(c=>{ const s={c,start:idx,end:idx+c.levels.length-1}; idx+=c.levels.length; return s; });
  let maxUnlocked=0; while(done.includes(maxUnlocked)) maxUnlocked++;   // màn dở đầu tiên
  const curSpan = spans.find(s=>cur>=s.start&&cur<=s.end);

  $("dots").innerHTML =
    `<div class="chsel">`+spans.map(s=>{
      const total=s.c.levels.length;
      const doneCount=s.c.levels.reduce((n,_,j)=>n+(done.includes(s.start+j)?1:0),0);
      const locked=!window.DEV && s.start>maxUnlocked;
      let icKey=CH_ICON[s.c.id];
      if(!icKey||!CHARS[icKey]){ const pl=s.c.levels.find(l=>l.chars&&l.chars.length); icKey=pl?pl.chars[0]:"but"; }
      const title=(s.c.name.split("·")[1]||s.c.name).trim();
      return `<button class="ch-card ${s===curSpan?'cur':''} ${locked?'locked':''} ${doneCount===total?'full':''}"
        data-s="${s.start}" data-e="${s.end}" ${locked?'disabled':''} aria-label="${s.c.name} — ${doneCount}/${total} màn">
        <span class="ch-ic">${locked?'<span class="ch-lock">🔒</span>':CHARS[icKey].svg}</span>
        <b>${title}</b><span class="ch-prog">${doneCount===total?'✓ xong':doneCount+'/'+total}</span></button>`;
    }).join("")+`</div><div class="dots-inner">`
    +(curSpan?curSpan.c.levels.map((l,j)=>{ const i=curSpan.start+j;
      return `<button class="dot ${l.type==='matrix'?'mtx':''} ${l.type==='story'?'sty':''} ${i===cur?'cur':done.includes(i)?'done':''}" data-i="${i}" aria-label="Màn ${i+1}: ${l.name}"></button>`;
    }).join(""):"")+`</div>`;

  $("dots").querySelectorAll(".ch-card:not(.locked)").forEach(b=>b.onclick=()=>{
    const s=+b.dataset.s, e=+b.dataset.e;
    let t=s; while(t<=e && done.includes(t)) t++;   // vào màn dở đầu tiên của chương
    load(Math.min(t,e));
  });
  $("dots").querySelectorAll(".dot").forEach(d=>d.onclick=()=>{ const i=+d.dataset.i;
    if(window.DEV||i===cur||done.includes(i)||i===maxUnlocked) load(i); });
}

/* ===== Đọc to (Web Speech API — giọng vi-VN nếu máy có) ===== */
function stripTags(s){ const d=document.createElement("div"); d.innerHTML=s; return d.textContent||""; }
let voiceVN=null;
function pickVoice(){ try{
  voiceVN = speechSynthesis.getVoices().find(v=>(v.lang||"").toLowerCase().indexOf("vi")===0)||null;
}catch(e){} }
if(window.speechSynthesis){ pickVoice(); speechSynthesis.onvoiceschanged=pickVoice; }
function speak(text){
  if(!window.speechSynthesis) return;
  if(speechSynthesis.speaking){ speechSynthesis.cancel(); return; }   // bấm lần nữa = dừng
  const u=new SpeechSynthesisUtterance(text);
  if(voiceVN) u.voice=voiceVN;
  u.lang="vi-VN"; u.rate=1;
  speechSynthesis.speak(u);
}

/* ===== Từ chỉ đối tượng trong chip: đeo mini-icon, chạm/hover → nháy đúng đối tượng.
   Chữ GIỮ NGUYÊN (tập đọc), icon đứng cạnh từ — kiểu sách tập đọc chữ-kèm-hình. ===== */
function consRefs(k, lv){
  const refs=[];
  if(lv.type==="matrix"){
    if(k.c && CHARS[k.c])   refs.push({kind:"mrow", id:k.c,   name:CHARS[k.c].name,  svg:CHARS[k.c].svg});
    if(k.col && PLACES[k.col]) refs.push({kind:"mcol", id:k.col, name:PLACES[k.col].name, svg:PLACES[k.col].svg});
    return refs;
  }
  if(lv.type==="story") return refs;
  for(const c of [k.c,k.target].filter(Boolean).concat(k.cs||[]))
    if(CHARS[c]) refs.push({kind:"char", id:c, name:CHARS[c].name, svg:CHARS[c].svg});
  if(k.e && ENVS[k.e]) refs.push({kind:"env", id:k.e, name:ENVS[k.e].name, svg:ENVS[k.e].svg});
  return refs;
}
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function decorateChipText(txt, k, lv){
  let out=txt;
  const usedNames=new Set();   // nhóm trùng tên (3 đốt tre, 2 lính…): từ chỉ đeo MỘT icon
  for(const r of consRefs(k,lv)){
    if(out.includes(`data-ref="${r.kind}:${r.id}"`)) continue;
    if(usedNames.has(r.name)) continue;
    /* thử tên đầy đủ trước, rồi rút bớt từ cuối: "Tân (anh)"→"Tân", "cây thuốc quý"→"cây thuốc" */
    const base=r.name.split("(")[0].trim();
    const words=base.split(" ");
    const candidates=[base]; if(words.length>1) candidates.push(words.slice(0,-1).join(" "));
    for(const cand of candidates){
      if(cand.length<2) continue;
      const re=new RegExp(`(^|[^\\p{L}])(${escRe(cand)})(?=[^\\p{L}]|$)`,"iu");
      if(re.test(out)){
        out=out.replace(re,(m,pre,word)=>
          `${pre}<span class="ref" data-ref="${r.kind}:${r.id}">${word}<span class="ref-ic">${r.svg}</span></span>`);
        usedNames.add(r.name);
        break;
      }
    }
  }
  return out;
}
function flashRef(kind,id){
  const els=[];
  const cellEl=(x,y)=>document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
  if(kind==="char"){ const p=place[id];
    els.push(p?cellEl(p[0],p[1]):document.querySelector(`.tray-slot[data-c="${id}"]`)); }
  else if(kind==="env"){ const env=L().env.find(v=>v.id===id);
    if(env) env.cells.forEach(p=>els.push(cellEl(p[0],p[1]))); }
  else if(kind==="mrow") els.push(document.querySelector(`.mrowhead[data-r="${id}"]`));
  else if(kind==="mcol") els.push(document.querySelector(`.mhead[data-col="${id}"]`));
  flashEls(els);
}

/* ===== Chạm chip → nháy các ô liên quan trên bàn ===== */
function flashEls(els){
  els.filter(Boolean).forEach(el=>{
    el.classList.remove("flash"); void el.offsetWidth;   // restart animation
    el.classList.add("flash");
    setTimeout(()=>el.classList.remove("flash"),1500);
  });
}
function highlightCons(i){
  const lv=L(); if(window.SFX) SFX.play("cham");
  const els=[];
  const cellEl=(x,y)=>document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
  if(lv.type==="story"){
    const pf=document.querySelectorAll(".pf")[i]; if(pf) els.push(pf);
  } else if(lv.type==="matrix"){
    const k=lv.clues[i];
    if(k.c)   els.push(document.querySelector(`.mrowhead[data-r="${k.c}"]`));
    if(k.col) els.push(document.querySelector(`.mhead[data-col="${k.col}"]`));
  } else {
    const k=lv.cons[i];
    const charEl=c=>{ const p=place[c];
      els.push(p?cellEl(p[0],p[1]):document.querySelector(`.tray-slot[data-c="${c}"]`)); };
    [k.c,k.target].filter(Boolean).forEach(charEl);
    (k.cs||[]).forEach(charEl);
    if(k.e){ const env=lv.env.find(v=>v.id===k.e); if(env) env.cells.forEach(p=>els.push(cellEl(p[0],p[1]))); }
    if(k.t==="notTer") lv.mud.forEach(p=>els.push(cellEl(p[0],p[1])));
  }
  flashEls(els);
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
    const e=em[key(x,y)], blk=isBlocked(x,y), mud=isMud(x,y), ch=charAt(x,y), ex=extraAt(x,y);
    const climbable = e && held && canOccupy(held,e) && !ch && !ex;
    let cls="cell";
    if(e){ cls+=" env"; if(ENVS[e].water) cls+=" water"; }
    if(mud) cls+=" mud";
    if(blk) cls+=" rocked";
    if(held&&((!e&&!blk&&!ch&&!ex)||climbable)) cls+=" sel-target";
    if(hints.has(key(x,y))) cls+=" behind-hint";

    /* nền môi trường vẽ trước, nhân vật chồng lên trên (Tấm trèo cau) */
    let inner="";
    if(e) inner+=ENVS[e].svg;
    if(blk) inner+=ENVS.rom.svg;
    if(mud&&!ch&&!e) inner+=ENVS.bunsvg.svg;
    if(ch){
      const hiding = e && (lv.cons.some(k=>k.t==="hideIn"&&k.c===ch&&k.e===e)
        || (lv.occupy||[]).some(o=>o.c===ch&&o.e===e&&o.mode==="hide"));
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
    if(ex && !ch) inner+=`<div class="tok">${CHARS[ex.c].svg}</div>`;
    if(relicAt(x,y) && !ch) inner+=`<span class="glint">✦</span>`;
    for(const w of wallsOf()) if(w[0]===x&&w[1]===y)
      inner+=`<div class="wall wall-${w[2]}"></div>`;
    const lbl = ch?CHARS[ch].name : ex?CHARS[ex.c].name : e?ENVS[e].name : blk?"đống rơm" : mud?"vũng bùn" : `ô đất ${x+1},${y+1}`;
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

  /* A2: bàn tay hướng dẫn — chỉ ở màn 1 khi chưa có save nào */
  if(cur===0 && done.length===0){
    const hand=`<span class="tut-hand">👆</span>`;
    const anyPlaced=lv.chars.some(c=>place[c]);
    if(!held && !anyPlaced){
      const s=$("tray").querySelector(`.tray-slot[data-c="${lv.chars[0]}"]`);
      if(s) s.insertAdjacentHTML("beforeend",hand);
    } else if(held){
      const k=lv.cons.find(v=>v.t==="adjEnv"&&v.c===held);
      const env=k && lv.env.find(v=>v.id===k.e);
      if(env){ const em2=envCellMap();
        outer: for(const ec of env.cells)
          for(const d of NB){ const x=ec[0]+d[0], y=ec[1]+d[1];
            if(x<0||y<0||x>=lv.cols||y>=lv.rows) continue;
            if(em2[key(x,y)]||isBlocked(x,y)||charAt(x,y)) continue;
            const cell=document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
            if(cell){ cell.insertAdjacentHTML("beforeend",hand); break outer; }
          }
      }
    }
  }
}

function renderMatrix(lv){
  $("tray").style.display="none";
  const n=lv.colsM.length;
  let html=`<div class="mgrid" style="grid-template-columns:76px repeat(${n},minmax(76px,110px))">`;
  html+=`<div class="mcorner"></div>`;
  for(const col of lv.colsM){ const P=PLACES[col];
    html+=`<div class="mhead" data-col="${col}">${P.svg}<b>${P.name}</b>${P.ter?`<span class="mter">${P.ter}</span>`:""}</div>`; }
  for(const r of lv.rows){
    html+=`<div class="mrowhead" data-r="${r}">${CHARS[r].svg}<b>${CHARS[r].name}</b></div>`;
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
    if(window.SFX) SFX.play("cham");
    render();
  });
}

/* ===== Màn kể chuyện: dải khung tranh + khay mảnh hoá thân ===== */
function renderStory(lv){
  $("tray").style.display="";
  /* lv.reuse: một mảnh dùng được cho nhiều khung (vd hai câu thần chú) */
  const used = c => !lv.reuse && Object.values(sAssign).includes(c);

  let html=`<div class="storywrap"><div class="strip">`;
  lv.panels.forEach((p,i)=>{
    const a=sAssign[i], ok=a===p.answer;
    const who=(p.who||[]).map(c=>`<div class="pf-who-tok">${CHARS[c].svg}</div>`).join("");
    html+=`<div class="pf ${a?(ok?'ok':'bad'):''} ${held&&!a?'sel-target':''}">
      <div class="pf-num">${i+1}</div>
      <div class="pf-stage">
        <div class="pf-who">${who}</div>
        <button class="pf-slot" data-i="${i}" aria-label="Khung ${i+1}: ${p.label}">
          ${a?`<div class="pf-piece">${art(a).svg}</div>`:""}</button>
      </div>
      <div class="pf-cue">${p.cue}</div>
      <div class="pf-after">${ok?p.after:""}</div>
    </div>`;
  });
  const rev=art(lv.revealArt);
  html+=`</div><div class="reveal">${rev?`<div class="reveal-art">${rev.svg}</div>`:""}<b>${lv.reveal}</b></div></div>`;
  $("stagebox").innerHTML=html;
  $("stagebox").querySelectorAll(".pf-slot").forEach(s=>s.onclick=()=>tapPanel(+s.dataset.i));

  $("tray").innerHTML=lv.pieces.map(c=>
    `<button class="tray-slot ${held===c?'held':''} ${used(c)?'placed':''}" data-c="${c}">
      ${art(c).svg}<span>${art(c).name}</span></button>`).join("");
  $("tray").querySelectorAll(".tray-slot").forEach(s=>s.onclick=()=>{
    const c=s.dataset.c; if(used(c)) return;
    held = held===c ? null : c; render();
  });
}

function tapPanel(i){
  if(held){
    const reuse=L().reuse;
    if(!reuse) for(const k in sAssign) if(sAssign[k]===held) sAssign[k]=null;  // dời mảnh từ khung khác sang
    sAssign[i]=held;
    if(!reuse) held=null;              // mảnh dùng lại được thì giữ trên tay, đặt tiếp khung sau
    render(); return;
  }
  if(sAssign[i]){ held=sAssign[i]; sAssign[i]=null; render(); }     // nhấc mảnh ra khỏi khung
}

function showName(x,y){
  const em=envCellMap(), e=em[key(x,y)], ex=extraAt(x,y);
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  let t="";
  if(ex && !charAt(x,y)) t=`<b>${CHARS[ex.c].name}</b>${ex.note?` — <i>${ex.note}</i>`:""}`;
  else if(e) t=`<b>${cap(ENVS[e].name)}</b> — ${LORE[e]||""}`;
  else if(isBlocked(x,y)) t=`<b>Đống rơm</b> — ${LORE.rom}`;
  else if(isMud(x,y)) t=`<b>Vũng bùn</b> — ${LORE.bunsvg}`;
  else { const ch=charAt(x,y); if(ch) t=`<b>${CHARS[ch].name}</b>`; }
  $("nameplate").innerHTML=t;
}

function tapCell(x,y){
  const em=envCellMap(), e=em[key(x,y)];
  const ch=charAt(x,y);
  const sfx = n => { if(window.SFX) SFX.play(n); };
  if(e){
    if(ch && !held){ held=ch; place[ch]=null; sfx("cham"); render(); return; }  // nhấc người đang trèo/nấp
    if(held && canOccupy(held,e) && !ch){ place[held]=[x,y]; held=null; sfx("pop"); render(); return; } // trèo/nấp
    showName(x,y); return;
  }
  if(isBlocked(x,y)||extraAt(x,y)){ showName(x,y); return; }
  if(held){
    if(ch){ held=ch; sfx("cham"); render(); return; }
    place[held]=[x,y]; held=null; sfx("pop"); render();
  } else if(ch){ held=ch; place[ch]=null; sfx("cham"); render(); }
  else {
    const r=relicAt(x,y);
    if(r){ collectRelic(r.id); sfx("ding"); render();
      $("nameplate").innerHTML=`✨ Nhặt được: <b>${RELICS[r.id].name}</b> — <i>${RELICS[r.id].lore}</i>`; }
  }
}

/* ===== Túi đồ — bộ sưu tập di vật ===== */
function renderBag(){
  const ids=Object.keys(RELICS);
  $("bagGrid").innerHTML = ids.map(id=>{
    const got=relicsGot.includes(id), r=RELICS[id];
    return got
      ? `<div class="bag-item">${r.svg}<b>${r.name}</b><span>${r.lore}</span></div>`
      : `<div class="bag-item unknown"><div class="qmark">?</div><b>???</b><span>còn giấu đâu đó trong truyện…</span></div>`;
  }).join("");
  $("bagTitle").textContent = `Túi đồ — ${relicsGot.length}/${ids.length} di vật`;
}
