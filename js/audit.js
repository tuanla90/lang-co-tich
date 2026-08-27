/* ============================================================
   audit.js — đo độ chặt của màn chơi. CHỈ dùng khi phát triển.

   Nguyên tắc: dùng chính evalCons() của engine làm trọng tài, nên
   mọi luật (tường, trèo, nấp, bùn, hướng nhìn, nghe lén) đều được
   tính đúng như lúc chơi thật — số liệu không bao giờ lệch khỏi game.

   Gọi trong Console:
     audit()      — chấm toàn bộ, in bảng xếp hạng từ lỏng đến chặt
     audit(5)     — chấm riêng màn 5 (đếm từ 1), in chi tiết
   ============================================================ */

/* Vét cạn mọi cách đặt. Lưới lớn nhất 5x4 = 20 ô, tối đa ~4 nhân vật
   → dưới 120k trường hợp, vét thẳng cho số liệu chính xác tuyệt đối. */
function auditPlace(lv){
  const em=envCellMap(), cells=[];
  for(let y=0;y<lv.rows;y++) for(let x=0;x<lv.cols;x++) cells.push([x,y]);

  /* Ô hợp lệ cho từng nhân vật: không phải vật cản; nếu là ô môi trường
     thì chỉ nhân vật được phép trèo/nấp mới đứng lên được. */
  const cand={};
  for(const c of lv.chars) cand[c]=cells.filter(([x,y])=>{
    if(isBlocked(x,y)) return false;
    const e=em[key(x,y)];
    return e ? canOccupy(c,e) : true;
  });

  const chars=lv.chars, n=chars.length, k=lv.cons.length;
  const used={}; chars.forEach(c=>used[c]=new Set());
  const chanDuyNhat=new Array(k).fill(0);       // ràng buộc j là thứ DUY NHẤT chặn
  let la=0, nghiem=0;

  place={}; chars.forEach(c=>place[c]=null);
  const daChiem=new Set();
  (function rec(i){
    if(i===n){
      la++;
      const res=evalCons(), xau=[];
      for(let j=0;j<k;j++) if(res[j]!==true) xau.push(j);
      if(xau.length===0){ nghiem++; chars.forEach(c=>used[c].add(place[c].join(","))); }
      else if(xau.length===1) chanDuyNhat[xau[0]]++;
      return;
    }
    const c=chars[i];
    for(const o of cand[c]){
      const kk=o[0]+","+o[1];
      if(daChiem.has(kk)) continue;
      daChiem.add(kk); place[c]=o;
      rec(i+1);
      daChiem.delete(kk); place[c]=null;
    }
  })(0);

  /* Độ phủ: ô nào từng được dùng trong ít nhất một nghiệm */
  const oDung=new Set(); chars.forEach(c=>used[c].forEach(v=>oDung.add(v)));
  const oDatDuoc=new Set(); chars.forEach(c=>cand[c].forEach(o=>oDatDuoc.add(o.join(","))));

  /* Khung nhỏ nhất còn đủ chỗ: bao mọi ô môi trường, vật cản, bùn và ô có nghiệm */
  const moc=[...oDung].map(s=>s.split(",").map(Number));
  for(const e of lv.env) for(const c of e.cells) moc.push(c);
  for(const b of lv.blocked) moc.push(b);
  for(const b of (lv.mud||[])) moc.push(b);
  const khung = moc.length
    ? {cols:Math.max(...moc.map(c=>c[0]))+1, rows:Math.max(...moc.map(c=>c[1]))+1}
    : {cols:lv.cols, rows:lv.rows};

  return {
    kieu:"place", nghiem, khongGian:la, matDo: la? nghiem/la : 0,
    doPhu: oDatDuoc.size ? oDung.size/oDatDuoc.size : 0,
    oDung:oDung.size, oDatDuoc:oDatDuoc.size,
    tuDo: Object.fromEntries(chars.map(c=>[c, used[c].size])),
    rangBuocThua: lv.cons.map((r,j)=>chanDuyNhat[j]===0 ? r.txt : null).filter(Boolean),
    khungHienTai:`${lv.cols}x${lv.rows}`,
    khungToiThieu:`${khung.cols}x${khung.rows}`,
    thuaO: lv.cols*lv.rows - khung.cols*khung.rows
  };
}

