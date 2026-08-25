/* ============================================================
   dev.js — công cụ gỡ lỗi: tua màn tự do, phím tắt, nhãn trạng thái.
   Nạp file này = đang ở chế độ gỡ lỗi. Phát hành thì chỉ cần xoá
   dòng <script src="js/dev.js"> trong index.html — không file nào khác
   phụ thuộc vào nó (ui.js chỉ đọc window.DEV, vắng thì coi như tắt).
   Muốn tắt tạm mà vẫn giữ script: thêm ?dev=0 vào URL. Bật lại: ?dev
   ============================================================ */
(function(){
  /* localStorage có thể bị chặn khi mở bằng file:// — không được để vỡ game */
  const ls={ get(k){ try{return localStorage.getItem(k)}catch(e){return null} },
             set(k,v){ try{localStorage.setItem(k,v)}catch(e){} } };

  const m=/[?&]dev(?:=([01]))?/.exec(location.search);
  if(m) ls.set("lct-dev", m[1]==="0" ? "0" : "1");
  window.DEV = ls.get("lct-dev") !== "0";        // mặc định BẬT khi file này được nạp
  if(!window.DEV) return;

  /* ===== Nhãn trạng thái góc dưới ===== */
  const css=document.createElement("style");
  css.textContent=`
    #devbar{position:fixed;left:8px;bottom:8px;z-index:50;max-width:min(340px,calc(100vw - 16px));
      background:rgba(59,43,30,.92);color:#F7ECCB;border-radius:10px;padding:7px 11px;
      font:12px/1.45 ui-monospace,Consolas,monospace;pointer-events:none;
      box-shadow:0 3px 12px rgba(0,0,0,.3)}
    #devbar b{color:#E3A72F;font-weight:700}
    #devbar .k{opacity:.72;font-size:11px;display:block;margin-top:3px}
    #devbar .t{display:inline-block;background:#C8452A;border-radius:4px;
      padding:0 5px;margin-left:5px;font-size:10.5px}
    @media (max-width:520px){#devbar .k{display:none}}`;
  document.head.appendChild(css);

  const bar=document.createElement("div");
  bar.id="devbar";
  document.body.appendChild(bar);

  /* Chỉ số màn đầu của mỗi chương — để nhảy chương */
  const chapterStarts=()=>{ const a=[]; let last=null;
    LEVELS.forEach((l,i)=>{ if(l._ch!==last){ a.push(i); last=l._ch; } }); return a; };

  function paint(){
    const lv=L();
    bar.innerHTML=`DEV · màn <b>${cur+1}</b>/${LEVELS.length}`
      +`<span class="t">${lv.type}</span> ${lv.name}`
      +`<span class="k">← → màn · ↑ ↓ chương · Home/End đầu-cuối · R xếp lại · W ép thắng`
      +` · A chấm độ chặt · mọi chấm tròn đều bấm được</span>`;
  }

  /* Vẽ lại nhãn sau mỗi lần render mà không đụng vào ui.js */
  const _render=window.render;
  window.render=function(){ _render.apply(this,arguments); paint(); };

  const go=i=>{ if(i>=0&&i<LEVELS.length) load(i); };

  addEventListener("keydown",e=>{
    if(e.ctrlKey||e.altKey||e.metaKey) return;
    const st=chapterStarts();
    switch(e.key){
      case "ArrowRight": go(cur+1); break;
      case "ArrowLeft":  go(cur-1); break;
      case "ArrowDown":  go(st.find(i=>i>cur) ?? cur); break;
      case "ArrowUp":    go([...st].reverse().find(i=>i<cur) ?? 0); break;
      case "Home":       go(0); break;
      case "End":        go(LEVELS.length-1); break;
      case "r": case "R": load(cur); break;
      case "w": case "W": win(); break;                 // thử hộp thắng + chuyển chương
      case "a": case "A": if(window.audit) audit(cur+1); break;   // chấm độ chặt màn này
      default: return;
    }
    e.preventDefault();
  });

  /* Mở thẳng một màn: index.html#16 (đếm từ 1, khớp số hiển thị) */
  const jump=()=>{ const n=parseInt(location.hash.slice(1),10);
    if(Number.isInteger(n)) go(n-1); };
  addEventListener("hashchange",jump);
  jump();

  paint();
  render();          // nạp lại tay bấm cho chấm tròn, giờ đã mở khoá hết
})();
