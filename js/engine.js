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

const L = () => LEVELS[cur];
const key = (x, y) => x + "," + y;
const NB = [[1,0],[-1,0],[0,1],[0,-1]];

function envCellMap(){ const m={}; for(const e of L().env) for(const c of e.cells) m[key(c[0],c[1])]=e.id; return m; }
function isBlocked(x,y){ return L().blocked.some(b=>b[0]===x&&b[1]===y); }
function isMud(x,y){ return L().mud.some(b=>b[0]===x&&b[1]===y); }
function charAt(x,y){ for(const c in place) if(place[c]&&place[c][0]===x&&place[c][1]===y) return c; return null; }

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
  return !!(c && L().cons && L().cons.some(k=>(k.t==="onEnv"||k.t==="hideIn")&&k.c===c&&k.e===eid));
}

/* true = xanh, false = đỏ, null = chưa đủ thông tin */
function evalCons(){
  const lv=L();
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
    return null;
  });
}

function isWon(res){
  const lv=L();
  if(lv.type==="matrix")
    return res.every(r=>r===true) && lv.rows.every(r=>mAssign[r]);
  return res.every(r=>r===true) && lv.chars.every(c=>place[c]);
}