function auditMatrix(lv){
  const hang=lv.rows, cot=lv.colsM, k=lv.clues.length;
  const used={}; hang.forEach(r=>used[r]=new Set());
  const chanDuyNhat=new Array(k).fill(0);
  let la=0, nghiem=0;
  mAssign={}; hang.forEach(r=>mAssign[r]=null);
  (function rec(i){
    if(i===hang.length){
      la++;
      const res=evalCons(), xau=[];
      for(let j=0;j<k;j++) if(res[j]!==true) xau.push(j);
      if(xau.length===0){ nghiem++; hang.forEach(r=>used[r].add(mAssign[r])); }
      else if(xau.length===1) chanDuyNhat[xau[0]]++;
      return;
    }
    for(const c of cot){ mAssign[hang[i]]=c; rec(i+1); }
    mAssign[hang[i]]=null;
  })(0);
  return {
    kieu:"matrix", nghiem, khongGian:la, matDo: la? nghiem/la : 0,
    doPhu:1, tuDo:Object.fromEntries(hang.map(r=>[r, used[r].size])),
    rangBuocThua: lv.clues.map((c,j)=>chanDuyNhat[j]===0 ? c.txt : null).filter(Boolean)
  };
}

/* Xếp hạng: 0 nghiệm là LỖI, ít nghiệm là chặt, nhiều là đặt bừa cũng trúng */
function xepHang(r){
  if(r.nghiem===0)  return "LỖI: không giải được";
  if(r.nghiem===1)  return "chặt";
  if(r.nghiem<=8)   return "tốt";
  if(r.nghiem<=25)  return "lỏng";
  return "rất lỏng";
}

/* Chip thừa THẬT: bỏ hẳn từng ràng buộc rồi đếm lại.
   Phải làm kiểu này chứ không suy từ "chặn duy nhất", vì các ràng buộc KHÔNG độc lập:
   `behind` lấy hướng nhìn từ `adjEnv` của mục tiêu, nên gỡ adjEnv đi có thể làm
   số nghiệm GIẢM (behind hết suy được) thay vì tăng. Đắt hơn k lần nên chỉ chạy
   khi xem chi tiết một màn, không chạy trong bảng tổng. */
function chipThuaThat(idx){
  const lv=LEVELS[idx]; const ds=lv.cons; if(!ds) return [];
  const goc=auditLevel(idx).nghiem, ra=[];
  for(let j=0;j<ds.length;j++){
    const luu=lv.cons;
    lv.cons=ds.filter((_,i)=>i!==j);
    let n; try{ n=auditLevel(idx).nghiem; } finally{ lv.cons=luu; }
    if(n===goc) ra.push({chip:ds[j].txt, ghiChu:"bỏ đi số nghiệm không đổi — thừa thật"});
    else if(n<goc) ra.push({chip:ds[j].txt, ghiChu:`bỏ đi còn ${n} nghiệm — chip khác ĐANG DỰA vào nó`});
  }
  return ra;
}

function auditLevel(idx){
  const luuCur=cur, luuPlace=place, luuHeld=held, luuM=mAssign;
  cur=idx; const lv=L();
  let r;
  try{
    r = lv.type==="place"  ? auditPlace(lv)
      : lv.type==="matrix" ? auditMatrix(lv)
      : {kieu:lv.type, nghiem:1, khongGian:1, matDo:1, doPhu:1, rangBuocThua:[]};
  } finally { cur=luuCur; place=luuPlace; held=luuHeld; mAssign=luuM; }
  return Object.assign({man:idx+1, ten:lv.name, chuong:lv._ch}, r, {hang:xepHang(r)});
}

