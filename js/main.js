/* ============================================================
   main.js — khởi động, chuyển màn, màn thắng
   ============================================================ */

/* Chương xếp theo id (không theo thứ tự thẻ <script>) — chèn chương giữa: đặt id lẻ (vd 2.5) hoặc đánh số lại.
   Tên hiển thị "Chương N" đánh số tự động theo vị trí; meta chỉ cần giữ phần tên truyện.
   Mỗi màn nhận id ổn định "c<idChương>:<tên màn>" — SAVE SAU NÀY PHẢI LƯU THEO id NÀY, không lưu chỉ số. */
CHAPTERS.sort((a, b) => a.id - b.id);
CHAPTERS.forEach((c, i) => {
  const title = c.title || c.name.split("·")[1].trim();
  c.name = `Chương ${i + 1} · ${title}`;
});
LEVELS = CHAPTERS.flatMap(c => c.levels.map(l => {
  l._ch = c.name;
  l.id = l.id || `c${c.id}:${l.name}`;
  return l;
}));
/* ===== Đa ngôn ngữ =====
   Lời dẫn trong file chương được viết dưới dạng khoá "@c1.nuoibong.scene";
   ở đây tra từ điển thay bằng câu thật. Đổi ngôn ngữ = nạp từ điển khác.
   Khoá thiếu thì giữ nguyên chuỗi "@…" để lộ ra ngay, không im lặng nuốt mất. */
const NGON_NGU = (window.I18N && I18N.vi) ? "vi" : null;
function dich(s){
  if(typeof s !== "string" || s[0] !== "@") return s;
  const tu = NGON_NGU && I18N[NGON_NGU];
  const v = tu && tu[s.slice(1)];
  return v === undefined ? s : v;
}
function apDungNgonNgu(ds){
  const thieu = [];
  for(const l of ds){
    for(const f of ["scene","story","reveal"]){
      if(typeof l[f] === "string"){
        const t = dich(l[f]);
        if(t === l[f] && l[f][0] === "@") thieu.push(l[f].slice(1));
        l[f] = t;
      }
    }
    for(const p of (l.panels||[]))
      for(const f of ["label","cue","after"]){
        if(typeof p[f] === "string"){
          const t = dich(p[f]);
          if(t === p[f] && p[f][0] === "@") thieu.push(p[f].slice(1));
          p[f] = t;
        }
      }
  }
  if(thieu.length) console.warn("Thiếu lời dẫn cho khoá:", thieu);
}
apDungNgonNgu(LEVELS);

apDungNhan(LEVELS);   // gắn nhãn kỹ năng + tier cho mọi màn (skills.js)

/* "Chương 1 · Tấm Cám" → "chương 1" */
const chShort = name => name.split("·")[0].trim().toLowerCase();

/* Lời khen QUÁ TRÌNH (Dweck) — khen cách làm, không khen tư chất.
   "Giỏi quá!" là khen tư chất: dùng nhiều tạo tâm lý sợ sai. */
const PRAISE = [
  "Tìm ra cách rồi!",
  "Nghĩ mãi mới ra chứ đùa à!",
  "Con tự sửa được rồi đấy!",
  "Cách xếp này hay đấy!",
  "Từng bước một là ra ngay!",
  "Chịu khó thử là thấy liền!",
  "Lần này xếp khéo ghê!",
];

