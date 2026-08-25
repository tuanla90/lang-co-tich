/* ============================================================
   hoilang.js — HỘI LÀNG: bộ SINH đề và bộ KIỂM đề.
   Không đụng DOM, không phụ thuộc phần còn lại của game.

   Luật chơi (đã chốt):
     · Mỗi hàng đúng một người, mỗi cột đúng một người   (quân xe)
     · Không ai đứng sát ai, kể cả góc chéo              (ai cũng cần khoảng trống)
     · Mỗi người chỉ đứng trong VÙNG của mình            (làng Tấm, núi Tản Viên…)
     · MỐC: vài cảnh vật (cây đa, cây cau…) mà một người phải đứng KỀ bên

   Hai engine:
     sinhDe(opts)   → đẻ ra một đề đạt chuẩn, hoặc null nếu hết lượt thử
     kiemDe(de)     → soi một đề bất kỳ, kể cả đề vẽ tay

   Chuẩn nhận đề — cả bốn đều phải đạt:
     1. ĐÚNG 1 lời giải
     2. Giải trọn bằng suy diễn cưỡng bức, không bước nào phải đoán
     3. Không thoái hoá: người phải tìm nào cũng còn ≥3 ô, cả bàn ≥60 tổ hợp
     4. Vùng liền mạch, không chồng nhau, mốc không đè lên vùng
   ============================================================ */

/* ===== Bộ số ngẫu nhiên CÓ HẠT GIỐNG — cùng seed thì cùng đề, để tái hiện khi
   gỡ lỗi và để làm "câu đố mỗi ngày" (lấy số của ngày làm seed). ===== */
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
const KE8 = (a,b,c,d) => Math.abs(a-c)<=1 && Math.abs(b-d)<=1;    // sát nhau, kể cả chéo
const KE4 = (a,b,c,d) => Math.abs(a-c) + Math.abs(b-d) === 1;     // kề cạnh — dùng cho mốc
const BON = [[1,0],[-1,0],[0,1],[0,-1]];

/* ===== 1. Lời giải: hoán vị cột, hai hàng liền nhau phải lệch cột ≥ 2 ===== */
function hlLoiGiai(n, R){
  const cot = [];
  const rec = r => {
    if(r === n) return true;
    for(const c of hlShuffle([...Array(n).keys()], R)){
      if(cot.includes(c)) continue;
      if(r > 0 && Math.abs(c - cot[r-1]) <= 1) continue;
      cot.push(c);
      if(rec(r+1)) return true;
      cot.pop();
    }
    return false;
  };
  return rec(0) ? cot : null;      // cot[hàng] = cột
}

/* ===== 2. Vẽ vùng: liên thông, RỜI NHAU, mỗi vùng một cỡ riêng =====
   coVung[v] = số ô mong muốn. Mọc luân phiên để không vùng nào nuốt hết chỗ. */
function hlVeVung(n, cot, coVung, R, choSan = 0){
  const chu = Array.from({length:n}, () => Array(n).fill(-1));   // -1 trống, -2 mốc
  const vung = [];
  for(let v=0; v<n; v++){ chu[v][cot[v]] = v; vung.push([[v, cot[v]]]); }

  /* Người đứng sẵn: vùng chỉ 1 ô — gợi ý cho trước, không tính là thoái hoá */
  const muc = coVung.slice();
  hlShuffle([...Array(n).keys()], R).slice(0, choSan).forEach(v => muc[v] = 1);

  let mocThem = true;
  while(mocThem){
    mocThem = false;
    for(let v=0; v<n; v++){
      if(vung[v].length >= muc[v]) continue;
      const ungVien = [];
      for(const [r,c] of vung[v])
        for(const [dr,dc] of BON){
          const a=r+dr, b=c+dc;
          if(a>=0 && a<n && b>=0 && b<n && chu[a][b] === -1) ungVien.push([a,b]);
        }
      if(!ungVien.length) continue;               // vùng bị kẹt, đành để nhỏ hơn
      const [a,b] = hlPick(ungVien, R);
      chu[a][b] = v; vung[v].push([a,b]);
      mocThem = true;
    }
  }
  return { vung, chu };
}

