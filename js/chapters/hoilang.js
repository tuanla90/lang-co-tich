/* ============================================================
   hoilang.js (chương) — HỘI LÀNG: nơi nhân vật các truyện gặp nhau.
   Màn được SINH TỰ ĐỘNG lúc tải trang, không viết tay từng đề.
   Đổi seed là ra đề khác; bỏ seed đi là mỗi lần mở một đề mới.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

/* Sáu nhân vật, mỗi người một địa danh của riêng mình */
const HL_KHACH = [
  /* moc = vật làm mốc, lấy từ CHÍNH truyện của nhân vật ấy.
     Mỗi người một hình khác nhau — hai mốc trùng hình thì manh mối hoá mơ hồ. */
  { c:"tam",     vung:"Làng của Tấm",  moc:"gieng"  },  // giếng nuôi cá Bống
  { c:"sontinh", vung:"Núi Tản Viên",  moc:"nui"    },  // núi Tản, chứ không phải cây đa!
  { c:"bom",     vung:"Bãi chăn trâu", moc:"mocau"  },  // chiếc quạt mo bất ly thân
  { c:"khoai",   vung:"Rừng tre",      moc:"tre"    },  // bụi tre trăm đốt
  { c:"giongts", vung:"Làng Phù Đổng", moc:"noicom" },  // nồi cơm cả làng góp
  { c:"tan",     vung:"Bến sông",      moc:"caycau" },  // cây cau — chính chàng hoá thành
];

/* Tham số ba bậc — đã đo và chốt ở engine sinh đề */
const HL_CAUHINH = {
  "dễ":  { co:[4,4,4,4,4,4], soMoc:1, soVatCan:4, omHet:false, doKho:"dễ"  },
  "vừa": { co:[4,4,4,4,4,5], soMoc:1, soVatCan:3, omHet:true,  doKho:"vừa" },
  "khó": { co:[4,4,4,4,4,5], soMoc:1, soVatCan:3, omHet:true,  doKho:"khó" },
};
const HL_SCENE = {
  "dễ":  "Hội làng mở rồi! <b>Mỗi hàng một người, mỗi cột một người, ai cũng cần một khoảng trống quanh mình</b> — chen sát quá thì còn xem đám rước sao được.",
  "vừa": "Sân hội hôm nay rộng hơn, có chỗ lầy nước không đứng được. Vẫn luật cũ: <b>mỗi hàng một người, mỗi cột một người, không ai đứng sát ai</b>.",
  "khó": "Bậc khó đây. Đừng đoán — cứ lần từng manh mối một, kiểu gì cũng ra. <b>Mỗi hàng một người, mỗi cột một người, không ai đứng sát ai.</b>",
};

/* Ba bậc — tham số đã đo và chốt ở engine sinh đề */
const HL_BAC = [
  { ten:"Hội làng · dễ",  doKho:"dễ",
    co:[4,4,4,4,4,4], soMoc:1, soVatCan:4, omHet:false, seed:20260001,
    scene:"Hội làng mở rồi! Ai cũng về đúng chỗ của mình. <b>Mỗi hàng một người, mỗi cột một người, và ai cũng cần một khoảng trống quanh mình</b> — chen sát quá thì còn xem đám rước sao được." },
  { ten:"Hội làng · vừa", doKho:"vừa",
    co:[4,4,4,4,4,5], soMoc:1, soVatCan:3, omHet:true,  seed:20260002,
    scene:"Sân hội hôm nay rộng hơn, có chỗ lầy nước không đứng được. Vẫn luật cũ: <b>mỗi hàng một người, mỗi cột một người, không ai đứng sát ai</b>." },
  { ten:"Hội làng · khó", doKho:"khó",
    co:[4,4,4,4,4,5], soMoc:1, soVatCan:3, omHet:true,  seed:20260003,
    scene:"Bậc khó đây. Đừng đoán — cứ lần từng manh mối một, kiểu gì cũng ra. <b>Mỗi hàng một người, mỗi cột một người, không ai đứng sát ai.</b>" },
];