function win(){
  if($("veil").classList.contains("show")) return;
  /* Đề vô tận: giải bao nhiêu lần cũng được, KHÔNG ghi vào tiến độ mạch truyện */
  if(!L().voTan && !done.includes(cur)) done.push(cur);
  if(L().voTan) hlDemThemMotDe();
  attFinish(true);
  saveProgress();
  if(window.SFX) SFX.play("dung");
  fxWin();   // A8: lá tre + cánh đào rơi mừng thắng
  const nxt = LEVELS[cur+1];
  const endOfChapter = !nxt || nxt._ch !== L()._ch;
  $("winTitle").textContent = endOfChapter ? `Hết ${chShort(L()._ch)}!`
    : PRAISE[Math.floor(Math.random()*PRAISE.length)];
  /* A6: xong trọn chương (mạch truyện) → trao tem ngay tại đây */
  let award = "";
  if(endOfChapter){
    const c = CHAPTERS.find(cc => cc.levels.includes(L()));
    if(c && c.id !== 99){
      const s = chapterStamps().find(x => x.id === c.id);
      if(s && s.got){ award = `<div class="stamp-award">${stampHtml(s)}
        <span class="stamp-msg">Nhận tem truyện «${s.title}»! Xem lại trong 🧺 Túi đồ.</span></div>`;
        if(window.SFX) SFX.play("ding"); }
    }
  }
  $("stampAward").innerHTML = award;
  $("winStory").innerHTML = L().story;
  if(L().voTan){
    $("winTitle").textContent = PRAISE[Math.floor(Math.random()*PRAISE.length)];
    $("nextBtn").style.display = "";
    $("nextBtn").textContent = `🎲 Đề mới (đã giải ${hlSoDeDaGiai()})`;
  } else {
    $("nextBtn").style.display = nxt ? "" : "none";
    $("nextBtn").textContent = (nxt && endOfChapter) ? `Sang ${chShort(nxt._ch)} ▶` : "Màn tiếp theo";
  }
  $("veil").classList.add("show");
}

function load(i){
  /* A3: cùng màn = "Xếp lại" (đếm reset, giữ bộ đếm); khác màn = chốt lượt cũ, mở lượt mới */
  const nid = LEVELS[i] && LEVELS[i].id;
  if(att && att.levelId===nid) attReset();
  else { attFinish(false); attStart(nid); }
  cur=i; place={}; held=null; mAssign={}; sAssign={};
  hintTier=0; hintCount=0;          // thang gợi ý làm lại từ đầu mỗi màn
  const lv=LEVELS[i];
  if(lv.type==="place"||lv.type==="hoilang") for(const c of lv.chars) place[c]=null;
  else if(lv.type==="story") lv.panels.forEach((p,j)=>sAssign[j]=null);
  else for(const r of lv.rows) mAssign[r]=null;
  $("veil").classList.remove("show");
  $("mapVeil").classList.remove("show");   // chọn màn xong là bản đồ tự đóng
  $("menuVeil").classList.remove("show");
  render();
  /* A8: bàn mới trượt nhẹ lên */
  const sb=$("stagebox");
  sb.classList.remove("lv-enter"); void sb.offsetWidth; sb.classList.add("lv-enter");
  saveProgress();
}

$("reset").onclick=()=>load(cur);
$("mapBtn").onclick=()=>{ if(window.SFX) SFX.play("cham"); $("mapVeil").classList.add("show"); };
$("mapClose").onclick=()=>$("mapVeil").classList.remove("show");
$("hintBtn").onclick=()=>giveHint();
$("bagBtn").onclick=()=>{ renderBag(); $("bagVeil").classList.add("show"); };
$("bagClose").onclick=()=>$("bagVeil").classList.remove("show");
$("parentBtn").onclick=()=>{ renderParent(); $("bagVeil").classList.remove("show"); $("parentVeil").classList.add("show"); };
$("parentClose").onclick=()=>$("parentVeil").classList.remove("show");
$("resetSave").onclick=()=>{
  if(!confirm("Chơi lại từ đầu? (Túi đồ vẫn giữ nguyên)")) return;
  try{ localStorage.removeItem("lct_save"); }catch(e){}
  done=[]; $("bagVeil").classList.remove("show"); load(0);
};
$("againBtn").onclick=()=>load(cur);
$("nextBtn").onclick=()=>{
  if(L().voTan){ const i=deMoiHoiLang(L().doKhoChon||"vừa"); if(i>=0) load(i); return; }
  load(cur+1);
};
function sndIcon(){
  $("sndBtn").innerHTML = `<span class="d-ic">${SFX.on?"🔉":"🔇"}</span><span>Âm thanh: ${SFX.on?"đang bật":"đang tắt"}</span>`;
}
$("sndBtn").onclick=()=>{ SFX.toggle(); if(SFX.on) SFX.play("cham"); sndIcon(); };
sndIcon();

