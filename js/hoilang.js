/* ============================================================
   hoilang.js — HỘI LÀNG: bộ SINH đề và bộ KIỂM đề.
   Không đụng DOM, không phụ thuộc phần còn lại của game.

   Luật chơi (đã chốt):
     · Mỗi hàng đúng một người, mỗi cột đúng một người   (quân xe)
     · Không ai đứng sát ai, kể cả góc chéo              (ai cũng cần khoảng trống)
     · Mỗi người chỉ được đứng trong VÙNG của mình       (làng Tấm, núi Tản Viên…)

   Hai engine:
     sinhDe(opts)   → đẻ ra một đề đạt chuẩn, hoặc null nếu hết lượt thử
     kiemDe(de)     → soi một đề: mấy nghiệm, có giải được bằng suy luận không, khó cỡ nào

   Chuẩn nhận đề: ĐÚNG 1 lời giải  VÀ  giải trọn bằng suy diễn cưỡng bức
   (không được có bước nào phải đoán rồi quay lui).
   ============================================================ */

/* ===== Bộ số ngẫu nhiên CÓ HẠT GIỐNG — cùng seed thì cùng đề, để còn tái hiện
   khi gỡ lỗi và để làm "câu đố mỗi ngày" (seed = số của ngày hôm đó). ===== */
