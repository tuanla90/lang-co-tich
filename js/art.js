/* ============================================================
   art.js — toàn bộ hình vẽ SVG: nhân vật, môi trường, địa điểm
   Thêm nhân vật/môi trường mới: khai ở đây, các file khác tự dùng.
   ============================================================ */

/* Khuôn dựng nhân vật: tóc/mũ + màu áo + miệng + phụ kiện */
const S = (hair, ao, mouth, extra = "") => `
<svg viewBox="0 0 60 60">
  <ellipse cx="30" cy="52" rx="16" ry="6" fill="${ao}" stroke="#3B2B1E" stroke-width="2.5"/>
  <rect x="18" y="32" width="24" height="20" rx="9" fill="${ao}" stroke="#3B2B1E" stroke-width="2.5"/>
  <circle cx="30" cy="21" r="13" fill="#F3D8B2" stroke="#3B2B1E" stroke-width="2.5"/>
  ${hair}
  <circle cx="25.5" cy="21" r="1.6" fill="#3B2B1E"/>
  <circle cx="34.5" cy="21" r="1.6" fill="#3B2B1E"/>
  ${mouth}${extra}
</svg>`;

const CUOI  = `<path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>`;
const MIM   = `<path d="M26 28 Q30 26 34 28" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>`;
const NGHIEM= `<path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>`;

const CHARS = {
  tam:  {name:"Tấm",    svg:S(`<path d="M17 18 Q30 4 43 18 L43 14 Q30 0 17 14 Z" fill="#3B2B1E"/><path d="M17 18 Q30 8 43 18" fill="none" stroke="#3B2B1E" stroke-width="4"/>`, "#E3A72F", CUOI)},
  cam:  {name:"Cám",    svg:S(`<path d="M17 18 Q30 6 43 18 L44 22 Q30 12 16 22 Z" fill="#3B2B1E"/>`, "#5A7D3C", MIM)},
  dighe:{name:"Dì ghẻ", svg:S(`<path d="M17 18 Q30 6 43 18 Z" fill="#3B2B1E"/><circle cx="30" cy="9" r="5" fill="#3B2B1E"/>`, "#2E4A62", NGHIEM,
    `<path d="M23 16 L28 17 M37 16 L32 17" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>`)},
  balao:{name:"Bà lão", svg:S(`<path d="M17 18 Q30 6 43 18 Z" fill="#CFC6B8"/><circle cx="30" cy="10" r="4.5" fill="#CFC6B8" stroke="#3B2B1E" stroke-width="2"/>`, "#8A6E52", CUOI)},
  vua:  {name:"Vua",    svg:S(`<path d="M18 17 L21 8 L26 13 L30 5 L34 13 L39 8 L42 17 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/>`, "#C8452A", CUOI)},
  linh: {name:"Lính",   svg:S(`<path d="M14 19 Q30 2 46 19 Z" fill="#C9B27C" stroke="#3B2B1E" stroke-width="2.5"/>`, "#4E6E52", NGHIEM,
    `<path d="M52 10 V44" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><path d="M52 4 L48 12 H56 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2"/>`)},
  but:  {name:"Bụt",     svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#F1E6C8" stroke="#3B2B1E" stroke-width="2"/>`, "#E8E2D2", "",
    `<path d="M23 27 Q30 47 37 27 Q33 31 30 31 Q27 31 23 27 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2"/><path d="M53 12 V46" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><circle cx="53" cy="9" r="3.5" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/>`)},
  bong: {name:"Cá Bống", svg:`<svg viewBox="0 0 60 60"><ellipse cx="28" cy="32" rx="14" ry="9" fill="#7FB3C8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M42 32 L52 24 L52 40 Z" fill="#7FB3C8" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="22" cy="30" r="1.6" fill="#3B2B1E"/><path d="M26 36 Q29 38 32 36" stroke="#3B2B1E" stroke-width="1.5" fill="none"/><path d="M12 24 Q16 20 20 24 M10 40 Q14 44 18 40" stroke="#F1F7F5" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  chim: {name:"Chim sẻ",svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="36" rx="15" ry="11" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="41" cy="27" r="8" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><path d="M48 28 L55 26 L48 31 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/><path d="M22 33 Q14 28 16 40 Q22 42 26 38 Z" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  vanganh:{name:"Vàng anh",svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="36" rx="15" ry="11" fill="#E8C93E" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="41" cy="27" r="8" fill="#E8C93E" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><path d="M48 28 L55 26 L48 31 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/><path d="M22 33 Q14 28 16 40 Q22 42 26 38 Z" fill="#C9A227" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  qthi: {name:"Quả thị",svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="16" fill="#E8912D" stroke="#3B2B1E" stroke-width="2.5"/><path d="M30 18 Q30 10 38 10" fill="none" stroke="#5A7D3C" stroke-width="3.5" stroke-linecap="round"/><path d="M30 14 Q22 8 16 14 Q22 20 30 14" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/><circle cx="25.5" cy="33" r="1.5" fill="#3B2B1E"/><circle cx="34.5" cy="33" r="1.5" fill="#3B2B1E"/><path d="M26 39 Q30 42 34 39" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/></svg>`},
};

