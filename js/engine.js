/* ============================================================
   engine.js — trạng thái ván chơi + luật + chấm điểm ràng buộc
   Không đụng tới DOM. Thêm loại ràng buộc mới: thêm nhánh
   trong evalCons, UI tự hiển thị theo kết quả true/false/null.
   ============================================================ */

let LEVELS = [];          // main.js nạp từ CHAPTERS
let cur = 0;              // màn hiện tại
let done = [];            // các màn đã xong
let place = {};           // {charId: [x,y] | null} — màn xếp chỗ
let held = null;          // nhân vật đang cầm
let mAssign = {};         // {rowChar: colId | null} — màn ma trận
let sAssign = {};         // {chỉ số khung: pieceId | null} — màn kể chuyện

const L = () => LEVELS[cur];
const key = (x, y) => x + "," + y;
const NB = [[1,0],[-1,0],[0,1],[0,-1]];

function envCellMap(){ const m={}; for(const e of L().env) for(const c of e.cells) m[key(c[0],c[1])]=e.id; return m; }
function isBlocked(x,y){ return L().blocked.some(b=>b[0]===x&&b[1]===y); }
function isMud(x,y){ return L().mud.some(b=>b[0]===x&&b[1]===y); }
function charAt(x,y){ for(const c in place) if(place[c]&&place[c][0]===x&&place[c][1]===y) return c; return null; }
/* Cameo nền: nhân vật đứng sẵn cho vui, không ràng buộc, không nhấc được.
   Khai trong màn: extras:[{c:"bom", cell:[x,y], note:"lẻn vào hóng cỗ"}] */
function extraAt(x,y){ return (L().extras||[]).find(e=>e.cell[0]===x&&e.cell[1]===y)||null; }

/* Di vật cốt truyện: relic:{id, cell} trong màn — bấm ô lấp lánh để nhặt.
   Bộ sưu tập lưu localStorage theo id ổn định (save đầu tiên của game). */
let relicsGot = (()=>{ try{ return JSON.parse(localStorage.getItem("lct_relics")||"[]"); }catch(e){ return []; } })();
function relicAt(x,y){ const r=L().relic;
  return (r && !relicsGot.includes(r.id) && r.cell[0]===x && r.cell[1]===y) ? r : null; }
function collectRelic(id){
  if(relicsGot.includes(id)) return;
  relicsGot.push(id);
  try{ localStorage.setItem("lct_relics", JSON.stringify(relicsGot)); }catch(e){}
}

/* Tường/rào: chặn CẠNH giữa 2 ô, không choán ô. walls: [[x,y,"r"|"b"],...] (mép phải/mép dưới của ô x,y) */
function wallsOf(){ return L().walls||[]; }
function wallBetween(ax,ay,bx,by){
  const w=wallsOf();
  if(bx===ax+1&&by===ay) return w.some(v=>v[0]===ax&&v[1]===ay&&v[2]==="r");
  if(bx===ax-1&&by===ay) return w.some(v=>v[0]===bx&&v[1]===by&&v[2]==="r");
  if(by===ay+1&&bx===ax) return w.some(v=>v[0]===ax&&v[1]===ay&&v[2]==="b");
  if(by===ay-1&&bx===ax) return w.some(v=>v[0]===bx&&v[1]===by&&v[2]==="b");
  return false;
}

/* Kề vách KHÔNG tính tường — âm thanh xuyên rào, ánh mắt thì không */
function rawAdjChar(a,b){ const p=place[a],q=place[b]; if(!p||!q) return null;
  return NB.some(d=>p[0]+d[0]===q[0]&&p[1]+d[1]===q[1]); }
/* Đang nấp: đứng trong ô môi trường được phép nấp — qua luật hideIn,
   hoặc qua trường occupy (nấp là lựa chọn, không phải mục tiêu) */
function isHiddenChar(c){ const p=place[c]; if(!p) return false;
  const e=L().env.find(v=>v.cells.some(ec=>ec[0]===p[0]&&ec[1]===p[1]));
  if(!e) return false;
  if(L().cons.some(k=>k.t==="hideIn"&&k.c===c&&k.e===e.id)) return true;
  return (L().occupy||[]).some(o=>o.c===c&&o.e===e.id&&o.mode==="hide"); }

function isAdjEnv(c,eid){ const p=place[c]; if(!p) return null;
  const cells=L().env.find(e=>e.id===eid).cells;
  return cells.some(ec=>NB.some(d=>ec[0]+d[0]===p[0]&&ec[1]+d[1]===p[1])
    && !wallBetween(p[0],p[1],ec[0],ec[1])); }
function isAdjChar(a,b){ const p=place[a],q=place[b]; if(!p||!q) return null;
  return NB.some(d=>p[0]+d[0]===q[0]&&p[1]+d[1]===q[1])
    && !wallBetween(p[0],p[1],q[0],q[1]); }

/* Hướng nhìn: nhân vật có ràng buộc adjEnv, khi đứng cạnh mỏ neo thì quay mặt về nó */
function facingOf(c){
  const con=L().cons&&L().cons.find(k=>k.t==="adjEnv"&&k.c===c); if(!con) return null;
  const p=place[c]; if(!p) return null;
  const cells=L().env.find(e=>e.id===con.e).cells;
  for(const ec of cells) for(const d of NB)
    if(p[0]+d[0]===ec[0]&&p[1]+d[1]===ec[1]&&!wallBetween(p[0],p[1],ec[0],ec[1])) return d;
  return null;
}
function behindCell(c){ const f=facingOf(c),p=place[c];
  if(!f||!p) return null; return [p[0]-f[0],p[1]-f[1]]; }