function hlRng(seed){
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hlPick = (arr, R) => arr[Math.floor(R() * arr.length)];
function hlShuffle(arr, R){
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(R()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}
const KE8 = (a,b,c,d) => Math.abs(a-c)<=1 && Math.abs(b-d)<=1;   // sát nhau kể cả chéo

/* ===== 1. Lời giải: hoán vị cột, hai hàng liền nhau phải lệch cột ≥ 2 ===== */
function hlLoiGiai(n, R){
  const cot = [];
  const rec = r => {
    if(r === n) return true;
    for(const c of hlShuffle([...Array(n).keys()], R)){
      if(cot.includes(c)) continue;
      if(r > 0 && Math.abs(c - cot[r-1]) <= 1) continue;   // hàng kề thì cột phải cách ≥2
      cot.push(c);
      if(rec(r+1)) return true;
      cot.pop();
    }
    return false;
  };
  return rec(0) ? cot : null;      // cot[hàng] = cột
}

/* ===== 2. Vẽ vùng: mỗi người một vùng liên thông cỡ k ô, CÁC VÙNG RỜI NHAU =====
   Mọc luân phiên từng vùng một để chúng nở đều, không vùng nào nuốt hết chỗ. */
function hlVeVung(n, cot, k, R, choSan = 0){
  const chu = Array.from({length:n}, () => Array(n).fill(-1));   // ô này thuộc vùng nào
  const vung = [];
  for(let v=0; v<n; v++){ chu[v][cot[v]] = v; vung.push([[v, cot[v]]]); }

  /* choSan người đứng sẵn: vùng của họ chỉ 1 ô, tức là đã lộ chỗ.
     Đây là bậc nhập môn — giống Sudoku cho sẵn vài số. */
  const dungYen = new Set(hlShuffle([...Array(n).keys()], R).slice(0, choSan));

  for(let lop=1; lop<k; lop++){
    for(let v=0; v<n; v++){
      if(dungYen.has(v)) continue;
      const ungVien = [];
      for(const [r,c] of vung[v])
        for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){
          const a=r+dr, b=c+dc;
          if(a>=0 && a<n && b>=0 && b<n && chu[a][b] === -1) ungVien.push([a,b]);
        }
      if(!ungVien.length) continue;                 // vùng bị kẹt, cứ để nhỏ hơn
      const [a,b] = hlPick(ungVien, R);
      chu[a][b] = v; vung[v].push([a,b]);
    }
  }
  return { vung, chu };
}

/* ===== 3. Đếm nghiệm (dừng sớm khi đủ giới hạn) ===== */
function hlDemNghiem(n, vung, gioiHan = 2){
  const H = new Set(), C = new Set(), da = [];
  let d = 0;
  (function rec(v){
    if(d >= gioiHan) return;
    if(v === n){ d++; return; }
    for(const [r,c] of vung[v]){
      if(H.has(r) || C.has(c)) continue;
      if(da.some(([a,b]) => KE8(a,b,r,c))) continue;
      H.add(r); C.add(c); da.push([r,c]);
      rec(v+1);
      H.delete(r); C.delete(c); da.pop();
    }
  })(0);
  return d;
}

/* ===== 4. SOLVER KIỂU NGƯỜI — chỉ dùng suy diễn cưỡng bức, TUYỆT ĐỐI không đoán.
   Đây mới là thước đo thật: một đề có thể duy nhất nghiệm mà vẫn bắt trẻ mò.
   Ba quy tắc, xếp từ dễ đến khó — số lần dùng quy tắc khó chính là độ khó của đề.
     QT1 (dễ)  : một người chỉ còn đúng một ô hợp lệ  → đặt luôn
     QT2 (vừa) : một hàng/cột chỉ còn đúng một người có thể vào → người ấy phải ở đó
     QT3 (khó) : một ô là lựa chọn của đúng một người, và người đó là người duy nhất
                 có thể lấp hàng ấy → loại các ô khác của họ
   ===== */
function hlGiaiKieuNguoi(n, vung){
  const ung = vung.map(cells => cells.map(o => o.slice()));   // ứng viên còn lại
  const dat = new Array(n).fill(null);
  const dungQT = [0,0,0];
  let batBi = false;

  const datVao = (v, o, qt) => {
    dat[v] = o; ung[v] = [o]; dungQT[qt]++;
    const [r,c] = o;
    for(let w=0; w<n; w++){
      if(w === v || dat[w]) continue;
      ung[w] = ung[w].filter(([a,b]) => a!==r && b!==c && !KE8(a,b,r,c));
      if(!ung[w].length) batBi = true;
    }
  };

  let tien = true;
  while(tien && !batBi){
    tien = false;

    /* QT1 — chỉ còn một ô */
    for(let v=0; v<n && !batBi; v++){
      if(dat[v]) continue;
      if(ung[v].length === 0){ batBi = true; break; }
      if(ung[v].length === 1){ datVao(v, ung[v][0], 0); tien = true; }
    }
    if(tien || batBi) continue;

    /* QT2 — hàng (hoặc cột) chỉ còn đúng một người vào được.
       Đúng vì mỗi hàng và mỗi cột phải có đúng một người. */
    for(const truc of [0,1]){
      for(let i=0; i<n && !tien; i++){
        const aiVaoDuoc = [];
        for(let v=0; v<n; v++)
          if(ung[v].some(o => o[truc] === i)) aiVaoDuoc.push(v);
        if(aiVaoDuoc.length !== 1) continue;
        const v = aiVaoDuoc[0];
        if(dat[v]) continue;
        const hep = ung[v].filter(o => o[truc] === i);
        if(hep.length < ung[v].length){
          ung[v] = hep; dungQT[1]++; tien = true;
          if(hep.length === 1) datVao(v, hep[0], 1);
        }
      }
      if(tien) break;
    }
    if(tien || batBi) continue;

    /* QT3 — người này là kẻ duy nhất phủ được hàng i, nên mọi ô ngoài hàng i bỏ đi.
       (khác QT2 ở chỗ xét từ phía người thay vì từ phía hàng) */
    for(let v=0; v<n && !tien; v++){
      if(dat[v]) continue;
      for(const truc of [0,1]){
        const tuyen = [...new Set(ung[v].map(o => o[truc]))];
        if(tuyen.length !== 1) continue;
        const i = tuyen[0];
        for(let w=0; w<n; w++){
          if(w === v || dat[w]) continue;
          const hep = ung[w].filter(o => o[truc] !== i);
          if(hep.length < ung[w].length){
            ung[w] = hep; dungQT[2]++; tien = true;
            if(!hep.length) batBi = true;
          }
        }
        if(tien) break;
      }
    }
  }

  const xong = !batBi && dat.every(Boolean);
  /* Thang độ khó: đo bằng CÔNG SỨC suy luận, không phải bằng bậc quy tắc cao nhất.
     Mọi đề đều cần ít nhất vài bước QT2, nên nếu chia theo bậc thì bậc "dễ" luôn rỗng. */
  const cong = dungQT[1] + dungQT[2] * 3;
  return {
    giaiDuoc: xong,
    dat,
    dungQT,
    cong,
    doKho: !xong ? null : dungQT[2] > 0 ? "khó" : cong <= 3 ? "dễ" : "vừa"
  };
}

/* ===== 5. ENGINE SINH ĐỀ ===== */
function sinhDe(opts = {}){
  const n      = opts.n      ?? 6;      // cạnh bàn cờ = số nhân vật
  const kMin   = opts.kMin   ?? 3;      // vùng nhỏ nhất
  const kMax   = opts.kMax   ?? 4;      // vùng lớn nhất
  const doKho  = opts.doKho  ?? null;   // "dễ" | "vừa" | "khó" | null = nhận hết
  const choSan = opts.choSan ?? 0;      // số người đứng sẵn (lộ chỗ) — bậc nhập môn
  const soLan  = opts.soLan  ?? 4000;   // số lần thử tối đa
  const R      = hlRng(opts.seed ?? (Date.now() & 0x7fffffff));

  for(let lan=0; lan<soLan; lan++){
    const cot = hlLoiGiai(n, R);
    if(!cot) continue;
    const k = kMin + Math.floor(R() * (kMax - kMin + 1));
    const { vung, chu } = hlVeVung(n, cot, k, R, choSan);

    if(hlDemNghiem(n, vung, 2) !== 1) continue;       // phải duy nhất
    const g = hlGiaiKieuNguoi(n, vung);
    if(!g.giaiDuoc) continue;                          // phải giải được, không đoán
    if(doKho && g.doKho !== doKho) continue;

    return {
      n, k, choSan, seed: opts.seed ?? null, soLanThu: lan + 1,
      loiGiai: cot.map((c,r) => [r,c]),
      vung, chu,
      doKho: g.doKho, dungQT: g.dungQT, cong: g.cong
    };
  }
  return null;
}

/* ===== 6. ENGINE KIỂM ĐỀ — soi một đề bất kỳ, kể cả đề vẽ tay ===== */
function kiemDe(de){
  const { n, vung } = de;
  const soNghiem = hlDemNghiem(n, vung, 3);
  const g = hlGiaiKieuNguoi(n, vung);

  /* vùng có chồng nhau không — hai địa danh đè lên nhau là vô nghĩa */
  const dem = {};
  let chongNhau = 0;
  vung.forEach(cells => cells.forEach(([r,c]) => {
    const t = r + "," + c; dem[t] = (dem[t] || 0) + 1;
    if(dem[t] === 2) chongNhau++;
  }));

  /* vùng có liền mạch không */
  const roiRac = vung.filter(cells => {
    const s = new Set(cells.map(o => o.join(",")));
    const q = [cells[0]], tham = new Set([cells[0].join(",")]);
    while(q.length){
      const [r,c] = q.pop();
      for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){
        const t = (r+dr) + "," + (c+dc);
        if(s.has(t) && !tham.has(t)){ tham.add(t); q.push([r+dr, c+dc]); }
      }
    }
    return tham.size !== cells.length;
  }).length;

  const dat = soNghiem === 1 && g.giaiDuoc && chongNhau === 0 && roiRac === 0;
  return {
    dat, soNghiem, giaiBangSuyLuan: g.giaiDuoc, doKho: g.doKho,
    dungQT: g.dungQT, oChongNhau: chongNhau, vungRoiRac: roiRac,
    coVung: vung.map(v => v.length),
    ghiChu: dat ? "đạt chuẩn"
      : soNghiem === 0 ? "vô nghiệm"
      : soNghiem > 1 ? `${soNghiem}+ nghiệm — chưa duy nhất`
      : !g.giaiDuoc ? "duy nhất nhưng phải ĐOÁN mới ra"
      : chongNhau ? "các vùng chồng lên nhau"
      : "vùng bị đứt đoạn"
  };
}