/* Một tập ô có liền một mạch không */
function hlLienThong(cells){
  if(!cells.length) return false;
  const s = new Set(cells.map(o => o.join(",")));
  const q = [cells[0]], tham = new Set([cells[0].join(",")]);
  while(q.length){
    const [r,c] = q.pop();
    for(const [dr,dc] of BON){
      const t = (r+dr) + "," + (c+dc);
      if(s.has(t) && !tham.has(t)){ tham.add(t); q.push([r+dr, c+dc]); }
    }
  }
  return tham.size === cells.length;
}

/* ===== 3. Một vùng ÔM HẾT chỗ trống còn lại (sân hội mênh mông).
   Loang từ chính vùng đó nên chắc chắn vẫn liền mạch. Gọi SAU khi đã đặt mốc,
   để mốc không bị nuốt mất. ===== */
function hlOmHet(n, chu, vung, v){
  let them = true;
  while(them){
    them = false;
    for(const [r,c] of vung[v].slice())
      for(const [dr,dc] of BON){
        const a=r+dr, b=c+dc;
        if(a>=0 && a<n && b>=0 && b<n && chu[a][b] === -1){
          chu[a][b] = v; vung[v].push([a,b]); them = true;
        }
      }
  }
}

/* ===== 4. Mốc cảnh vật: ô KHÔNG thuộc vùng nào, nằm kề ô lời giải của một người.
   Người ấy buộc đứng kề mốc → siết lựa chọn mà vùng vẫn to, vẫn đẹp. ===== */
function hlDatMoc(n, cot, chu, soMoc, R){
  const moc = [];
  for(const v of hlShuffle([...Array(n).keys()], R)){
    if(moc.length >= soMoc) break;
    const [r,c] = [v, cot[v]];
    const oTrong = BON.map(([dr,dc]) => [r+dr, c+dc])
      .filter(([a,b]) => a>=0 && a<n && b>=0 && b<n && chu[a][b] === -1);
    if(!oTrong.length) continue;
    const o = hlPick(oTrong, R);
    chu[o[0]][o[1]] = -2;                        // -2 = cảnh vật, không ai đứng lên
    moc.push({ nguoi: v, o });
  }
  return moc;
}

/* ===== 4b. VẬT CẢN THUẦN — ao nước, tảng đá… nằm BÊN TRONG vùng.
   Khác mốc ở chỗ: mốc thêm một manh mối phải đọc, vật cản chỉ lặng lẽ bớt chỗ đứng.
   Với trẻ nhỏ đây là cần gạt quý nhất: giảm không gian mà không thêm chữ nào.
   Ví dụ: thả cái ao vào giữa làng — hôm nay Thuỷ Tinh không dự hội thì nước chỉ là
   vật cản; hôm nào có Thuỷ Tinh thì chính ô nước ấy lại là chỗ đứng của thần. */
function hlDatVatCan(n, chu, vung, cot, so, R){
  const vc = [];
  const ungVien = hlShuffle(
    [].concat(...vung.map((cells, v) => cells
      .filter(([r,c]) => cot[r] !== c)              // chừa ô lời giải ra
      .map(([r,c]) => [r,c,v]))), R);
  for(const [r,c,v] of ungVien){
    if(vc.length >= so) break;
    if(vung[v].length <= 3) continue;               // giữ vùng đủ rộng, kẻo thoái hoá
    const conLai = vung[v].filter(([a,b]) => !(a===r && b===c));
    if(!hlLienThong(conLai)) continue;              // không được cắt đứt vùng
    vung[v] = conLai; chu[r][c] = -3;               // -3 = vật cản
    vc.push([r,c]);
  }
  return vc;
}

/* Ứng viên THẬT = ô trong vùng, lọc thêm theo mốc.
   Vùng vẫn hiện nguyên cỡ; mốc siết ngầm — trẻ phải tự ghép hai manh mối. */
