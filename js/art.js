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
  bom:  {name:"Bờm",     svg:S(`<circle cx="30" cy="7" r="4" fill="#3B2B1E"/><circle cx="19" cy="12" r="3.5" fill="#3B2B1E"/><circle cx="41" cy="12" r="3.5" fill="#3B2B1E"/>`, "#C9B27C", CUOI,
    `<path d="M47 22 Q60 14 56 4 Q44 6 45 16 Z" fill="#C9A46A" stroke="#3B2B1E" stroke-width="2"/><path d="M47 22 L50 27" stroke="#8A6E52" stroke-width="2.5" stroke-linecap="round"/>`)},
  phuong:{name:"Phú ông", svg:S(`<path d="M17 18 Q30 6 43 18 Z" fill="#2B2B2B"/><rect x="19" y="11" width="22" height="4.5" rx="2" fill="#2B2B2B"/>`, "#7A5296", MIM,
    `<path d="M24 26 Q27 24 29 26 M31 26 Q33 24 36 26" stroke="#3B2B1E" stroke-width="1.5" fill="none" stroke-linecap="round"/>`)},
  tan:  {name:"Tân (anh)", svg:S(`<path d="M17 18 Q30 5 43 18 Z" fill="#3B2B1E"/>`, "#5E7F5A", CUOI)},
  lang: {name:"Lang (em)", svg:null},
  nangluu:{name:"Nàng Lưu", svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#3B2B1E"/><circle cx="40" cy="10" r="3.5" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="1.5"/>`, "#7FA88F", CUOI)},
  sontinh:{name:"Sơn Tinh", svg:S(`<path d="M18 18 L24 7 L30 13 L36 5 L42 18 Z" fill="#7A6A45" stroke="#3B2B1E" stroke-width="2"/>`, "#7A6A45", MIM)},
  thuytinh:{name:"Thuỷ Tinh", svg:S(`<path d="M17 18 Q22 6 30 11 Q38 4 43 18 Q36 13 30 17 Q24 13 17 18 Z" fill="#2E6E8E" stroke="#3B2B1E" stroke-width="2"/>`, "#3A7CA5", NGHIEM,
    `<path d="M22 37 q4 3 8 0 M30 37 q4 3 8 0" stroke="#7FB3C8" stroke-width="2" fill="none" stroke-linecap="round"/>`)},
  minuong:{name:"Mị Nương", svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#3B2B1E"/><path d="M24 8 L36 8" stroke="#E3A72F" stroke-width="3" stroke-linecap="round"/>`, "#C86B85", CUOI)},
  voi:  {name:"Voi chín ngà", svg:`<svg viewBox="0 0 60 60"><ellipse cx="34" cy="36" rx="18" ry="13" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="15" cy="28" r="10" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2.5"/><ellipse cx="20" cy="20" rx="6" ry="8" fill="#B8C4CC" stroke="#3B2B1E" stroke-width="2"/><path d="M10 32 Q4 38 8 46 Q12 45 12 40" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M12 36 Q4 34 2 30 M13 39 Q6 40 3 38 M13 42 Q8 46 6 48" stroke="#F7F1E0" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="14" cy="26" r="1.4" fill="#3B2B1E"/><path d="M26 47 V53 M36 47 V53 M44 45 V52" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  ga:   {name:"Gà chín cựa", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="14" ry="11" fill="#C86B4A" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="41" cy="22" r="7" fill="#C86B4A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M38 14 Q40 9 43 13 Q45 8 48 13 Q50 10 51 15" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/><circle cx="43" cy="21" r="1.4" fill="#3B2B1E"/><path d="M47 24 L54 23 L47 27 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/><path d="M18 30 Q8 24 10 34 Q16 38 22 34 Z" fill="#8A5A3B" stroke="#3B2B1E" stroke-width="2"/><path d="M26 44 V52 M34 44 V52 M22 49 l-4 -3 M24 51 l-5 -1 M38 49 l4 -3 M36 51 l5 -1" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/></svg>`},
  nguahong:{name:"Ngựa hồng mao", svg:`<svg viewBox="0 0 60 60"><ellipse cx="33" cy="38" rx="17" ry="10" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><path d="M19 34 Q14 24 20 16" fill="none" stroke="#A9825B" stroke-width="6" stroke-linecap="round"/><circle cx="19" cy="17" r="6.5" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="17" cy="16" r="1.4" fill="#3B2B1E"/><path d="M25 12 Q28 7 26 3 M29 14 Q33 10 32 5 M22 12 Q22 7 19 5" stroke="#DE7BA4" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M25 47 V53 M33 47 V53 M41 47 V53 M46 44 V51" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M49 34 Q56 37 53 45" stroke="#DE7BA4" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`},
  me:   {name:"Mẹ Gióng", svg:S(`<path d="M17 18 Q30 5 43 18 Z" fill="#5C4030"/>`, "#A9825B", CUOI)},
  giong:{name:"Bé Gióng", svg:S(`<circle cx="30" cy="7" r="4.5" fill="#3B2B1E"/>`, "#C97B5A", CUOI)},
  giongts:{name:"Tráng sĩ Gióng", svg:S(`<path d="M16 18 Q30 2 44 18 Z" fill="#7C8894" stroke="#3B2B1E" stroke-width="2"/><path d="M30 3 V8" stroke="#C8452A" stroke-width="3" stroke-linecap="round"/>`, "#7C8894", NGHIEM,
    `<path d="M52 8 V44" stroke="#5C6670" stroke-width="3.5" stroke-linecap="round"/>`)},
  suga: {name:"Sứ giả", svg:S(`<path d="M17 18 Q30 6 43 18 Z" fill="#2E4A62"/><rect x="7" y="14" width="11" height="4" rx="2" fill="#2E4A62"/><rect x="42" y="14" width="11" height="4" rx="2" fill="#2E4A62"/>`, "#2E6E62", MIM,
    `<rect x="48" y="24" width="6" height="16" rx="3" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2"/>`)},
  nguasat:{name:"Ngựa sắt", svg:`<svg viewBox="0 0 60 60"><ellipse cx="33" cy="38" rx="17" ry="10" fill="#7C8894" stroke="#3B2B1E" stroke-width="2.5"/><path d="M19 34 Q14 24 20 16" fill="none" stroke="#7C8894" stroke-width="6" stroke-linecap="round"/><circle cx="19" cy="17" r="6.5" fill="#7C8894" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="17" cy="16" r="1.4" fill="#3B2B1E"/><path d="M12 20 Q4 21 2 26 Q8 27 13 23 Z" fill="#E3A72F" stroke="#C8452A" stroke-width="1.5"/><path d="M26 13 Q29 9 27 4 M31 15 Q35 12 34 6" stroke="#C8452A" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M25 47 V53 M33 47 V53 M41 47 V53 M46 44 V51" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  giac1:{name:"Giặc Ân", svg:S(`<path d="M18 18 L30 4 L42 18 Z" fill="#4A3535" stroke="#3B2B1E" stroke-width="2"/><path d="M30 4 V0" stroke="#4A3535" stroke-width="3"/>`, "#6B4444", NGHIEM,
    `<path d="M50 12 Q58 20 52 30" stroke="#9AA5A8" stroke-width="3" fill="none" stroke-linecap="round"/>`)},
  giac2:{name:"Giặc Ân", svg:null},
  khoai:{name:"Anh Khoai", svg:S(`<path d="M17 18 Q30 6 43 18 Z" fill="#8A6E52"/><path d="M39 13 L48 8 L44 17 Z" fill="#8A6E52" stroke="#3B2B1E" stroke-width="1.5"/>`, "#C89B62", CUOI)},
  congai:{name:"Con gái phú ông", svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#3B2B1E"/><circle cx="41" cy="9" r="4" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/>`, "#DE7BA4", CUOI)},
  chure:{name:"Công tử", svg:S(`<path d="M17 18 Q30 6 43 18 Z" fill="#1F3A5F"/><rect x="19" y="11" width="22" height="4.5" rx="2" fill="#1F3A5F"/>`, "#3A6EA5", MIM)},
  dot1: {name:"Đốt tre", svg:`<svg viewBox="0 0 60 60"><rect x="22" y="8" width="16" height="44" rx="7" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M22 20 h16 M22 32 h16 M22 44 h16" stroke="#3B2B1E" stroke-width="2"/><path d="M38 13 Q46 9 50 13 Q45 17 38 13" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  came: {name:"Cá mè",   svg:`<svg viewBox="0 0 60 60"><ellipse cx="28" cy="32" rx="14" ry="9" fill="#B8C4CC" stroke="#3B2B1E" stroke-width="2.5"/><path d="M42 32 L52 24 L52 40 Z" fill="#B8C4CC" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="22" cy="30" r="1.6" fill="#3B2B1E"/><path d="M26 36 Q29 38 32 36" stroke="#3B2B1E" stroke-width="1.5" fill="none"/><path d="M12 24 Q16 20 20 24 M10 40 Q14 44 18 40" stroke="#F1F7F5" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  chimdm:{name:"Chim đồi mồi",svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="36" rx="15" ry="11" fill="#8B5A2B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="41" cy="27" r="8" fill="#8B5A2B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><path d="M48 28 L55 26 L48 31 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/><path d="M22 33 Q14 28 16 40 Q22 42 26 38 Z" fill="#5C3A1E" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="27" cy="34" r="2" fill="#5C3A1E"/><circle cx="34" cy="39" r="2" fill="#5C3A1E"/></svg>`},
  trau: {name:"Trâu",   svg:`<svg viewBox="0 0 60 60"><ellipse cx="33" cy="38" rx="18" ry="11" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="15" cy="30" r="8" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M10 25 Q1 16 9 9" fill="none" stroke="#C9B27C" stroke-width="3.5" stroke-linecap="round"/><path d="M21 25 Q30 16 22 9" fill="none" stroke="#C9B27C" stroke-width="3.5" stroke-linecap="round"/><circle cx="13" cy="30" r="1.5" fill="#3B2B1E"/><path d="M11 35 q3 2 6 1" stroke="#3B2B1E" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M24 48 V53 M32 48 V53 M40 48 V53 M46 45 V52" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M50 33 Q57 37 53 45" stroke="#3B2B1E" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  dot2: {name:"Đốt tre", svg:null},   // gán bên dưới — dùng chung hình với dot1
  dot3: {name:"Đốt tre", svg:null},
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
  baico:{name:"bãi cỏ",   svg:`<svg viewBox="0 0 60 60"><path d="M10 48 Q12 34 14 48 M20 48 Q23 30 26 48 M32 48 Q35 34 38 48 M44 48 Q46 32 48 48" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/><circle cx="46" cy="16" r="6" fill="#F1E6C8" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  saophoi:{name:"sào phơi áo", svg:`<svg viewBox="0 0 60 60"><path d="M8 16 V52 M52 16 V52" stroke="#8A6E52" stroke-width="3.5" stroke-linecap="round"/><path d="M8 18 H52" stroke="#3B2B1E" stroke-width="2.5"/><path d="M20 18 L18 38 Q26 42 34 38 L32 18 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M23 25 h7" stroke="#E3A72F" stroke-width="2"/></svg>`},
  dantrau:{name:"đàn trâu bò", svg:`<svg viewBox="0 0 60 60"><path d="M4 54 H56 M8 54 V40 M52 54 V40 M30 54 V42" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><circle cx="19" cy="30" r="9" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M13 24 Q6 17 12 12 M25 24 Q32 17 26 12" fill="none" stroke="#C9B27C" stroke-width="3" stroke-linecap="round"/><circle cx="17" cy="30" r="1.4" fill="#3B2B1E"/><circle cx="42" cy="32" r="9" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><path d="M37 25 Q34 20 37 17 M47 25 Q50 20 47 17" fill="none" stroke="#E9D9A8" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="32" r="1.4" fill="#3B2B1E"/></svg>`},
  begolim:{name:"bè gỗ lim", water:true, svg:`<svg viewBox="0 0 60 60"><rect x="8" y="20" width="44" height="7" rx="3.5" fill="#4A3527" stroke="#3B2B1E" stroke-width="2"/><rect x="8" y="29" width="44" height="7" rx="3.5" fill="#5C4030" stroke="#3B2B1E" stroke-width="2"/><rect x="8" y="38" width="44" height="7" rx="3.5" fill="#4A3527" stroke="#3B2B1E" stroke-width="2"/><path d="M18 18 V47 M42 18 V47" stroke="#C9B27C" stroke-width="2.5"/></svg>`},
  namxoi:{name:"nắm xôi",  svg:`<svg viewBox="0 0 60 60"><path d="M8 42 Q30 30 52 42 Q30 52 8 42 Z" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M18 40 Q20 26 30 24 Q40 26 42 40 Q30 45 18 40 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2.5"/><path d="M24 18 Q26 14 24 10 M32 18 Q34 14 32 10" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  mamco:{name:"mâm cỗ",   svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="38" rx="22" ry="10" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="22" cy="34" r="5" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2"/><circle cx="36" cy="32" r="5" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/><circle cx="40" cy="40" r="4" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/><path d="M26 22 Q28 18 26 14" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  batcom:{name:"bát cơm", svg:`<svg viewBox="0 0 60 60"><path d="M14 30 Q30 26 46 30 L42 44 Q30 48 18 44 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2.5"/><path d="M18 28 Q22 22 30 21 Q38 22 42 28 Q30 32 18 28 Z" fill="#FFFDF5" stroke="#3B2B1E" stroke-width="2"/><path d="M36 8 L48 24 M40 6 L52 22" stroke="#8A6E52" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  tangda:{name:"tảng đá vôi", svg:`<svg viewBox="0 0 60 60"><path d="M12 46 Q8 30 20 22 Q30 14 42 22 Q52 30 48 46 Q30 52 12 46 Z" fill="#E8E2D2" stroke="#3B2B1E" stroke-width="3"/><path d="M22 32 Q28 28 34 32 M20 40 Q30 36 42 40" stroke="#B8B0A0" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  vetchan:{name:"vết chân lạ", svg:`<svg viewBox="0 0 60 60"><path d="M22 46 Q13 36 17 23 Q21 13 30 13 Q39 13 43 23 Q47 36 38 46 Q30 52 22 46 Z" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="21" cy="11" r="3.5" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2"/><circle cx="30" cy="8" r="3.5" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2"/><circle cx="39" cy="11" r="3.5" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  noicom:{name:"nồi cơm làng", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="38" rx="20" ry="13" fill="#5C6670" stroke="#3B2B1E" stroke-width="3"/><path d="M10 32 Q30 24 50 32" fill="none" stroke="#3B2B1E" stroke-width="2.5"/><path d="M18 26 Q21 16 30 14 Q39 16 42 26 Q30 31 18 26 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2.5"/><path d="M26 10 Q28 6 26 2 M34 10 Q36 6 34 2" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
};
CHARS.dot2.svg = CHARS.dot1.svg;
CHARS.dot3.svg = CHARS.dot1.svg;
CHARS.giac2.svg = CHARS.giac1.svg;
CHARS.linh2 = {name:"Lính", svg:CHARS.linh.svg};
CHARS.lang.svg = CHARS.tan.svg;   /* sinh đôi — giống nhau như hai giọt nước, đúng nghĩa đen */

/* ===== Địa điểm cho màn ma trận ===== */
const PLACES = {
  dong:    {name:"Ngoài đồng", ter:"bùn lầy", svg:`<svg viewBox="0 0 60 60"><rect x="6" y="30" width="48" height="22" rx="4" fill="#8FB06A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M12 36 V48 M20 34 V50 M28 36 V48 M36 34 V50 M44 36 V48" stroke="#5A7D3C" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="14" r="7" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
  san:     {name:"Sân nhà", svg:`<svg viewBox="0 0 60 60"><path d="M8 28 L30 10 L52 28 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><rect x="14" y="28" width="32" height="22" fill="#E9D9A8" stroke="#3B2B1E" stroke-width="2.5"/><rect x="26" y="36" width="9" height="14" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  boao:    {name:"Bờ ao", svg:ENVS.ao.svg},
  sandinh: {name:"Sân đình", svg:ENVS.dinh.svg},
  baico:   {name:"Bãi cỏ", svg:`<svg viewBox="0 0 60 60"><path d="M10 48 Q12 34 14 48 M20 48 Q23 30 26 48 M32 48 Q35 34 38 48 M44 48 Q46 32 48 48" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2"/><circle cx="46" cy="16" r="6" fill="#F1E6C8" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  duongbun:{name:"Đường làng", ter:"bùn lầy", svg:ENVS.bunsvg.svg},
  bep:     {name:"Bếp", svg:`<svg viewBox="0 0 60 60"><path d="M16 46 L30 46 L44 46" stroke="#3B2B1E" stroke-width="3"/><path d="M20 46 L24 34 M40 46 L36 34" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><ellipse cx="30" cy="32" rx="12" ry="8" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M24 46 Q27 40 30 46 Q33 40 36 46" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/><path d="M28 20 Q30 15 28 11" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  chuongtrau:{name:"Chuồng trâu", ter:"bùn lầy", svg:`<svg viewBox="0 0 60 60"><path d="M4 54 H56 M8 54 V38 M52 54 V38 M30 54 V40" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="28" r="10" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M23 21 Q15 14 22 8 M37 21 Q45 14 38 8" fill="none" stroke="#C9B27C" stroke-width="3" stroke-linecap="round"/><circle cx="27" cy="28" r="1.5" fill="#3B2B1E"/></svg>`},
  hangxoi: {name:"Hàng xôi", svg:`<svg viewBox="0 0 60 60"><path d="M10 34 H50 L45 52 H15 Z" fill="#C89B62" stroke="#3B2B1E" stroke-width="2.5"/><path d="M20 32 Q22 20 30 18 Q38 20 40 32 Q30 37 20 32 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2.5"/><path d="M26 12 Q28 8 26 4 M34 12 Q36 8 34 4" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  hangnuoc:{name:"Hàng nước", svg:ENVS.quan.svg},
  xoandao: {name:"Gốc xoan đào", svg:`<svg viewBox="0 0 60 60"><rect x="27" y="34" width="7" height="20" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="30" cy="22" r="16" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="3"/><circle cx="22" cy="18" r="3.5" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="36" cy="14" r="3.5" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="38" cy="27" r="3.5" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/></svg>`},
  khungcui:{name:"Khung cửi", svg:`<svg viewBox="0 0 60 60"><rect x="10" y="14" width="40" height="34" fill="none" stroke="#8A6E52" stroke-width="4"/><path d="M14 20 H46 M14 26 H46 M14 32 H46 M14 38 H46" stroke="#C9B27C" stroke-width="2.5"/><path d="M10 48 L6 54 M50 48 L54 54" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/></svg>`},
  sanphoi: {name:"Sân phơi", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="20" ry="12" fill="#E9D9A8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M18 30 Q30 26 42 30 M16 36 Q30 32 44 36 M20 41 Q30 38 40 41" stroke="#C89B62" stroke-width="2" fill="none"/></svg>`},
};

PLACES.ruongbun = {name:"Ruộng", ter:"bùn lầy", svg:PLACES.dong.svg};
PLACES.nhatren  = {name:"Nhà trên", svg:PLACES.san.svg};
PLACES.bienai   = {name:"Biên ải", svg:ENVS.nui.svg};
PLACES.rungnui  = {name:"Rừng núi", svg:ENVS.nui.svg};
PLACES.conglang = {name:"Cổng nhà", svg:ENVS.cong.svg};
PLACES.songbien = {name:"Sông biển", svg:ENVS.ao.svg};
PLACES.dongbang = {name:"Đồng bằng", svg:PLACES.dong.svg};
PLACES.langpd   = {name:"Làng Phù Đổng", svg:PLACES.san.svg};
PLACES.cungvua  = {name:"Cung vua", svg:ENVS.cung.svg};
ENVS.nha = {name:"mái nhà", svg:PLACES.san.svg};
ENVS.bepenv = {name:"bếp", svg:PLACES.bep.svg};

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
  baico:"cỏ non mơn mởn — trâu bò mê lắm",
  saophoi:"áo vua phơi ngoài sào — chớ phơi bờ rào!",
  dantrau:"ba bò chín trâu — cả một gia tài đấy",
  begolim:"gỗ lim quý lắm — nhưng bè to thế, chèo đi đâu?",
  namxoi:"xôi nếp mới, thơm nức mũi",
  mamco:"cỗ to lắm — mà gả cho ai mới được chứ?",
  vetchan:"vết chân ai mà to lạ lùng…",
  batcom:"một bát cơm, MỘT đôi đũa — ai sẽ nhường ai?",
  tangda:"đá vôi trắng — chạm vào nghe như còn ấm",
  noicom:"bảy nong cơm, ba nong cà — cả làng góp lại",
  nha:"mái tranh làng Phù Đổng",
};
/* ===== Mảnh trừu tượng cho màn kể chuyện (không phải người, không phải cảnh) ===== */
const TOKENS = {
  khacnhap:{name:"Khắc nhập", svg:`<svg viewBox="0 0 60 60"><rect x="24" y="16" width="12" height="28" rx="5" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M24 25 h12 M24 35 h12" stroke="#3B2B1E" stroke-width="2"/><path d="M3 30 h9" stroke="#C8452A" stroke-width="4" stroke-linecap="round"/><path d="M12 23 L21 30 L12 37 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/><path d="M57 30 h-9" stroke="#C8452A" stroke-width="4" stroke-linecap="round"/><path d="M48 23 L39 30 L48 37 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  khacxuat:{name:"Khắc xuất", svg:`<svg viewBox="0 0 60 60"><rect x="16" y="16" width="11" height="28" rx="5" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><rect x="33" y="16" width="11" height="28" rx="5" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M16 25 h11 M16 35 h11 M33 25 h11 M33 35 h11" stroke="#3B2B1E" stroke-width="2"/><path d="M13 30 h-4" stroke="#2E4A62" stroke-width="4" stroke-linecap="round"/><path d="M9 23 L2 30 L9 37 Z" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2"/><path d="M47 30 h4" stroke="#2E4A62" stroke-width="4" stroke-linecap="round"/><path d="M51 23 L58 30 L51 37 Z" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2"/></svg>`},
};

/* ===== Tra cứu hình theo id, dò khắp các bộ — dùng cho màn kể chuyện ===== */
function art(id){ return CHARS[id] || PLACES[id] || ENVS[id] || TOKENS[id] || null; }

/* ============================================================
   DI VẬT CỐT TRUYỆN — vật phẩm ẩn, bấm để nhặt vào Túi đồ.
   Khai trong màn: relic:{id:"yemdo", cell:[x,y]} (chỉ đặt ô đất trống).
   Mỗi chương giấu MỘT món, đúng khoảnh khắc của nó trong truyện.
   ============================================================ */
const RELICS = {
  yemdo:   {name:"Yếm đỏ", lore:"phần thưởng bắt tép — Cám lĩnh mất của chị",
    svg:`<svg viewBox="0 0 60 60"><path d="M30 8 Q34 12 40 12 L30 52 L20 12 Q26 12 30 8 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M20 12 Q14 16 12 22 M40 12 Q46 16 48 22" stroke="#C8452A" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="30" cy="24" r="4" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/></svg>`},
  quatmo:  {name:"Quạt mo", lore:"mo cau nhà Tấm — thành quạt của Bờm, rồi về tay phú ông",
    svg:null},
  dot100:  {name:"Đốt tre thứ 100", lore:"khắc nhập! khắc xuất!",
    svg:null},
  roisat:  {name:"Roi sắt gãy", lore:"gãy thì gãy — đã có tre ngà!",
    svg:`<svg viewBox="0 0 60 60"><path d="M10 46 L26 30" stroke="#5C6670" stroke-width="6" stroke-linecap="round"/><path d="M34 24 L50 8" stroke="#5C6670" stroke-width="6" stroke-linecap="round"/><path d="M24 34 l-4 4 M29 28 l4 -4" stroke="#9AA5A8" stroke-width="2" stroke-linecap="round"/></svg>`},
  vaytt:   {name:"Vảy Thuỷ Tinh", lore:"sóng đánh văng lên bờ trong trận nước dâng",
    svg:`<svg viewBox="0 0 60 60"><path d="M30 8 Q48 24 44 40 Q38 52 30 52 Q22 52 16 40 Q12 24 30 8 Z" fill="#7FB3C8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M30 16 V46 M22 26 Q30 32 38 26 M20 36 Q30 42 40 36" stroke="#3A7CA5" stroke-width="2" fill="none"/></svg>`},
  miengtrau:{name:"Miếng trầu têm", lore:"miếng trầu là đầu câu chuyện",
    svg:`<svg viewBox="0 0 60 60"><path d="M14 34 Q14 18 30 14 Q46 18 46 34 Q38 30 30 34 Q22 30 14 34 Z" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M22 38 Q30 34 38 38 Q36 48 30 50 Q24 48 22 38 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2.5"/></svg>`},
};
RELICS.quatmo.svg = ENVS.mocau.svg;
RELICS.dot100.svg = CHARS.dot1.svg;

/* ===== Chương 7 · Mai An Tiêm ===== */
CHARS.antiem = {name:"Mai An Tiêm", svg:S(`<path d="M17 18 Q30 5 43 18 Z" fill="#2E4A62"/><path d="M40 12 L48 9 L45 16 Z" fill="#2E4A62" stroke="#3B2B1E" stroke-width="1.5"/>`, "#3E6257", CUOI)};
CHARS.voat  = {name:"Vợ An Tiêm", svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#3B2B1E"/><path d="M20 8 Q30 3 40 8" stroke="#8A4A5E" stroke-width="3" fill="none" stroke-linecap="round"/>`, "#8A4A5E", CUOI)};
CHARS.beat  = {name:"Bé An", svg:S(`<circle cx="22" cy="9" r="4" fill="#3B2B1E"/><circle cx="38" cy="9" r="4" fill="#3B2B1E"/>`, "#D98E4A", CUOI)};
CHARS.chimtrang = {name:"Chim trắng", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="36" rx="15" ry="11" fill="#F1EDE0" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="41" cy="27" r="8" fill="#F1EDE0" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><path d="M48 28 L55 26 L48 31 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/><path d="M22 33 Q14 28 16 40 Q22 42 26 38 Z" fill="#D8D2C0" stroke="#3B2B1E" stroke-width="2.5"/></svg>`};
CHARS.hatden = {name:"Hạt lạ", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="32" rx="10" ry="15" fill="#2B2B2B" stroke="#3B2B1E" stroke-width="2.5" transform="rotate(20 30 32)"/><path d="M26 21 q3 -3 6 0" stroke="#F1EDE0" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`};
CHARS.dua1 = {name:"Quả dưa hấu", svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="17" fill="#2F6B3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M22 20 Q20 32 22 47 M30 17 V51 M38 20 Q40 32 38 47" stroke="#1F4A28" stroke-width="3" fill="none"/><path d="M30 17 Q33 12 37 12" stroke="#5A7D3C" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`};
CHARS.dua2 = {name:"Quả dưa hấu", svg:CHARS.dua1.svg};
CHARS.dua3 = {name:"Quả dưa hấu", svg:CHARS.dua1.svg};
CHARS.duathu = {name:"Dưa khắc tên", svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="17" fill="#2F6B3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M22 20 Q20 32 22 47 M38 20 Q40 32 38 47" stroke="#1F4A28" stroke-width="3" fill="none"/><path d="M24 30 h12 M24 37 h12" stroke="#F1EDE0" stroke-width="2.5" stroke-linecap="round"/><path d="M30 17 Q33 12 37 12" stroke="#5A7D3C" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`};

ENVS.leu = {name:"lều tranh", svg:`<svg viewBox="0 0 60 60"><path d="M8 46 L30 14 L52 46 Z" fill="#C9B27C" stroke="#3B2B1E" stroke-width="3"/><path d="M14 46 L30 22 L46 46" stroke="#8A6E52" stroke-width="2" fill="none"/><rect x="25" y="34" width="10" height="12" fill="#5C4030" stroke="#3B2B1E" stroke-width="2"/></svg>`};
ENVS.thuyen = {name:"thuyền", water:true, svg:`<svg viewBox="0 0 60 60"><path d="M10 38 Q30 46 50 38 L44 50 Q30 54 16 50 Z" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><path d="M30 8 V38" stroke="#3B2B1E" stroke-width="2.5"/><path d="M30 10 Q46 18 30 30 Z" fill="#C9B27C" stroke="#3B2B1E" stroke-width="2"/></svg>`};

PLACES.baida  = {name:"Bãi đá", svg:ENVS.tangda.svg};
PLACES.rungcay= {name:"Rừng cây", svg:ENVS.tre.svg};
PLACES.suoi   = {name:"Suối", svg:ENVS.ao.svg};

LORE.leu = "lều tranh dựng bằng hai bàn tay trắng";
LORE.thuyen = "cánh buồm nâu — tin từ đất liền";

RELICS.hatdua = {name:"Hạt dưa đen", lore:"chim trắng thả xuống — cả một mùa vàng bắt đầu", svg:CHARS.hatden.svg};

/* ===== Chương 8 · Chú Cuội ===== */
CHARS.cuoi = {name:"Chú Cuội", svg:S(`<path d="M17 18 Q30 5 43 18 Z" fill="#3B2B1E"/><circle cx="36" cy="8" r="4.5" fill="#3B2B1E"/>`, "#8A6E52", CUOI,
  `<path d="M51 14 V44" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><path d="M45 12 Q51 4 57 12 L51 18 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2"/>`)};
CHARS.cogai = {name:"Cô gái", svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#3B2B1E"/><path d="M42 14 Q46 18 45 24" stroke="#3B2B1E" stroke-width="3" fill="none" stroke-linecap="round"/>`, "#6B8E9E", CUOI)};
CHARS.vocuoi = {name:"Vợ Cuội", svg:CHARS.cogai.svg};   /* cùng một người — cô gái được cứu năm xưa */
CHARS.ho = {name:"Hổ mẹ", svg:`<svg viewBox="0 0 60 60"><ellipse cx="32" cy="38" rx="18" ry="12" fill="#D98E3A" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="14" cy="30" r="9" fill="#D98E3A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M8 24 L6 18 L12 22 M20 24 L22 18 L16 22" fill="#D98E3A" stroke="#3B2B1E" stroke-width="2"/><circle cx="11" cy="29" r="1.5" fill="#3B2B1E"/><circle cx="17" cy="29" r="1.5" fill="#3B2B1E"/><path d="M11 34 q3 3 6 0" stroke="#3B2B1E" stroke-width="1.5" fill="none"/><path d="M26 28 v8 M33 27 v10 M40 28 v8 M46 31 v6" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M49 32 Q57 34 54 43" stroke="#3B2B1E" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`};
CHARS.hocon = {name:"Hổ con", svg:`<svg viewBox="0 0 60 60"><ellipse cx="32" cy="42" rx="13" ry="8" fill="#E3A75A" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="18" cy="36" r="7" fill="#E3A75A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M13 31 L11 26 L16 29 M23 31 L25 26 L20 29" fill="#E3A75A" stroke="#3B2B1E" stroke-width="1.8"/><circle cx="16" cy="35" r="1.2" fill="#3B2B1E"/><circle cx="20" cy="35" r="1.2" fill="#3B2B1E"/><path d="M28 36 v6 M34 35 v7 M40 37 v5" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/></svg>`};
CHARS.cho = {name:"Chó vàng", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="40" rx="15" ry="9" fill="#C9A227" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="15" cy="32" r="8" fill="#C9A227" stroke="#3B2B1E" stroke-width="2.5"/><path d="M9 26 Q7 20 12 22 L14 26 M21 26 Q23 20 18 22" fill="#A9825B" stroke="#3B2B1E" stroke-width="2"/><circle cx="13" cy="31" r="1.4" fill="#3B2B1E"/><circle cx="12" cy="35" r="2" fill="#3B2B1E"/><path d="M44 36 Q52 30 50 24" stroke="#C9A227" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M22 48 V53 M30 48 V53 M38 48 V53" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/></svg>`};
CHARS.chihang = {name:"Chị Hằng", svg:S(`<path d="M17 18 Q30 4 43 18 Z" fill="#3B2B1E"/><path d="M38 6 Q44 8 42 14 Q38 12 38 6 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/>`, "#F1EDE0", CUOI)};

ENVS.caythuoc = {name:"cây thuốc quý", svg:`<svg viewBox="0 0 60 60"><rect x="27" y="36" width="6" height="16" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><path d="M30 36 Q18 30 16 18 Q28 20 30 30 Q32 18 44 16 Q42 30 30 36 Z" fill="#6FAF5A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M22 10 l2 4 M40 8 l-2 4 M30 6 v4" stroke="#E3A72F" stroke-width="2" stroke-linecap="round"/></svg>`};
LORE.caythuoc = "lá cải tử hoàn sinh — tưới nước TRONG thôi đấy!";

PLACES.giengp = {name:"Giếng làng", svg:ENVS.gieng.svg};
PLACES.caythuocp = {name:"Gốc cây thuốc", svg:ENVS.caythuoc.svg};

RELICS.lathuoc = {name:"Lá thuốc thần", lore:"cải tử hoàn sinh — chỉ mọc trên một cây duy nhất", svg:`<svg viewBox="0 0 60 60"><path d="M30 50 Q14 38 16 20 Q30 24 32 38 Q34 22 46 14 Q48 34 30 50 Z" fill="#6FAF5A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M30 48 Q28 34 24 26" stroke="#3E6E34" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`};