/* ===== 7. Thống kê để chỉnh tham số ===== */
function hlThongKe(opts = {}){
  const n = opts.n ?? 6, soLan = opts.soLan ?? 3000, choSan = opts.choSan ?? 0;
  const R = hlRng(opts.seed ?? 12345);
  const bang = {};
  for(let k = opts.kMin ?? 2; k <= (opts.kMax ?? 5); k++){
    let duyNhat = 0, suyLuanDuoc = 0, tong = 0;
    const kho = { dễ:0, vừa:0, khó:0 };
    for(let t=0; t<soLan; t++){
      const cot = hlLoiGiai(n, R); if(!cot) continue;
      tong++;
      const { vung } = hlVeVung(n, cot, k, R, choSan);
      if(hlDemNghiem(n, vung, 2) !== 1) continue;
      duyNhat++;
      const g = hlGiaiKieuNguoi(n, vung);
      if(g.giaiDuoc){ suyLuanDuoc++; kho[g.doKho]++; }
    }
    bang[`vùng ${k} ô`] = {
      duyNhat: +(duyNhat/tong*100).toFixed(1) + "%",
      dungChuan: +(suyLuanDuoc/tong*100).toFixed(1) + "%",
      trongSoDuyNhatThiSuyLuanDuoc: duyNhat ? +(suyLuanDuoc/duyNhat*100).toFixed(0) + "%" : "-",
      phanBoDoKho: kho
    };
  }
  return bang;
}
