/* ============================================================
   ui.js — vẽ bàn cờ / ma trận / chip, xử lý chạm
   ============================================================ */

const $ = id => document.getElementById(id);
const cap = s => s.charAt(0).toUpperCase()+s.slice(1);

/* Dải báo tin: đứng đủ lâu để đọc, không bị hover hay render sau đó xoá mất.
   (Thanh nameplate cũ bị onmouseleave dọn ngay, trên điện thoại thì gần như không kịp thấy.) */
let _toastTimer = null;
function khoe(html, giay = 4){
  const t = $("toast"); if(!t) return;
  t.innerHTML = html;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(()=>t.classList.remove("show"), giay*1000);
  t.onclick = ()=>{ t.classList.remove("show"); clearTimeout(_toastTimer); };
}

let _prevRes = [], _prevResLv = null;   // theo dõi CHUYỂN đỏ theo từng chip (kêu "sai" + telemetry A3)

function render(){
  const lv=L(), res=evalCons();

  renderNav(lv);

  if(lv._ch) $("chapterName").textContent = lv._ch;
  $("scene").innerHTML=`<span class="lv-name">Màn ${cur+1} · ${lv.name}</span> ${lv.scene}`
    + (window.speechSynthesis ? ` <button class="say" id="sayBtn" aria-label="Đọc to lời dẫn">🔊</button>` : "");
  /* Mobile: lời dẫn thu gọn 2 dòng — chạm vào là bung/gấp lại */
  $("scene").classList.remove("expanded");
  $("scene").onclick=()=>$("scene").classList.toggle("expanded");
  const sb=$("sayBtn");
  if(sb) sb.onclick=e=>{ e.stopPropagation(); speak(`Màn ${cur+1}. ${lv.name}. ${stripTags(lv.scene)}`); };

  const list = lv.type==="matrix" ? lv.clues : lv.type==="story" ? lv.panels
           : lv.type==="hoilang" ? hlLuat(lv) : lv.cons;
  const head = lv.type==="matrix" ? "Manh mối" : lv.type==="story" ? "Bốn khung tranh"
           : lv.type==="hoilang" ? "Luật hội làng" : "Việc cần xếp";
  $("chips").innerHTML = `<h3>${head}</h3>` +
    list.map((k,i)=>`<div class="chip ${res[i]===true?'ok':res[i]===false?'bad':''}" data-i="${i}"><span class="mark"></span><span class="chip-t">${decorateChipText(k.txt||k.label,k,lv)}</span></div>`).join("");
  $("chips").querySelectorAll(".chip").forEach(el=>el.onclick=()=>highlightCons(+el.dataset.i));
  $("chips").querySelectorAll(".ref").forEach(el=>{
    const [kind,id]=el.dataset.ref.split(":");
    el.onclick=e=>{ e.stopPropagation(); if(window.SFX) SFX.play("cham"); flashRef(kind,id); };
    el.onpointerenter=e=>{ if(e.pointerType==="mouse") flashRef(kind,id); };   // hover chỉ là quà thêm cho desktop
  });

  if(_prevResLv!==lv.id){ _prevRes=[]; _prevResLv=lv.id; }
  let newRed=false;
  res.forEach((r,i)=>{ if(r===false && _prevRes[i]!==false){ newRed=true; attRed(i); } });
  if(newRed && window.SFX) SFX.play("sai");
  _prevRes = res.slice();

  /* Nút 💡 bình thường đứng nép; chỉ sáng gọi mời khi bé đang bí thật sự */
  $("hintBtn").classList.toggle("glow", attStruggling());

  /* A8: gần xong (≥3/4 xanh) — viền bàn ấm lên như đèn sắp hội */
  const okN = res.filter(r=>r===true).length;
  $("stagebox").classList.toggle("almost", res.length>0 && okN/res.length>=0.75 && !isWon(res));

  if(lv.type==="matrix") renderMatrix(lv);
  else if(lv.type==="hoilang") renderHoiLang(lv);
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
const CH_ICON = {1:"tam",2:"bom",3:"khoai",4:"giongts",4.5:"phuong",5:"sontinh",6:"tan",7:"antiem",8:"cuoi",99:"but"};

function renderNav(lv){
  let idx=0;
  const spans = CHAPTERS.map(c=>{ const s={c,start:idx,end:idx+c.levels.length-1}; idx+=c.levels.length; return s; });
  let maxUnlocked=0; while(done.includes(maxUnlocked)) maxUnlocked++;   // màn dở đầu tiên
  const curSpan = spans.find(s=>cur>=s.start&&cur<=s.end);

  $("dots").innerHTML =
    `<div class="chsel">`+spans.map(s=>{
      /* đề vô tận không tính vào tiến trình chương — kẻo card không bao giờ "✓ xong" */
      const total=s.c.levels.filter(l=>!l.voTan).length;
      const doneCount=s.c.levels.reduce((n,l,j)=>n+(!l.voTan&&done.includes(s.start+j)?1:0),0);
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
      if(l.voTan) return "";   // đề vô tận không nằm trong mạch chương
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

/* ============================================================
   D3: GỢI Ý NÂNG DẦN — bấm 💡 lần 1: lời nói · lần 2: nháy
   đối tượng · lần 3: bàn tay chỉ thẳng ô cần điền.
   Bậc 3 dùng bộ giải thật (backtracking) — không hard-code đáp án.
   ============================================================ */
let hintTier=0, hintCount=0;   // reset trong load(); hintCount để dành cho telemetry A3

const HINT_STRAT={
  adjEnv:"Tìm xem chỗ đó nằm ở đâu trên bàn trước đã.",
  adjChar:"Hai nhân vật này phải đứng sát vách nhau.",
  notAdjEnv:"Chữ KHÔNG là quan trọng đấy — phải tránh xa ra.",
  notAdjChar:"Chữ KHÔNG là quan trọng đấy — hai người này phải tách nhau ra.",
  behind:"Nhìn mũi tên đỏ chỉ hướng mặt — sau lưng là phía ngược lại.",
  onEnv:"Không phải đứng cạnh đâu — đứng LÊN hẳn đấy!",
  hideIn:"Phải chui hẳn vào trong mà nấp.",
  listen:"Kề bên nhưng đừng để bị thấy: sau lưng, sau rào, hoặc nấp trong bụi.",
  chain:"Cả nhóm phải đứng nối liền nhau, không đứt quãng.",
  line:"Cả nhóm phải đứng thẳng một hàng liền nhau.",
  queue:"Nối đuôi đúng THỨ TỰ — nhưng được GẤP KHÚC, không cần thẳng hàng!",
  notTer:"Nhìn màu ô đất — ô nâu sẫm là bùn."
};

function hintList(lv){
  return lv.type==="matrix"?lv.clues : lv.type==="story"?lv.panels
       : lv.type==="hoilang"?hlLuat(lv) : lv.cons;
}
function pickHintCon(){
  const lv=L(), res=evalCons();
  const list = hintList(lv);
  let i=res.indexOf(false); if(i<0) i=res.indexOf(null);
  return i<0 ? null : {i, k:list[i]};
}

function giveHint(){
  const lv=L(); hintCount++;
  if(window.SFX) SFX.play("cham");
  const pick=pickHintCon();
  if(!pick){ $("nameplate").innerHTML="💡 Sắp xong rồi — xem còn ai chưa được đặt nào!"; return; }
  hintTier=Math.min(hintTier+1,3);
  attHint(hintTier);
  const {i,k}=pick;
  if(hintTier===1){
    const txt=stripTags(k.txt||k.cue||k.label||"");
    const strat = lv.type==="matrix" ? "Đọc kỹ manh mối này rồi nhìn lên bảng nhé."
      : lv.type==="story" ? "Nhớ lại xem trong truyện lúc ấy chuyện gì xảy ra."
      : lv.type==="hoilang" ? "Ai đứng vùng màu nấy — tìm người còn ÍT chỗ đứng nhất mà đặt trước."
      : (HINT_STRAT[k.t]||"");
    $("nameplate").innerHTML=`💡 <b>${txt}</b> — ${strat}`;
    speak(txt+". "+strat);
  } else if(hintTier===2){
    $("nameplate").innerHTML="💡 Nhìn những chỗ đang nháy kìa!";
    highlightCons(i);
  } else {
    hintPoint(i,k);
  }
}

/* Bậc 3 — chỉ thẳng chỗ cần điền */
function hintPoint(i,k){
  const lv=L();
  const hand='<span class="tut-hand">👆</span>';
  if(lv.type==="hoilang"){
    /* đề sinh máy luôn kèm lời giải — chỉ người đầu tiên đang lệch chỗ */
    const wrong=c=>{ const p=place[c], s=lv.loiGiai[c];
      return !p || p[0]!==s[0] || p[1]!==s[1]; };
    const c=lv.chars.find(wrong);
    if(!c) return;
    const [x,y]=lv.loiGiai[c];
    const cell=document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if(cell){ cell.insertAdjacentHTML("beforeend",hand); flashEls([cell]); }
    if(!place[c]) flashEls([$("tray").querySelector(`.tray-slot[data-c="${c}"]`)]);
    $("nameplate").innerHTML=`💡 Đặt <b>${CHARS[c].name}</b> vào ô đang nháy!`;
    return;
  }
  if(lv.type==="story"){
    const slot=$("tray").querySelector(`.tray-slot[data-c="${k.answer}"]`);
    const pf=document.querySelectorAll(".pf")[i];
    if(slot) slot.insertAdjacentHTML("beforeend",hand);
    flashEls([slot,pf]);
    $("nameplate").innerHTML="💡 Mảnh này — đặt vào khung đang nháy!";
    return;
  }
  if(lv.type==="matrix"){
    const sol=solveMatrix();
    if(!sol){ $("nameplate").innerHTML="💡 Thử bỏ hết dấu ✓ rồi làm lại từng manh mối."; return; }
    const r=(k.c && mAssign[k.c]!==sol[k.c]) ? k.c : lv.rows.find(rr=>mAssign[rr]!==sol[rr]);
    if(!r) return;
    const cell=document.querySelector(`.mcell[data-r="${r}"][data-col="${sol[r]}"]`);
    if(cell){ cell.insertAdjacentHTML("beforeend",hand); flashEls([cell]); }
    $("nameplate").innerHTML=`💡 <b>${CHARS[r].name}</b> — chạm vào ô đang nháy!`;
    return;
  }
  const sol=solveLevel();
  if(!sol){ $("nameplate").innerHTML="💡 Thử Xếp lại rồi làm từng việc một nhé."; return; }
  const wrong = c => !place[c] || place[c][0]!==sol[c][0] || place[c][1]!==sol[c][1];
  const c=[k.c,k.target,...(k.cs||[])].filter(Boolean).find(wrong) || lv.chars.find(wrong);
  if(!c) return;
  const [x,y]=sol[c];
  const cell=document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
  if(cell){ cell.insertAdjacentHTML("beforeend",hand); flashEls([cell]); }
  if(!place[c]) flashEls([$("tray").querySelector(`.tray-slot[data-c="${c}"]`)]);
  $("nameplate").innerHTML=`💡 Đặt <b>${CHARS[c].name}</b> vào ô đang nháy!`;
}

/* Bộ giải màn xếp chỗ — backtracking, ưu tiên giữ các quân người chơi đã đặt
   (để gợi ý không bắt dời quân đang đúng). Cũng là nền cho bộ sinh đề C1 sau này. */
function solveLevel(){
  const lv=L(); if(lv.type!=="place") return null;
  const saved={...place};
  const em=envCellMap();
  const free=[];
  for(let y=0;y<lv.rows;y++) for(let x=0;x<lv.cols;x++){
    if(isBlocked(x,y)||extraAt(x,y)) continue;
    free.push([x,y]);
  }
  for(const c of lv.chars) place[c]=null;
  let sol=null;
  const bad=()=>evalCons().some(r=>r===false);
  function bt(i){
    if(i===lv.chars.length){
      if(evalCons().every(r=>r===true)){ sol={...place}; return true; }
      return false;
    }
    const c=lv.chars[i];
    const order = saved[c]
      ? [saved[c], ...free.filter(p=>p[0]!==saved[c][0]||p[1]!==saved[c][1])]
      : free;
    for(const [x,y] of order){
      if(charAt(x,y)) continue;
      const e=em[key(x,y)];
      if(e && !canOccupy(c,e)) continue;
      place[c]=[x,y];
      if(!bad() && bt(i+1)) return true;
      place[c]=null;
    }
    return false;
  }
  bt(0);
  for(const k2 in place) delete place[k2];
  Object.assign(place,saved);
  return sol;
}

/* Bộ giải ma trận — thử mọi cách gán, bảng nhỏ nên tức thời */
function solveMatrix(){
  const lv=L(); if(lv.type!=="matrix") return null;
  const saved={...mAssign};
  for(const r of lv.rows) mAssign[r]=null;
  let sol=null;
  function bt(i){
    if(i===lv.rows.length){
      if(evalCons().every(r=>r===true)){ sol={...mAssign}; return true; }
      return false;
    }
    for(const col of lv.colsM){
      mAssign[lv.rows[i]]=col;
      if(!evalCons().some(r=>r===false) && bt(i+1)) return true;
      mAssign[lv.rows[i]]=null;
    }
    return false;
  }
  bt(0);
  for(const k2 in mAssign) delete mAssign[k2];
  Object.assign(mAssign,saved);
  return sol;
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
  if(lv.type==="hoilang"){
    if(i>=4){                                   // chip mốc: nháy mốc + người phải kề
      const m=lv.moc[i-4];
      if(m){ els.push(cellEl(m.o[0],m.o[1]));
        const p=place[m.c];
        els.push(p?cellEl(p[0],p[1]):$("tray").querySelector(`.tray-slot[data-c="${m.c}"]`)); }
    } else {                                    // luật chung: nháy những người đã đặt
      for(const c of lv.chars){ const p=place[c]; if(p) els.push(cellEl(p[0],p[1])); }
    }
    flashEls(els); return;
  }
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
  /* cửa sổ thấp (laptop nhỏ, ngang): ô còn phải lọt theo CHIỀU CAO — chừa chỗ header/khay/tên */
  const availH = window.innerHeight-225;
  const cw=Math.max(44,Math.min(76,Math.floor((avail-30)/lv.cols),Math.floor((availH-30)/lv.rows)));

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

/* ===== Hội làng: lưới có VÙNG tô màu, mốc cảnh vật và vật cản ===== */
function renderHoiLang(lv){
  $("tray").style.display="";
  const wide = window.innerWidth>=880;
  const avail = wide ? Math.min(window.innerWidth-440,700) : Math.min(window.innerWidth,660)-60;
  const availH = window.innerHeight-225;
  const cw = Math.max(44,Math.min(76, Math.floor((avail-30)/lv.cols), Math.floor((availH-30)/lv.rows)));

  let html=`<div class="board hoi" style="--cw:${cw}px;grid-template-columns:repeat(${lv.cols},${cw}px)">`;
  for(let y=0;y<lv.rows;y++) for(let x=0;x<lv.cols;x++){
    const v   = hlVungCua(lv,x,y);
    const can = lv.vatCan.some(o=>o[0]===x&&o[1]===y);
    const moc = lv.moc.find(m=>m.o[0]===x&&m.o[1]===y);
    const ch  = charAt(x,y);
    const nhan = held && !ch && hlDatDuoc(lv,held,x,y);

    let cls="cell";
    if(v>=0) cls+=" v"+(v%8);
    if(can||moc) cls+=" canh";
    if(nhan) cls+=" sel-target";

    /* viền dày ở cạnh giáp vùng khác — cho mắt thấy ranh giới địa danh */
    let vien="";
    for(const [dx,dy,ten] of [[0,-1,"top"],[0,1,"bottom"],[-1,0,"left"],[1,0,"right"]]){
      const nx=x+dx, ny=y+dy;
      const ngoai = nx<0||ny<0||nx>=lv.cols||ny>=lv.rows;
      if(v>=0 && (ngoai || hlVungCua(lv,nx,ny)!==v)) vien+=`border-${ten}:3px solid var(--muc);`;
    }

    let inner="";
    if(can) inner+=ENVS[lv.canArt].svg;
    if(moc) inner+=ENVS[moc.art||lv.mocArt].svg;
    if(ch)  inner+=`<div class="tok ${held===ch?'held':''}">${CHARS[ch].svg}</div>`;

    const lbl = ch?CHARS[ch].name : moc?ENVS[moc.art||lv.mocArt].name : can?ENVS[lv.canArt].name
              : v>=0?lv.tenVung[v] : `ô trống ${x+1},${y+1}`;
    html+=`<button class="${cls}" style="${vien}" data-x="${x}" data-y="${y}" aria-label="${lbl}">${inner}</button>`;
  }
  html+="</div>";
  $("stagebox").innerHTML=html;
  $("stagebox").querySelectorAll(".cell").forEach(c=>{
    const x=+c.dataset.x, y=+c.dataset.y;
    c.onclick=()=>tapHoiLang(lv,x,y);
    c.onmouseenter=()=>{ const v=hlVungCua(lv,x,y), ch=charAt(x,y);
      const m=lv.moc.find(o=>o.o[0]===x&&o.o[1]===y);
      $("nameplate").innerHTML = ch?`<b>${CHARS[ch].name}</b>`
        : m?`<b>${cap(ENVS[m.art||lv.mocArt].name)}</b> — ${CHARS[m.c].name} phải đứng kề bên`
        : lv.vatCan.some(o=>o[0]===x&&o[1]===y)?`<b>${cap(ENVS[lv.canArt].name)}</b> — không đứng lên được`
        : v>=0?`<b>${lv.tenVung[v]}</b>` : ""; };
    c.onmouseleave=()=>{ $("nameplate").innerHTML=""; };
  });

  $("tray").innerHTML=lv.chars.map((c,i)=>
    `<button class="tray-slot ${held===c?'held':''} ${place[c]?'placed':''} tv${i%8}" data-c="${c}">
      ${CHARS[c].svg}<span>${CHARS[c].name}</span></button>`).join("");
  $("tray").querySelectorAll(".tray-slot").forEach(s=>s.onclick=()=>{
    const c=s.dataset.c; if(place[c]) return;
    held = held===c ? null : c; render();
  });
}

function tapHoiLang(lv,x,y){
  const ch=charAt(x,y);
  if(held){
    if(ch){ held=ch; place[ch]=null; render(); return; }        // đổi sang nhấc người đang đứng
    if(hlDatDuoc(lv,held,x,y)){ place[held]=[x,y]; held=null; }
    render(); return;
  }
  if(ch){ held=ch; place[ch]=null; render(); }
}

function showName(x,y){
  const em=envCellMap(), e=em[key(x,y)], ex=extraAt(x,y);
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
  /* Di vật có thể nấp TRONG cảnh vật (bụi tre, tảng đá…) — chạm là nhặt, ưu tiên trước hiện-tên */
  const nhatDiVat = () => {
    const r = relicAt(x,y);
    if(!r || held || ch) return false;
    collectRelic(r.id); sfx("ding"); render();
    const d = RELICS[r.id] || {name:"Một vật lạ", lore:"chưa rõ là gì…", svg:""};
    khoe(`<span class="toast-ic">${d.svg||""}</span>`
       + `<span><b>✨ Nhặt được: ${d.name}</b><i>${d.lore}</i></span>`
       + `<span class="toast-tui">đã cất vào 🧺 Túi đồ</span>`);
    return true;
  };
  if(e){
    if(ch && !held){ held=ch; place[ch]=null; sfx("cham"); render(); return; }  // nhấc người đang trèo/nấp
    if(held && canOccupy(held,e) && !ch){ place[held]=[x,y]; held=null; sfx("pop"); render(); return; } // trèo/nấp
    if(nhatDiVat()) return;
    showName(x,y); return;
  }
  if(isBlocked(x,y)||extraAt(x,y)){ if(nhatDiVat()) return; showName(x,y); return; }
  if(held){
    if(ch){ held=ch; sfx("cham"); render(); return; }
    place[held]=[x,y]; held=null; sfx("pop"); render();
  } else if(ch){ held=ch; place[ch]=null; sfx("cham"); render(); }
  else nhatDiVat();
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
  /* Ngăn hai: tem truyện — mỗi chương xong trọn là một con tem */
  const stamps = chapterStamps();
  const gotN = stamps.filter(s => s.got).length;
  $("bagGrid").innerHTML +=
    `<div class="bag-sec">Tem truyện — ${gotN}/${stamps.length}</div>` +
    stamps.map(stampHtml).join("");
  $("bagTitle").textContent = `Túi đồ — ${relicsGot.length}/${ids.length} di vật · ${gotN}/${stamps.length} tem`;
}

/* ============================================================
   C2: GÓC CHA MẸ — tổng hợp lct_log theo 5 kỹ năng.
   Nguyên tắc đã chốt: mô tả BẰNG LỜI, không chấm điểm số;
   chỉ so bé với chính bé; gợi ý bấm 💡 là thói quen TỐT.
   ============================================================ */
function skillStats(){
  let log=[]; try{ log=JSON.parse(localStorage.getItem("lct_log")||"[]"); }catch(e){}
  const byId={}; LEVELS.forEach(l=>byId[l.id]=l);
  const st={};
  for(const k in SKILL_NAMES) st[k]={played:0,finished:0,clean:0,hintTaps:0,struggle:0};
  const vuong=[];   // các màn gần đây bé đang vướng — để bố mẹ ngồi cùng
  for(const r of log){
    const lv=byId[r.levelId]; if(!lv||!lv.skills) continue;
    lv.skills.forEach((sk,idx)=>{
      const s=st[sk]; if(!s) return;
      const w = idx===0 ? 1 : 0.5;              // nhãn chính đủ, nhãn phụ nửa
      s.played+=w;
      if(r.finished) s.finished+=w;
      if(r.clean && (lv.tier||2)>=2) s.clean+=w; // "sạch" chỉ tính từ màn vận dụng trở lên
      s.hintTaps+=r.hintTaps||0;
      if(!r.finished || r.redMaxRepeat>=3 || r.resets>=2) s.struggle+=w;
    });
    if(!r.finished || r.redMaxRepeat>=3) vuong.push(lv);
  }
  return {st, log, vuong};
}

function mucKyNang(s){
  if(s.played===0)   return ["·","Chưa chạm tới — còn ở phía trước."];
  if(s.clean>=2)     return ["●●●","Vững — tự giải sạch được cả màn khó."];
  if(s.finished>=3)  return ["●●","Đang tiến bộ — làm được đều tay."];
  return ["●","Đang làm quen — cần thêm thời gian chơi."];
}

function renderParent(){
  const {st, log, vuong} = skillStats();
  const tongHint = log.reduce((n,r)=>n+(r.hintTaps||0),0);
  let html = `<p class="p-intro">Ghi nhận từ <b>${log.length}</b> lượt chơi gần đây, ngay trên máy này —
    không gửi đi đâu cả.</p>`;
  html += Object.keys(SKILL_NAMES).map(k=>{
    const [dot,loi]=mucKyNang(st[k]);
    return `<div class="p-row"><b class="p-dot">${dot}</b>
      <span class="p-name">${SKILL_NAMES[k]}</span>
      <span class="p-loi">${loi}</span></div>`;
  }).join("");
  if(tongHint>0)
    html += `<p class="p-note">✦ Bé đã tự bấm 💡 xin gợi ý <b>${tongHint}</b> lần —
      biết tìm trợ giúp đúng lúc là một thói quen tốt, không phải điểm trừ.</p>`;
  const gan=[...new Map(vuong.slice(-6).map(l=>[l.id,l])).values()].slice(-3);
  if(gan.length)
    html += `<p class="p-note">🤝 Gợi ý cùng chơi: bé đang vướng ở
      ${gan.map(l=>`<b>${l.name}</b>`).join(", ")} — thử ngồi cạnh, để bé tự làm,
      chỉ hỏi “con định đặt ai trước?”.</p>`;
  html += `<p class="p-disclaimer">Đây là quan sát khi chơi — không phải bài kiểm tra
    hay chẩn đoán. Mỗi bé một nhịp; chỉ so bé với chính bé tuần trước.</p>`;
  $("parentBody").innerHTML=html;
}

/* ============================================================
   A6: TEM TRUYỆN — xong trọn một chương được một con tem Đông Hồ.
   Tem SUY RA từ save (mọi màn của chương đều done) — không lưu riêng,
   không bao giờ lệch, chương xong từ trước cũng tự có tem.
   Hội làng (id 99) là chế độ phụ: không tem.
   ============================================================ */
function chapterStamps(){
  return CHAPTERS.filter(c => c.id !== 99).map((c, i) => {
    const start = LEVELS.indexOf(c.levels[0]);
    const got = c.levels.every((_, j) => done.includes(start + j));
    let icKey = CH_ICON[c.id];
    if(!icKey || !CHARS[icKey]){
      const pl = c.levels.find(l => l.chars && l.chars.length);
      icKey = pl ? pl.chars[0] : "but";
    }
    return { id:c.id, title:(c.name.split("·")[1] || c.name).trim(),
             svg:CHARS[icKey].svg, got, rot:(i % 2 ? 2 : -2) };
  });
}
function stampHtml(s){
  return `<div class="stamp ${s.got ? "" : "locked"}" style="--rot:${s.rot}deg">
    <div class="stamp-in">${s.got ? s.svg : '<div class="qmark">?</div>'}
      <b>${s.got ? s.title : "???"}</b>
      <span>LÀNG CỔ TÍCH · 1 xu</span></div></div>`;
}

/* ============================================================
   A8: HIỆU ỨNG THẮNG — lá tre + cánh đào rơi. CSS thuần, tự dọn.
   ============================================================ */
function fxWin(){
  try{ if(matchMedia("(prefers-reduced-motion: reduce)").matches) return; }catch(e){}
  let fx=$("fx");
  if(!fx){ fx=document.createElement("div"); fx.id="fx"; document.body.appendChild(fx); }
  const mau=["#5A7D3C","#DE7BA4","#E3A72F","#C8452A","#7FA88F"];
  for(let i=0;i<20;i++){
    const p=document.createElement("span");
    p.className="fx-p";
    p.style.left=(4+Math.random()*92)+"vw";
    p.style.background=mau[i%mau.length];
    if(i%4===1){ p.style.width="9px"; p.style.height="9px"; p.style.borderRadius="50%"; } // cánh đào
    p.style.animationDelay=(Math.random()*.4)+"s";
    p.style.animationDuration=(1.6+Math.random()*1.3)+"s";
    p.style.setProperty("--drift",(Math.random()*90-45)+"px");
    p.style.setProperty("--spin",(Math.random()*720-360)+"deg");
    p.addEventListener("animationend",()=>p.remove());
    setTimeout(()=>p.remove(), 4500);   // tab nền hoãn animation → animationend không nổ; dọn kiểu gì cũng sạch
    fx.appendChild(p);
  }
}
