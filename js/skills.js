/* ============================================================
   skills.js — GẮN NHÃN KỸ NĂNG + ĐỘ KHÓ cho từng màn (nền của C2).
   Nhãn đầu tiên = kỹ năng CHÍNH (trọng số đủ), nhãn sau = phụ (nửa).
   tier: 1 làm quen · 2 vận dụng · 3 thử thách.

   Cách hoạt động: màn tự khai skills/tier thì tôn trọng; không thì
   tra bảng override theo id; không nốt thì heuristic theo loại màn.
   → Chèn/thêm màn mới không bao giờ vỡ: luôn có nhãn mặc định hợp lý.
   ============================================================ */

const SKILL_NAMES = {
  suyluan:  "Suy luận",
  khonggian:"Không gian",
  dochieu:  "Đọc hiểu",
  ghinho:   "Ghi nhớ",
  kehoach:  "Lập kế hoạch",
};

/* Override theo id màn — chỉ những màn có "chữ ký" riêng, còn lại để heuristic lo */
const SKILL_TAGS = {
  // Chương 1 · Tấm Cám
  "c1:Bắt tép":            {s:["khonggian"],t:1},
  "c1:Giỏ tép":            {s:["khonggian"],t:1},
  "c1:Bụt hiện lên":       {s:["khonggian"],t:1},
  "c1:Nuôi Bống":          {s:["khonggian","kehoach"],t:2},
  "c1:Nghe lén":           {s:["dochieu","khonggian"],t:2},
  "c1:Chăn trâu đồng xa":  {s:["kehoach","dochieu"],t:2},
  "c1:Nhặt thóc":          {s:["kehoach","khonggian"],t:3},
  "c1:Thử hài":            {s:["kehoach","khonggian"],t:3},
  "c1:Cây cau":            {s:["khonggian","dochieu"],t:2},
  "c1:Quả thị":            {s:["suyluan","khonggian"],t:2},
  "c1:Đón Tấm về cung":    {s:["kehoach"],t:2},
  // Chương 2 · Thằng Bờm — điệp khúc "chẳng lấy" = đọc chữ KHÔNG
  "c2:Ba bò chín trâu":    {s:["dochieu","khonggian"],t:2},
  "c2:Ao sâu cá mè":       {s:["dochieu","khonggian"],t:2},
  "c2:Một bè gỗ lim":      {s:["dochieu","kehoach"],t:2},
  "c2:Con chim đồi mồi":   {s:["dochieu","khonggian"],t:2},
  // Chương 3 · Cây tre trăm đốt
  "c3:Khắc nhập!":         {s:["kehoach","khonggian"],t:2},
  "c3:Đám cỗ lật kèo":     {s:["kehoach"],t:3},
  "c3:Dính cả chùm!":      {s:["kehoach","dochieu"],t:3},
  // Chương 4 · Thánh Gióng
  "c4:Ra trận":            {s:["kehoach"],t:3},
  "c4:Nhổ tre ngà":        {s:["kehoach","khonggian"],t:3},
  // Chương 5(6) · Sơn Tinh Thuỷ Tinh
  "c5:Kén rể":             {s:["kehoach","khonggian"],t:3},
  "c5:Thuỷ Tinh nổi giận": {s:["kehoach"],t:3},
  "c5:Nước dâng, núi dâng":{s:["suyluan","khonggian"],t:3},
  // Chương 6(7) · Trầu Cau
  "c6:Bát cơm một đôi đũa":{s:["dochieu","khonggian"],t:2},
  "c6:Anh đi tìm em":      {s:["suyluan"],t:2},
  "c6:Miếng trầu đỏ thắm": {s:["kehoach"],t:3},
  // Chương 7(8) · Mai An Tiêm
  "c7:Chim lạ thả hạt":    {s:["kehoach","dochieu"],t:2},
  "c7:Ruộng dưa":          {s:["kehoach"],t:3},
  "c7:Thư theo sóng":      {s:["suyluan","khonggian"],t:2},
  // Chương 8(9) · Chú Cuội
  "c8:Nói dối như Cuội":   {s:["dochieu"],t:3},
  "c8:Tưới nhầm!":         {s:["kehoach","dochieu"],t:2},
};

function apDungNhan(levels){
  for(const l of levels){
    if(l.skills && l.tier) continue;            // màn tự khai — tôn trọng
    const o = SKILL_TAGS[l.id];
    if(o){ l.skills = l.skills || o.s; l.tier = l.tier || o.t; continue; }
    if(l.type === "matrix"){ l.skills = ["suyluan","dochieu"]; l.tier = 2; }
    else if(l.type === "story"){ l.skills = ["ghinho"]; l.tier = 1; }
    else if(l.type === "hoilang"){
      l.skills = ["suyluan","kehoach"];
      l.tier = l.doKho === "khó" ? 3 : l.doKho === "dễ" ? 1 : 2;
    } else {
      const n = (l.cons || []).length;
      l.skills = ["khonggian"];
      l.tier = n <= 2 ? 1 : n >= 5 ? 3 : 2;
    }
  }
}