/* Nhân vật này có được đứng LÊN ô môi trường eid không?
   onEnv = trèo lên (cây cau), hideIn = nấp vào (bụi tre) — cùng cơ chế đặt, khác ý nghĩa + hình */
function canOccupy(c, eid){
  if(!c) return false;
  if(L().cons && L().cons.some(k=>(k.t==="onEnv"||k.t==="hideIn")&&k.c===c&&k.e===eid)) return true;
  return (L().occupy||[]).some(o=>o.c===c&&o.e===eid);
}

/* true = xanh, false = đỏ, null = chưa đủ thông tin */
function evalCons(){
  const lv=L();
  /* Màn kể chuyện: mỗi khung đúng một mảnh. Chưa đặt = null, đặt sai = đỏ. */
  if(lv.type==="story")
    return lv.panels.map((p,i)=> sAssign[i] ? sAssign[i]===p.answer : null);
  if(lv.type==="matrix"){
    return lv.clues.map(k=>{
      if(k.t==="mUniq"){
        const vals=lv.rows.map(r=>mAssign[r]).filter(Boolean);
        if(new Set(vals).size!==vals.length) return false;
        return vals.length===lv.rows.length ? true : null;
      }
      const a=mAssign[k.c]; if(!a) return null;
      return k.t==="mIs" ? a===k.col : a!==k.col;
    });
  }
  return lv.cons.map(k=>{
    if(k.t==="adjEnv")    return isAdjEnv(k.c,k.e);
    if(k.t==="notAdjEnv"){ const r=isAdjEnv(k.c,k.e); return r===null?null:!r; }
    if(k.t==="adjChar")   return isAdjChar(k.c,k.target);
    if(k.t==="notAdjChar"){ const r=isAdjChar(k.c,k.target); return r===null?null:!r; }
    if(k.t==="notTer"){ const p=place[k.c]; if(!p) return null; return !isMud(p[0],p[1]); }
    if(k.t==="onEnv"||k.t==="hideIn"){ const p=place[k.c]; if(!p) return null;
      const cells=L().env.find(e=>e.id===k.e).cells;
      return cells.some(ec=>ec[0]===p[0]&&ec[1]===p[1]); }
    if(k.t==="behind"){ const p=place[k.c]; if(!p) return null;
      const b=behindCell(k.target); if(!b) return null;
      return p[0]===b[0]&&p[1]===b[1]; }
    /* Khắc nhập: cả nhóm phải dính liền thành một khối (kề nhau, tường vẫn chia cắt) */
    if(k.t==="chain"){
      if(k.cs.some(c=>!place[c])) return null;
      const seen=new Set([k.cs[0]]), Q=[k.cs[0]];
      while(Q.length){ const a=Q.pop();
        for(const b of k.cs) if(!seen.has(b)){
          const pa=place[a], pb=place[b];
          const adj=NB.some(d=>pa[0]+d[0]===pb[0]&&pa[1]+d[1]===pb[1])
            && !wallBetween(pa[0],pa[1],pb[0],pb[1]);
          if(adj){ seen.add(b); Q.push(b); } } }
      return seen.size===k.cs.length; }
    /* queue = nối đuôi ĐÚNG THỨ TỰ (cs[i] kề cs[i+1]); line = queue + thẳng một hàng.
       Khác chain ở chỗ chain chỉ đòi dính thành chùm, đứng kiểu gì cũng được. */
    if(k.t==="queue"||k.t==="line"){
      if(k.cs.some(c=>!place[c])) return null;
      const p=k.cs.map(c=>place[c]);
      for(let i=0;i<p.length-1;i++){ const a=p[i],b=p[i+1];
        if(!NB.some(d=>a[0]+d[0]===b[0]&&a[1]+d[1]===b[1])) return false;
        if(wallBetween(a[0],a[1],b[0],b[1])) return false; }
      if(k.t==="line" && !p.every(q=>q[1]===p[0][1]) && !p.every(q=>q[0]===p[0][0])) return false;
      return true; }
    /* Nghe lén: KỀ mục tiêu (tường không chặn tiếng) nhưng KHÔNG bị thấy —
       tức có tường ngăn, hoặc đang nấp, hoặc đứng sau lưng mục tiêu */
    if(k.t==="listen"){ const p=place[k.c], q2=place[k.target]; if(!p||!q2) return null;
      if(!rawAdjChar(k.c,k.target)) return false;               // xa quá, không nghe được
      const wall=wallBetween(p[0],p[1],q2[0],q2[1]);
      const hid=isHiddenChar(k.c);
      const b=behindCell(k.target);
      const behind=!!b&&b[0]===p[0]&&b[1]===p[1];
      return wall||hid||behind; }                                // kề mà lộ mặt → bị phát hiện (đỏ)
    return null;
  });
}

function isWon(res){
  const lv=L();
  if(lv.type==="story")
    return res.every(r=>r===true) && lv.panels.every((p,i)=>sAssign[i]);
  if(lv.type==="matrix")
    return res.every(r=>r===true) && lv.rows.every(r=>mAssign[r]);
  return res.every(r=>r===true) && lv.chars.every(c=>place[c]);
}