function audit(soMan){
  if(soMan){                                   // chi tiết một màn
    const r=auditLevel(soMan-1);
    console.log(`Màn ${r.man} · ${r.ten} — ${r.hang}`);
    console.log(`  nghiệm: ${r.nghiem} / ${r.khongGian} cách đặt`
      +`  (đặt bừa trúng ${(r.matDo*100).toFixed(2)}%)`);
    if(r.kieu==="place"){
      console.log(`  độ phủ: ${r.oDung}/${r.oDatDuoc} ô từng được dùng`
        +`  (${(r.doPhu*100).toFixed(0)}%)`);
      console.log(`  lưới ${r.khungHienTai} → tối thiểu ${r.khungToiThieu}`
        + (r.thuaO>0 ? `  ⚠ thừa ${r.thuaO} ô` : ""));
      console.log(`  chỗ đứng mỗi nhân vật:`, r.tuDo);
    }
    if(r.kieu==="place"){
      const t=chipThuaThat(soMan-1);
      if(t.length){ console.log(`  ⚠ soát từng chip (bỏ hẳn rồi đếm lại):`);
        t.forEach(x=>console.log(`     · ${x.chip} — ${x.ghiChu}`)); }
      else console.log(`  ✓ mọi chip đều siết thật`);
    }
    return r;
  }
  const all=LEVELS.map((_,i)=>auditLevel(i));
  const xau=all.filter(r=>r.kieu!=="story").sort((a,b)=>b.nghiem-a.nghiem);
  console.table(xau.map(r=>({man:r.man, ten:r.ten, hang:r.hang, nghiem:r.nghiem,
    "bừa%":+(r.matDo*100).toFixed(2), phủ:r.doPhu?(r.doPhu*100).toFixed(0)+"%":"-",
    lưới:r.khungHienTai||"-", tốiThiểu:r.khungToiThieu||"-",
    thừaRB:r.rangBuocThua.length})));
  const loi=all.filter(r=>r.nghiem===0);
  if(loi.length) console.error("MÀN KHÔNG GIẢI ĐƯỢC:", loi.map(r=>`${r.man} ${r.ten}`));
  return all;
}

/* ===== Thử một bố cục khác mà KHÔNG sửa file — dùng để dò trước khi chốt =====
   thu("Tên màn", {env:[...], blocked:[...], cons:[...]})  → số liệu sau khi đổi
   ap ("Tên màn", {...})                                    → áp thật để xem trên màn hình  */
function iOf(ten){ return LEVELS.findIndex(l=>l.name===ten); }
function thu(ten, thayDoi={}){
  const i=iOf(ten); if(i<0) return "khong co man: "+ten;
  const lv=LEVELS[i], luu={env:lv.env, blocked:lv.blocked, mud:lv.mud, cons:lv.cons};
  Object.assign(lv, thayDoi);
  let r; try{ r=auditLevel(i); } finally{ Object.assign(lv, luu); }
  const v=Object.values(r.tuDo||{});
  return {nghiem:r.nghiem, tuDo:+(v.reduce((a,b)=>a+b,0)/v.length/r.oDatDuoc*100).toFixed(0),
          moiNguoi:r.tuDo, thuaRB:r.rangBuocThua.length};
}
function ap(ten, thayDoi={}){ const i=iOf(ten); Object.assign(LEVELS[i], thayDoi); load(i); }

/* ===== Rà màn "đinh": màn cuối chương + màn tier 3 =====
   Màn thường 1–10 nghiệm là lành (bé xếp thoáng tay). Riêng màn đinh mà
   nhiều nghiệm thì cái khó bé cảm thấy là GIẢ — đặt bừa cũng trúng.
   Gọi raKho() — ngưỡng mặc định 4, đổi bằng raKho(2). */