function hlUngVien(vung, moc){
  const u = vung.map(cells => cells.map(o => o.slice()));
  for(const m of moc)
    u[m.nguoi] = u[m.nguoi].filter(([r,c]) => KE4(r, c, m.o[0], m.o[1]));
  return u;
}

/* ===== 5. Đếm nghiệm (dừng sớm khi đủ giới hạn) ===== */
function hlDemNghiem(n, ung, gioiHan = 2){
  const H = new Set(), C = new Set(), da = [];
  let d = 0;
  (function rec(v){
    if(d >= gioiHan) return;
    if(v === n){ d++; return; }
    for(const [r,c] of ung[v]){
      if(H.has(r) || C.has(c)) continue;
      if(da.some(([a,b]) => KE8(a,b,r,c))) continue;
      H.add(r); C.add(c); da.push([r,c]);
      rec(v+1);
      H.delete(r); C.delete(c); da.pop();
    }
  })(0);
  return d;
}

/* ===== 6. SOLVER KIỂU NGƯỜI — chỉ suy diễn cưỡng bức, TUYỆT ĐỐI không đoán.
   Đây mới là thước đo thật: đề có thể duy nhất nghiệm mà vẫn bắt trẻ mò.
     QT1: một người chỉ còn đúng một ô            → đặt luôn
     QT2: một hàng/cột chỉ còn một người vào được → người ấy phải ở đó
     QT3: một người chỉ còn nằm trên một hàng     → mọi người khác tránh hàng ấy
   ===== */
