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

/* "Chương 1 · Tấm Cám" → "chương 1" */
const chShort = name => name.split("·")[0].trim().toLowerCase();

function win(){
  if($("veil").classList.contains("show")) return;
  if(!done.includes(cur)) done.push(cur);
  const nxt = LEVELS[cur+1];
  const endOfChapter = !nxt || nxt._ch !== L()._ch;
  $("winTitle").textContent = endOfChapter ? `Hết ${chShort(L()._ch)}!` : "Giỏi quá!";
  $("winStory").innerHTML = L().story;
  $("nextBtn").style.display = nxt ? "" : "none";
  $("nextBtn").textContent = (nxt && endOfChapter) ? `Sang ${chShort(nxt._ch)} ▶` : "Màn tiếp theo";
  $("veil").classList.add("show");
}

function load(i){
  cur=i; place={}; held=null; mAssign={}; sAssign={};
  const lv=LEVELS[i];
  if(lv.type==="place") for(const c of lv.chars) place[c]=null;
  else if(lv.type==="story") lv.panels.forEach((p,j)=>sAssign[j]=null);
  else for(const r of lv.rows) mAssign[r]=null;
  $("veil").classList.remove("show"); render();
}

$("reset").onclick=()=>load(cur);
$("bagBtn").onclick=()=>{ renderBag(); $("bagVeil").classList.add("show"); };
$("bagClose").onclick=()=>$("bagVeil").classList.remove("show");
$("againBtn").onclick=()=>load(cur);
$("nextBtn").onclick=()=>load(cur+1);
window.addEventListener("resize",render);
load(0);