/* Trình đơn ☰: lớp phủ mờ + ngăn kéo trượt từ phải */
const dongMenu=()=>{ $("menuVeil").classList.remove("show"); $("menuBtn").setAttribute("aria-expanded","false"); };
$("menuBtn").onclick=()=>{
  if(window.SFX) SFX.play("cham");
  $("menuVeil").classList.add("show");
  $("menuBtn").setAttribute("aria-expanded","true");
};
$("menuClose").onclick=dongMenu;
$("menuVeil").onclick=e=>{ if(e.target.id==="menuVeil") dongMenu(); };   // chạm nền mờ = đóng
/* chọn mục nào cũng khép ngăn kéo — riêng Âm thanh giữ mở để thấy bật/tắt ngay */
["mapBtn","reset","bagBtn"].forEach(id=>$(id).addEventListener("click", dongMenu));

$("sayWin").onclick=()=>speak(stripTags($("winStory").innerHTML));
if(!window.speechSynthesis) $("sayWin").style.display="none";

window.addEventListener("resize",render);
loadProgress();   // mở lại đúng màn đang dở, giữ các màn đã xong
load(cur);

/* ===== A1: màn hình mở đầu ===== */
$("tParade").innerHTML = ["tam","bom","giongts","cuoi"].map(c=>CHARS[c].svg).join("");
const hasSave = done.length>0 || cur>0;
$("startBtn").textContent = hasSave ? `Chơi tiếp — Màn ${cur+1}` : "Bắt đầu chơi";
if(hasSave) $("startOver").style.display="";
$("startBtn").onclick = ()=>{           // cú chạm đầu tiên cũng "mở khoá" autoplay âm thanh
  $("titleVeil").classList.remove("show");
  if(window.SFX) SFX.play("pop");
};
/* Hội làng: chế độ phụ, vào thẳng được từ màn mở đầu, không cần mở khoá chương */
/* trỏ đích danh chương 99 — các màn hoilang chèn giữa mạch truyện (chợ Tết) không cướp nút này */
const iHoi = LEVELS.findIndex(l => l.voTan);
if(iHoi < 0) $("hoiBtn").style.display = "none";
else {
  $("hlParade").innerHTML = HL_KHACH.slice(0,4).map(k => CHARS[k.c].svg).join("");
  const moHoiLang = ()=>{
    $("hlDem").textContent = hlSoDeDaGiai()
      ? `Đã giải ${hlSoDeDaGiai()} đề` : "Chưa giải đề nào — bắt đầu thôi!";
    /* Ẩn hẳn màn mở đầu: đây là MÀN KHÁC, không phải lớp phủ chồng lên.
       (Để cả hai cùng hiện thì #titleVeil z-index 20 sẽ che mất màn này.) */
    $("titleVeil").classList.remove("show");
    $("hlVeil").classList.add("show");
  };
  $("hoiBtn").onclick = ()=>{ if(window.SFX) SFX.play("pop"); moHoiLang(); };
  $("hlDong").onclick = ()=>{
    $("hlVeil").classList.remove("show");
    $("titleVeil").classList.add("show");
  };
  document.querySelectorAll(".hl-pick").forEach(b => b.onclick = ()=>{
    const i = deMoiHoiLang(b.dataset.kho);
    if(i < 0) return;
    $("hlVeil").classList.remove("show");
    $("titleVeil").classList.remove("show");
    if(window.SFX) SFX.play("pop");
    load(i);
  });
}

$("startOver").onclick = ()=>{
  if(!confirm("Chơi lại từ đầu? (Túi đồ vẫn giữ nguyên)")) return;
  try{ localStorage.removeItem("lct_save"); }catch(e){}
  done=[]; $("titleVeil").classList.remove("show"); load(0);
};