(function(){
  const levels = [];
  for(const b of HL_BAC){
    const man = taoManHoiLang({
      name: b.ten, scene: b.scene,
      chars:   HL_KHACH.map(k => k.c),
      tenVung: HL_KHACH.map(k => k.vung),
      co: b.co, soMoc: b.soMoc, soVatCan: b.soVatCan, omHet: b.omHet,
      doKho: b.doKho, seed: b.seed,
      mocTheoNguoi: Object.fromEntries(HL_KHACH.map(k => [k.c, k.moc])),
      canArt: "ao",             // vật cản: vũng nước — hôm nay Thuỷ Tinh không dự hội
      story: "Ai cũng có chỗ đứng của mình. Hội làng đông mà chẳng ai phải chen ai."
    });
    if(man) levels.push(man);
  }
  /* ===== CHẾ ĐỘ VÔ TẬN =====
     Một ô đề DUY NHẤT nằm cuối chương, được thay đề TẠI CHỖ mỗi lần bấm "Đề mới".
     Giữ nguyên một slot trong LEVELS nên toàn bộ engine/UI dùng lại được y nguyên;
     cờ voTan để nav ẩn nó đi và hộp thắng đổi nút thành "Đề mới". */
  const oVoTan = taoManHoiLang({
    name: "Hội làng vô tận", chars: HL_KHACH.map(k => k.c),
    tenVung: HL_KHACH.map(k => k.vung),
    mocTheoNguoi: Object.fromEntries(HL_KHACH.map(k => [k.c, k.moc])),
    canArt: "ao", ...HL_CAUHINH["vừa"], seed: 20260010,
    scene: HL_SCENE["vừa"], story: "Giải xong một đề, hội lại dọn ra đề mới!"
  });
  if(oVoTan){ oVoTan.voTan = true; levels.push(oVoTan); }

  if(levels.length)
    CHAPTERS.push({ id: 99, name: "Chương · Hội làng", title: "Hội làng", levels });
})();

/* Tham số ba bậc — dùng chung cho cả màn cố định lẫn chế độ vô tận */
function HL_THAMSO(){ return HL_CAUHINH; }

/* Thay đề tại chỗ. Trả về chỉ số màn vô tận, hoặc -1 nếu chưa sinh được. */
function deMoiHoiLang(doKho){
  const i = LEVELS.findIndex(l => l.voTan);
  if(i < 0) return -1;
  const c = HL_CAUHINH[doKho] || HL_CAUHINH["vừa"];
  let man = null;
  for(let thu = 0; thu < 40 && !man; thu++){           // vài hạt giống lỡ không ra đề đạt chuẩn
    man = taoManHoiLang({
      name: "Hội làng vô tận · " + doKho,
      chars: HL_KHACH.map(k => k.c), tenVung: HL_KHACH.map(k => k.vung),
      mocTheoNguoi: Object.fromEntries(HL_KHACH.map(k => [k.c, k.moc])),
      canArt: "ao", ...c,
      seed: (Math.random() * 2e9) | 0,
      scene: HL_SCENE[doKho] || HL_SCENE["vừa"],
      story: "Giải xong một đề, hội lại dọn ra đề mới!"
    });
  }
  if(!man) return -1;
  const giu = { id: LEVELS[i].id, _ch: LEVELS[i]._ch, voTan: true, doKhoChon: doKho };
  Object.keys(LEVELS[i]).forEach(k => delete LEVELS[i][k]);
  Object.assign(LEVELS[i], man, giu);
  /* gắn lại nhãn kỹ năng + tier — thiếu là lượt chơi không được tính vào Góc cha mẹ */
  if(typeof apDungNhan === "function") apDungNhan([LEVELS[i]]);
  return i;
}

/* Đếm số đề đã giải ở chế độ vô tận */
function hlSoDeDaGiai(){ try{ return +(localStorage.getItem("lct_hl_dem")||0); }catch(e){ return 0; } }
function hlDemThemMotDe(){ try{ localStorage.setItem("lct_hl_dem", hlSoDeDaGiai()+1); }catch(e){} }