function hlGiaiKieuNguoi(n, ung0){
  const ung = ung0.map(cells => cells.map(o => o.slice()));
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

    for(let v=0; v<n && !batBi; v++){                       // QT1
      if(dat[v]) continue;
      if(ung[v].length === 0){ batBi = true; break; }
      if(ung[v].length === 1){ datVao(v, ung[v][0], 0); tien = true; }
    }
    if(tien || batBi) continue;

    for(const truc of [0,1]){                               // QT2
      for(let i=0; i<n && !tien; i++){
        const ai = [];
        for(let v=0; v<n; v++) if(ung[v].some(o => o[truc] === i)) ai.push(v);
        if(ai.length !== 1) continue;
        const v = ai[0];
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

    for(let v=0; v<n && !tien; v++){                        // QT3
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
  /* Không gian tìm kiếm = tích số ô hợp lệ. Nhỏ quá thì trẻ MÒ ra chứ không suy ra —
     đề hỏng dù logic vẫn duy nhất. Vùng 2 ô × 6 người = 64 tổ hợp: mò được. */
  const khongGian = ung0.reduce((t, cells) => t * Math.max(cells.length, 1), 1);
  const phaiTim = ung0.filter(c => c.length > 1);          // bỏ qua người đứng sẵn
  const itNhat = phaiTim.length ? Math.min(...phaiTim.map(c => c.length)) : 1;
  /* Độ khó đo bằng CÔNG SỨC, không phải bậc quy tắc cao nhất — vì mọi đề đều cần QT2,
     chia theo bậc thì bậc "dễ" luôn rỗng. */
  const cong = dungQT[1] + dungQT[2] * 3;
  return {
    giaiDuoc: xong, dat, dungQT, cong, khongGian, itNhat,
    doKho: !xong ? null : dungQT[2] > 0 ? "khó" : cong <= 3 ? "dễ" : "vừa"
  };
}

/* ===== 7. Dựng một đề thô từ hạt giống — dùng chung cho sinh và thống kê ===== */
function hlDungDe(n, co, soMoc, choSan, omHet, soVatCan, R){
  const cot = hlLoiGiai(n, R);
  if(!cot) return null;
  const coVung = hlShuffle(Array.from({length:n}, (_, i) => co[i % co.length]), R);
  const { vung, chu } = hlVeVung(n, cot, coVung, R, choSan);
  const moc = soMoc ? hlDatMoc(n, cot, chu, soMoc, R) : [];
  /* ôm hết SAU khi đặt mốc, và người đứng sẵn thì không ôm (vùng họ phải giữ 1 ô) */
  let vungOm = null;
  if(omHet){
    const ungVienOm = [...Array(n).keys()].filter(v => vung[v].length > 1);
    if(ungVienOm.length){ vungOm = hlPick(ungVienOm, R); hlOmHet(n, chu, vung, vungOm); }
  }
  /* vật cản khoét sau cùng, khi hình dạng vùng đã chốt */
  const vatCan = soVatCan ? hlDatVatCan(n, chu, vung, cot, soVatCan, R) : [];
  return { cot, coVung, vung, chu, moc, vungOm, vatCan };
}

/* ===== 8. ENGINE SINH ĐỀ ===== */
function sinhDe(opts = {}){
  const n      = opts.n      ?? 6;              // cạnh bàn cờ = số nhân vật
  const co     = opts.co     ?? [4,4,4,4,4,5];  // cỡ từng vùng (xáo thứ tự mỗi lần)
  const soMoc  = opts.soMoc  ?? 2;              // số cảnh vật làm mốc (0–3)
  const choSan = opts.choSan ?? 0;              // số người đứng sẵn
  const omHet  = opts.omHet  ?? false;          // một vùng ôm hết chỗ trống còn lại
  const soVatCan = opts.soVatCan ?? 0;          // ao/đá khoét trong vùng — bớt chỗ, không thêm chữ
  const doKho  = opts.doKho  ?? null;           // "dễ" | "vừa" | "khó" | null
  const soLan  = opts.soLan  ?? 8000;
  const oItNhat    = opts.oItNhat ?? 3;         // cửa chặn thoái hoá
  const kgToiThieu = opts.khongGianToiThieu ?? 60;
  const R = hlRng(opts.seed ?? (Date.now() & 0x7fffffff));

  for(let lan=0; lan<soLan; lan++){
    const t = hlDungDe(n, co, soMoc, choSan, omHet, soVatCan, R);
    if(!t) continue;
    const ung = hlUngVien(t.vung, t.moc);

    if(hlDemNghiem(n, ung, 2) !== 1) continue;         // phải duy nhất
    const g = hlGiaiKieuNguoi(n, ung);
    if(!g.giaiDuoc) continue;                           // phải suy ra, không đoán
    if(g.itNhat < oItNhat) continue;                    // không ai bị bó còn 1–2 ô
    if(g.khongGian < kgToiThieu) continue;              // cả bàn phải đủ rộng
    if(doKho && g.doKho !== doKho) continue;

    return {
      n, co: t.coVung, soMoc: t.moc.length, choSan, vungOm: t.vungOm,
      vatCan: t.vatCan, soVatCan: t.vatCan.length,
      seed: opts.seed ?? null, soLanThu: lan + 1,
      loiGiai: t.cot.map((c,r) => [r,c]),
      vung: t.vung, chu: t.chu, moc: t.moc,
      doKho: g.doKho, dungQT: g.dungQT, cong: g.cong,
      khongGian: g.khongGian, itNhat: g.itNhat
    };
  }
  return null;
}

/* ===== 9. ENGINE KIỂM ĐỀ — soi được cả đề máy sinh lẫn đề vẽ tay ===== */
function kiemDe(de){
  const { n, vung } = de;
  const moc = de.moc || [];
  const ung = hlUngVien(vung, moc);
  const soNghiem = hlDemNghiem(n, ung, 3);
  const g = hlGiaiKieuNguoi(n, ung);

  /* vùng chồng nhau — hai địa danh đè lên nhau là vô nghĩa */
  const dem = {};
  let chongNhau = 0;
  vung.forEach(cells => cells.forEach(([r,c]) => {
    const t = r + "," + c; dem[t] = (dem[t] || 0) + 1;
    if(dem[t] === 2) chongNhau++;
  }));

  /* mốc có lỡ nằm đè lên vùng nào không */
  const mocDeVung = moc.filter(m =>
    vung.some(cells => cells.some(([r,c]) => r === m.o[0] && c === m.o[1]))).length;

  /* vùng có liền mạch không */
  const roiRac = vung.filter(cells => {
    const s = new Set(cells.map(o => o.join(",")));
    const q = [cells[0]], tham = new Set([cells[0].join(",")]);
    while(q.length){
      const [r,c] = q.pop();
      for(const [dr,dc] of BON){
        const t = (r+dr) + "," + (c+dc);
        if(s.has(t) && !tham.has(t)){ tham.add(t); q.push([r+dr, c+dc]); }
      }
    }
    return tham.size !== cells.length;
  }).length;

  const thoaiHoa = g.itNhat < 3 || g.khongGian < 60;
  const dat = soNghiem === 1 && g.giaiDuoc && !chongNhau && !roiRac
            && !mocDeVung && !thoaiHoa;
  return {
    dat, soNghiem, giaiBangSuyLuan: g.giaiDuoc, doKho: g.doKho,
    khongGian: g.khongGian, oItNhat: g.itNhat, dungQT: g.dungQT,
    coVung: vung.map(v => v.length), soMoc: moc.length,
    ghiChu: dat ? "đạt chuẩn"
      : soNghiem === 0 ? "vô nghiệm"
      : soNghiem > 1 ? `${soNghiem}+ nghiệm — chưa duy nhất`
      : !g.giaiDuoc ? "duy nhất nhưng phải ĐOÁN mới ra"
      : chongNhau ? "các vùng chồng lên nhau"
      : roiRac ? "vùng bị đứt đoạn"
      : mocDeVung ? "mốc nằm đè lên vùng — mốc phải là ô cảnh vật riêng"
      : `thoái hoá — mò ra được (hẹp nhất ${g.itNhat} ô, cả bàn ${g.khongGian} tổ hợp)`
  };
}

/* ===== 10. Thống kê để chỉnh tham số ===== */
function hlThongKe(opts = {}){
  const n = opts.n ?? 6, soLan = opts.soLan ?? 2000;
  const co = opts.co ?? [4,4,4,4,4,5];
  const R = hlRng(opts.seed ?? 12345);
  let duyNhat = 0, dungChuan = 0, tong = 0, tongKG = 0, tongOm = 0;
  const kho = { dễ:0, vừa:0, khó:0 };
  for(let i=0; i<soLan; i++){
    const t = hlDungDe(n, co, opts.soMoc ?? 0, opts.choSan ?? 0, opts.omHet ?? false, opts.soVatCan ?? 0, R);
    if(!t) continue;
    tong++;
    const ung = hlUngVien(t.vung, t.moc);
    if(hlDemNghiem(n, ung, 2) !== 1) continue;
    duyNhat++;
    const g = hlGiaiKieuNguoi(n, ung);
    if(g.giaiDuoc && g.itNhat >= 3 && g.khongGian >= 60){
      dungChuan++; kho[g.doKho]++; tongKG += g.khongGian;
      if(t.vungOm !== null) tongOm += t.vung[t.vungOm].length;
    }
  }
  return {
    duyNhat: +(duyNhat/tong*100).toFixed(1) + "%",
    dungChuan: +(dungChuan/tong*100).toFixed(1) + "%",
    khongGianTB: dungChuan ? Math.round(tongKG/dungChuan) : 0,
    vungOmTB: dungChuan && tongOm ? +(tongOm/dungChuan).toFixed(1) : null,
    phanBoDoKho: kho
  };
}

/* ============================================================
   PHẦN GHÉP VÀO GAME — từ đây trở xuống dùng quy ước toạ độ của game:
   ô = [x, y] = [cột, hàng]  (engine sinh đề ở trên dùng [hàng, cột])
   ============================================================ */

const hlDoi = ([r,c]) => [c,r];        // [hàng,cột] → [x,y]

/* Dựng một màn hội làng hoàn chỉnh, sẵn sàng nhét vào LEVELS */
function taoManHoiLang(opt){
  const de = sinhDe({
    n: opt.chars.length, co: opt.co, soMoc: opt.soMoc, soVatCan: opt.soVatCan,
    omHet: opt.omHet, doKho: opt.doKho, seed: opt.seed, soLan: opt.soLan ?? 80000
  });
  if(!de) return null;

  const vung = de.vung.map(cells => cells.map(hlDoi));
  return {
    type: "hoilang",
    name: opt.name || "Hội làng",
    cols: de.n, rows: de.n,
    chars: opt.chars.slice(),
    scene: opt.scene || "",
    story: opt.story || "",
    vung,                                            // vung[i] = ô của chars[i]
    tenVung: opt.tenVung || de.vung.map((_,i)=>"Vùng "+(i+1)),
    moc: de.moc.map(m => ({ c: opt.chars[m.nguoi], o: hlDoi(m.o) })),
    vatCan: de.vatCan.map(hlDoi),
    mocArt: opt.mocArt || "cayda",
    canArt: opt.canArt || "ao",
    loiGiai: Object.fromEntries(de.loiGiai.map((o,i) => [opt.chars[i], hlDoi(o)])),
    doKho: de.doKho, seed: de.seed, khongGian: de.khongGian
  };
}

/* Chấm luật — trả về mảng true/false/null đúng quy ước evalCons của game:
   true = xanh, false = đỏ, null = chưa đủ thông tin để phán */
function hlLuat(lv){
  const ds = [
    { txt: "Mỗi hàng chỉ một người" },
    { txt: "Mỗi cột chỉ một người" },
    { txt: "Không ai đứng sát ai, kể cả góc chéo" },
    { txt: "Ai cũng đứng trong vùng của mình" },
  ];
  for(const m of lv.moc)
    ds.push({ txt: `${CHARS[m.c].name} đứng cạnh ${ENVS[lv.mocArt].name}` });
  return ds;
}

function hlCham(lv){
  const P = lv.chars.map(c => place[c]);
  const daDat = P.filter(Boolean);
  const dayDu = daDat.length === lv.chars.length;
  const res = [];

  /* 1–2. trùng hàng / trùng cột */
  for(const truc of [1,0]){                       // y = hàng, x = cột
    const v = daDat.map(o => o[truc]);
    res.push(new Set(v).size !== v.length ? false : dayDu ? true : null);
  }

  /* 3. đứng sát nhau (kể cả chéo) */
  let sat = false;
  for(let i=0;i<daDat.length;i++) for(let j=i+1;j<daDat.length;j++)
    if(Math.abs(daDat[i][0]-daDat[j][0])<=1 && Math.abs(daDat[i][1]-daDat[j][1])<=1) sat = true;
  res.push(sat ? false : dayDu ? true : null);

  /* 4. đúng vùng của mình */
  let lacVung = false, duVung = true;
  lv.chars.forEach((c,i) => {
    const p = P[i];
    if(!p){ duVung = false; return; }
    if(!lv.vung[i].some(([x,y]) => x===p[0] && y===p[1])) lacVung = true;
  });
  res.push(lacVung ? false : duVung ? true : null);

  /* 5+. từng mốc */
  for(const m of lv.moc){
    const p = place[m.c];
    if(!p){ res.push(null); continue; }
    res.push(Math.abs(p[0]-m.o[0]) + Math.abs(p[1]-m.o[1]) === 1);
  }
  return res;
}

/* Ô này có đặt người được không: phải trong vùng của người đó, không phải mốc/vật cản */
function hlDatDuoc(lv, c, x, y){
  if(lv.vatCan.some(o => o[0]===x && o[1]===y)) return false;
  if(lv.moc.some(m => m.o[0]===x && m.o[1]===y)) return false;
  const i = lv.chars.indexOf(c);
  return i >= 0 && lv.vung[i].some(o => o[0]===x && o[1]===y);
}

/* Ô này thuộc vùng của ai (để tô màu) — trả chỉ số nhân vật hoặc -1 */
function hlVungCua(lv, x, y){
  for(let i=0;i<lv.vung.length;i++)
    if(lv.vung[i].some(o => o[0]===x && o[1]===y)) return i;
  return -1;
}
