/* ============================================================
   main.js — khởi động, chuyển màn, màn thắng
   ============================================================ */

LEVELS = CHAPTERS.flatMap(c => c.levels);
if (CHAPTERS[0]) $("chapterName").textContent = CHAPTERS[0].name;

function win(){
  if($("veil").classList.contains("show")) return;
  if(!done.includes(cur)) done.push(cur);
  const last=cur===LEVELS.length-1;
  $("winTitle").textContent = last ? "Hết chương 1!" : "Giỏi quá!";
  $("winStory").innerHTML = L().story;
  $("nextBtn").style.display = last ? "none" : "";
  $("veil").classList.add("show");
}

function load(i){
  cur=i; place={}; held=null; mAssign={};
  const lv=LEVELS[i];
  if(lv.type==="place") for(const c of lv.chars) place[c]=null;
  else for(const r of lv.rows) mAssign[r]=null;
  $("veil").classList.remove("show"); render();
}

$("reset").onclick=()=>load(cur);
$("againBtn").onclick=()=>load(cur);
$("nextBtn").onclick=()=>load(cur+1);
window.addEventListener("resize",render);
load(0);
