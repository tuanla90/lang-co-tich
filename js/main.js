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
  if(!done.includes(cur)) done.push(cur);
  attFinish(true);
  saveProgress();
  if(window.SFX) SFX.play("dung");
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
  $("nextBtn").style.display = nxt ? "" : "none";
  $("nextBtn").textContent = (nxt && endOfChapter) ? `Sang ${chShort(nxt._ch)} ▶` : "Màn tiếp theo";
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
  $("veil").classList.remove("show"); render();
  saveProgress();
}

$("reset").onclick=()=>load(cur);
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
$("nextBtn").onclick=()=>load(cur+1);
function sndIcon(){ $("sndBtn").textContent = SFX.on ? "🔉" : "🔇"; }
$("sndBtn").onclick=()=>{ SFX.toggle(); if(SFX.on) SFX.play("cham"); sndIcon(); };
sndIcon();

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
const ch99 = CHAPTERS.find(c => c.id === 99);
const iHoi = ch99 ? LEVELS.indexOf(ch99.levels[0]) : -1;
if(iHoi < 0) $("hoiBtn").style.display = "none";
else $("hoiBtn").onclick = ()=>{
  $("titleVeil").classList.remove("show");
  if(window.SFX) SFX.play("pop");
  load(iHoi);
};

$("startOver").onclick = ()=>{
  if(!confirm("Chơi lại từ đầu? (Túi đồ vẫn giữ nguyên)")) return;
  try{ localStorage.removeItem("lct_save"); }catch(e){}
  done=[]; $("titleVeil").classList.remove("show"); load(0);
};