function raKho(nguong=4){
  const cuoi=new Set();
  CHAPTERS.forEach(c=>{ const ls=c.levels.filter(l=>!l.voTan);
    if(ls.length) cuoi.add(ls[ls.length-1].id); });
  const ds=[];
  LEVELS.forEach((l,i)=>{
    if(l.type!=="place") return;
    const laCuoi=cuoi.has(l.id), kho=l.tier===3;
    if(!laCuoi && !kho) return;
    const r=auditLevel(i);
    ds.push({man:i+1, ten:l.name,
      viTri:[laCuoi?"cuối chương":"", kho?"tier 3":""].filter(Boolean).join(" + "),
      nghiem:r.nghiem,
      danhGia: r.nghiem===0 ? "LỖI: không giải được"
        : r.nghiem<=nguong ? "✓ chặt xứng vị trí" : `⚠ lỏng so với vị trí`});
  });
  console.table(ds);
  const xau=ds.filter(d=>d.danhGia.startsWith("⚠"));
  if(xau.length) console.warn(`${xau.length} màn đinh đang lỏng — xem chi tiết: audit(<màn>), thử siết: thu("Tên màn",{...})`);
  else console.log("✓ mọi màn đinh đều chặt xứng vị trí");
  return ds;
}

/* ===== Soát HÌNH TRÙNG =====
   Hai cột trong cùng một màn ma trận mà vẽ giống hệt nhau thì trẻ không phân biệt
   nổi — đề hoá mù mờ dù logic vẫn chặt. Gọi soatHinh() để quét cả game. */
function soatHinh(){
  const loi = [], canhBao = [];

  /* 1. màn ma trận có hai cột cùng một bức */
  LEVELS.forEach((l,i)=>{
    if(l.type!=="matrix") return;
    const nhom={};
    l.colsM.forEach(c=>{ const s=PLACES[c] && PLACES[c].svg;
      (nhom[s]=nhom[s]||[]).push(`${PLACES[c].name} (${c})`); });
    Object.values(nhom).filter(a=>a.length>1)
      .forEach(a=>loi.push(`màn ${i+1} "${l.name}": ${a.join(" ≡ ")} — vẽ giống hệt nhau`));
  });

  /* 2. màn xếp chỗ có hai môi trường cùng một bức */
  LEVELS.forEach((l,i)=>{
    if(!l.env || l.env.length<2) return;
    const nhom={};
    l.env.forEach(e=>{ const s=ENVS[e.id] && ENVS[e.id].svg;
      (nhom[s]=nhom[s]||[]).push(`${ENVS[e.id].name} (${e.id})`); });
    Object.values(nhom).filter(a=>[...new Set(a)].length>1)
      .forEach(a=>loi.push(`màn ${i+1} "${l.name}": ${[...new Set(a)].join(" ≡ ")} — vẽ giống hệt nhau`));
  });

  /* 3. màn hội làng có hai mốc cùng một bức */
  LEVELS.forEach((l,i)=>{
    if(l.type!=="hoilang" || !l.moc || l.moc.length<2) return;
    const nhom={};
    l.moc.forEach(m=>{ const s=ENVS[m.art] && ENVS[m.art].svg;
      (nhom[s]=nhom[s]||[]).push(ENVS[m.art].name); });
    Object.values(nhom).filter(a=>a.length>1)
      .forEach(a=>loi.push(`màn ${i+1} "${l.name}": hai mốc cùng hình ${a[0]}`));
  });

  /* 4. thống kê chung: bức nào đang bị nhiều id dùng chung (chỉ để biết, không phải lỗi —
     ENVS dùng cho ô bàn cờ, PLACES dùng cho cột ma trận, trùng nhau là tái dùng hợp lệ) */
  const theoSvg={};
  for(const [bo,b] of [["ENVS",ENVS],["PLACES",PLACES]])
    for(const [id,v] of Object.entries(b))
      if(v && v.svg) (theoSvg[v.svg]=theoSvg[v.svg]||[]).push(`${bo}.${id}`);
  Object.values(theoSvg).filter(a=>a.length>1).forEach(a=>{
    const chiPlaces = a.filter(x=>x.startsWith("PLACES."));
    if(chiPlaces.length>1) canhBao.push(chiPlaces.join(" ≡ "));
  });

  if(loi.length) console.error("HÌNH TRÙNG TRONG CÙNG MỘT MÀN:", loi);
  else console.log("✓ không màn nào có hai hình giống hệt nhau");
  if(canhBao.length) console.warn("Nhiều PLACES dùng chung một bức (đặt cùng màn sẽ mù mờ):", canhBao);
  return { loi, canhBao };
}
