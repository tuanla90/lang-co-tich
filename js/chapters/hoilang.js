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
  if(levels.length)
    CHAPTERS.push({ id: 99, name: "Chương · Hội làng", title: "Hội làng", levels });
})();