/* ===== Môi trường trên bàn cờ ===== */
const ENVS = {
  ao:   {name:"ao",       water:true, svg:`<svg viewBox="0 0 60 60"><path d="M12 30 Q20 25 28 30 T44 30" fill="none" stroke="#F1F7F5" stroke-width="3" stroke-linecap="round" opacity=".9"/><path d="M16 42 Q24 37 32 42 T48 42" fill="none" stroke="#F1F7F5" stroke-width="3" stroke-linecap="round" opacity=".7"/><circle cx="44" cy="18" r="6" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  gieng:{name:"giếng",    svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="32" r="18" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="3"/><circle cx="30" cy="32" r="10" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2.5"/><path d="M14 20 L30 8 L46 20" fill="none" stroke="#8A6E52" stroke-width="4" stroke-linecap="round"/></svg>`},
  thung:{name:"thúng thóc",svg:`<svg viewBox="0 0 60 60"><path d="M12 28 H48 L43 48 H17 Z" fill="#C89B62" stroke="#3B2B1E" stroke-width="3"/><path d="M12 28 H48" stroke="#3B2B1E" stroke-width="3"/><ellipse cx="30" cy="26" rx="15" ry="5" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  cong: {name:"cổng làng", svg:`<svg viewBox="0 0 60 60"><rect x="10" y="18" width="6" height="36" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><rect x="44" y="18" width="6" height="36" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><path d="M6 18 Q30 6 54 18 L54 12 Q30 0 6 12 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  kieu: {name:"kiệu vua",  svg:`<svg viewBox="0 0 60 60"><rect x="14" y="20" width="32" height="24" rx="4" fill="#C8452A" stroke="#3B2B1E" stroke-width="3"/><path d="M14 20 Q30 8 46 20 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/><rect x="4" y="30" width="52" height="5" rx="2.5" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  caythi:{name:"cây thị",  svg:`<svg viewBox="0 0 60 60"><rect x="26" y="34" width="8" height="20" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="30" cy="24" r="17" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="3"/><circle cx="22" cy="22" r="4.5" fill="#E8912D" stroke="#3B2B1E" stroke-width="2"/><circle cx="37" cy="29" r="4.5" fill="#E8912D" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  quan: {name:"quán nước", svg:`<svg viewBox="0 0 60 60"><path d="M8 26 L30 10 L52 26 Z" fill="#C9B27C" stroke="#3B2B1E" stroke-width="3"/><rect x="14" y="26" width="4" height="26" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/><rect x="42" y="26" width="4" height="26" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/><rect x="20" y="38" width="20" height="8" fill="#C89B62" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  rom:  {name:"đống rơm",  svg:`<svg viewBox="0 0 60 60"><path d="M10 50 Q12 22 30 16 Q48 22 50 50 Z" fill="#E3C56F" stroke="#3B2B1E" stroke-width="3"/><path d="M22 44 Q24 32 30 28 M38 44 Q36 34 32 28" fill="none" stroke="#B9964A" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  bunsvg:{name:"vũng bùn", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="38" rx="20" ry="11" fill="#8F6A42" stroke="#3B2B1E" stroke-width="2.5" opacity=".85"/><ellipse cx="24" cy="35" rx="5" ry="2.5" fill="#C09A6C"/><ellipse cx="38" cy="41" rx="4" ry="2" fill="#C09A6C"/></svg>`},
  cayda:{name:"cây đa",   svg:`<svg viewBox="0 0 60 60"><rect x="26" y="36" width="8" height="18" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><path d="M20 42 V30 M40 42 V32" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="22" r="16" fill="#4E7038" stroke="#3B2B1E" stroke-width="3"/><circle cx="16" cy="27" r="8" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="44" cy="27" r="8" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  tre:  {name:"bụi tre",  svg:`<svg viewBox="0 0 60 60"><path d="M22 54 V10 M30 54 V6 M38 54 V12" stroke="#5A7D3C" stroke-width="5" stroke-linecap="round"/><path d="M19 38 h6 M27 30 h6 M35 42 h6 M19 20 h6 M27 14 h6" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M22 12 Q14 8 10 12 Q16 16 22 12 M38 18 Q46 14 50 18 Q44 22 38 18" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  dinh: {name:"sân đình", svg:`<svg viewBox="0 0 60 60"><path d="M6 24 Q30 4 54 24 L50 28 Q30 12 10 28 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><rect x="12" y="28" width="36" height="22" fill="#E9D9A8" stroke="#3B2B1E" stroke-width="2.5"/><rect x="18" y="34" width="6" height="16" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/><rect x="36" y="34" width="6" height="16" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  caycau:{name:"cây cau", svg:`<svg viewBox="0 0 60 60"><path d="M28 54 Q30 30 29 12" stroke="#8A6E52" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M26 20 h6 M27 30 h5 M27 40 h5" stroke="#3B2B1E" stroke-width="1.5"/><path d="M29 12 Q16 6 10 12 M29 12 Q42 4 50 10 M29 12 Q20 2 14 4 M29 12 Q38 0 46 2" stroke="#5A7D3C" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="26" cy="15" r="2.2" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="32" cy="16" r="2.2" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/></svg>`},
  cung: {name:"cung vua", svg:`<svg viewBox="0 0 60 60"><path d="M8 22 Q30 6 52 22 L48 26 Q30 14 12 26 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M12 34 Q30 22 48 34 L45 37 Q30 27 15 37 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><rect x="16" y="37" width="28" height="15" fill="#E9D9A8" stroke="#3B2B1E" stroke-width="2.5"/><rect x="26" y="42" width="8" height="10" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  mocau:{name:"mo cau",   svg:`<svg viewBox="0 0 60 60"><path d="M14 40 Q20 18 46 22 Q40 34 30 38 Q22 42 14 40 Z" fill="#C9A46A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M20 36 Q28 26 42 25" stroke="#8A6E52" stroke-width="2" fill="none"/></svg>`},
  nui:  {name:"núi đá",   svg:`<svg viewBox="0 0 60 60"><path d="M6 50 L24 14 L34 32 L42 20 L54 50 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="3"/><path d="M24 14 L29 23 L24 29 L19 23 Z" fill="#F1F7F5" stroke="#3B2B1E" stroke-width="2"/></svg>`},
};

/* ===== Địa điểm cho màn ma trận ===== */
const PLACES = {
  dong:    {name:"Ngoài đồng", ter:"bùn lầy", svg:`<svg viewBox="0 0 60 60"><rect x="6" y="30" width="48" height="22" rx="4" fill="#8FB06A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M12 36 V48 M20 34 V50 M28 36 V48 M36 34 V50 M44 36 V48" stroke="#5A7D3C" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="14" r="7" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  san:     {name:"Sân nhà", svg:`<svg viewBox="0 0 60 60"><path d="M8 28 L30 10 L52 28 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><rect x="14" y="28" width="32" height="22" fill="#E9D9A8" stroke="#3B2B1E" stroke-width="2.5"/><rect x="26" y="36" width="9" height="14" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  boao:    {name:"Bờ ao", svg:ENVS.ao.svg},
  sandinh: {name:"Sân đình", svg:ENVS.dinh.svg},
  baico:   {name:"Bãi cỏ", svg:`<svg viewBox="0 0 60 60"><path d="M10 48 Q12 34 14 48 M20 48 Q23 30 26 48 M32 48 Q35 34 38 48 M44 48 Q46 32 48 48" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/><circle cx="46" cy="16" r="6" fill="#F1E6C8" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  duongbun:{name:"Đường làng", ter:"bùn lầy", svg:ENVS.bunsvg.svg},
  xoandao: {name:"Gốc xoan đào", svg:`<svg viewBox="0 0 60 60"><rect x="27" y="34" width="7" height="20" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="30" cy="22" r="16" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="3"/><circle cx="22" cy="18" r="3.5" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="36" cy="14" r="3.5" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="38" cy="27" r="3.5" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/></svg>`},
  khungcui:{name:"Khung cửi", svg:`<svg viewBox="0 0 60 60"><rect x="10" y="14" width="40" height="34" fill="none" stroke="#8A6E52" stroke-width="4"/><path d="M14 20 H46 M14 26 H46 M14 32 H46 M14 38 H46" stroke="#C9B27C" stroke-width="2.5"/><path d="M10 48 L6 54 M50 48 L54 54" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/></svg>`},
  sanphoi: {name:"Sân phơi", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="20" ry="12" fill="#E9D9A8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M18 30 Q30 26 42 30 M16 36 Q30 32 44 36 M20 41 Q30 38 40 41" stroke="#C89B62" stroke-width="2" fill="none"/></svg>`},
};

/* ===== Lời thì thầm khi chạm/di chuột — trang trí hôm nay, câu đố ngày mai ===== */
const LORE = {
  ao:"nước trong veo, tôm tép nhiều lắm",
  gieng:"nghe nói dưới giếng có một con cá lạ",
  cayda:"đầu làng — hình như có ai ngồi vắt vẻo trên đó…",
  tre:"rậm rạp, nấp vừa một người — nghe nói ai nhổ nổi cả bụi thì khoẻ như thần",
  nui:"đá dựng đứng — không ai trèo qua nổi",
  dinh:"nơi làng mở hội",
  thung:"thóc trộn lẫn gạo, nhặt bao giờ cho xong",
  cong:"đường ra hội làng",
  kieu:"kiệu của nhà vua",
  caythi:"quả thị thơm, ai đi qua cũng ngước nhìn",
  quan:"quán nước của bà lão",
  rom:"chắn lối, không đứng được",
  bunsvg:"ai ghét bẩn chân thì tránh xa",
  caycau:"cau cao vút — trèo phải khéo lắm",
  cung:"mái son rực rỡ",
  mocau:"rụng từ cây cau nhà Tấm — phe phẩy làm quạt thì nhất",
};
