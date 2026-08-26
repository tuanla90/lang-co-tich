/* ============================================================
   chotet.js — Chương chèn giữa (id 4.5): PHIÊN CHỢ TẾT
   Sau khi giặc Ân tan (chương 4), làng mở chợ Tết mừng thắng trận.

   Chương này là "chương trả bài" cho đợt review bộ sinh đề:
   · Màn 2–3: HAI mốc, MỖI MỐC MỘT HÌNH RIÊNG (cây đa + giếng) —
     vá điểm mơ hồ khi soMoc ≥ 2 dùng chung một hình.
   · Màn 3: datTuDo — đặt đâu cũng được, luật "đúng vùng" chuyển
     từ CHẶN sang CHẤM: chip vùng lần đầu tiên biết đỏ.
   · Màn 1: bàn 4×4 — dùng cửa khongGianToiThieu hạ chuẩn đúng cách
     (ngưỡng mặc định 60 được chỉnh cho bàn 6×6).
   Seed đã săn và kiểm: 20270013 (dễ) · 20280156 (vừa, đủ 2 mốc)
   · 20301534 (khó, đủ 2 mốc — cần soMocDu vì soMoc chỉ là mức trần).
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

(function(){
  /* Mốc theo NGHỀ / truyện của từng người bán, không dùng chung một hình */
  const MOC = { tam:"gieng", bom:"mocau", khoai:"tre", balao:"quan", phuong:"thung" };
  const KHACH4 = ["tam","bom","khoai","balao"];
  const VUNG4  = ["Hàng lụa đào","Hàng quà bánh","Hàng tre nứa","Hàng nước"];
  const KHACH5 = [...KHACH4, "phuong"];
  const VUNG5  = [...VUNG4, "Hàng thóc gạo"];

  const levels = [];

  const m1 = taoManHoiLang({
    name:"Chợ Tết mở hàng", chars:KHACH4, tenVung:VUNG4,
    co:[4,4,4,4], soMoc:1, soVatCan:1, omHet:false,
    doKho:"dễ", seed:20270013, khongGianToiThieu:48,
    mocTheoNguoi:MOC, canArt:"rom",
    scene:"Giặc tan, làng mở <b>phiên chợ Tết</b> mừng thắng trận! Bốn hàng quán dọn ra — <b>mỗi hàng một chủ, ai đứng hàng nấy</b>, mỗi hàng một cột một người, và nhớ chừa lối đi: <b>không ai đứng sát ai</b>.",
    story:"Chợ mở hàng may mắn — khách kéo đến mỗi lúc một đông…"});
  if(m1) levels.push(m1);

  const m2 = taoManHoiLang({
    name:"Chợ đông khách", chars:KHACH5, tenVung:VUNG5,
    co:[4,4,4,4,5], soMoc:2, soMocDu:true, soVatCan:2, omHet:true,
    doKho:"vừa", seed:20280156,
    mocTheoNguoi:MOC, mocArts:["cayda","gieng"], canArt:"rom",
    scene:"Phú ông cũng dọn hàng thóc ra bán! Chợ giờ có <b>hai chỗ hẹn</b>: gốc <b>cây đa</b> và bờ <b>giếng</b> — nhìn kỹ manh mối xem AI phải đứng cạnh CHỖ NÀO, đừng nhầm hai nơi với nhau.",
    story:"Kẻ bán người mua tấp nập, mà nhờ xếp khéo nên chẳng ai chen ai."});
  if(m2) levels.push(m2);

  const m3 = taoManHoiLang({
    name:"Vãn chợ — tự xếp", chars:KHACH5, tenVung:VUNG5,
    co:[4,4,4,4,4], soMoc:2, soMocDu:true, soVatCan:3, omHet:true,
    doKho:"khó", seed:20301534, datTuDo:true,
    mocTheoNguoi:MOC, mocArts:["cayda","gieng"], canArt:"rom",
    scene:"Phiên cuối năm, lệ làng nới tay: <b>ai thích đứng đâu thì đứng</b>… nhưng <b>luật vẫn là luật</b> — đứng lạc khỏi hàng của mình là trống chèo nhắc ngay đấy! (Lần này không ai chặn tay con đâu — tự xếp, tự soi luật nhé.)",
    story:"Chợ vãn, ai về hàng nấy gọn gàng. Ông từ giữ đình gật gù: “Trẻ con làng này xếp chợ còn khéo hơn người lớn.”<br><b>— Hết phiên chợ Tết —</b><br>Ra giêng, trên núi Tản Viên nghe đâu có chuyện lạ: <b>vua Hùng sắp kén rể</b>…"});
  if(m3) levels.push(m3);

  if(levels.length)
    CHAPTERS.push({ id: 4.5, title: "Phiên chợ Tết", name: "Chương · Phiên chợ Tết", levels });
})();
