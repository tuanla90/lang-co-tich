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
  tam:  {name:"Tấm",    svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-tam" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-tam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E3A72F" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-tam)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-tam)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 20 A 13 13 0 0 1 43 20 L44 14 Q30 -8 16 14 Z" fill="#3B2B1E"/><path d="M17 18 Q30 8 43 18" fill="none" stroke="#3B2B1E" stroke-width="4"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M25 32 L35 45 M35 32 L25 45" stroke="#4A3535" stroke-width="1.5"/>
  </g>
</svg>`},
  cam:  {name:"Cám",    svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-cam" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-cam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5A7D3C" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#5A7D3C" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-cam)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-cam)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 20 A 13 13 0 0 1 43 20 L45 24 Q30 4 15 24 Z" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 28 Q30 26 34 28" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M25 32 L35 45 M35 32 L25 45" stroke="#8A4A5E" stroke-width="1.5"/>
  </g>
</svg>`},
  dighe:{name:"Dì ghẻ", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-dighe" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-dighe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2E4A62" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-dighe)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-dighe)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><circle cx="30" cy="9" r="5" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M23 16 L28 17 M37 16 L32 17" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M23 32 Q30 40 37 32" fill="none" stroke="#2B2B1E" stroke-width="2"/><circle cx="30" cy="38" r="2.5" fill="#8A4A5E"/>
  </g>
</svg>`},
  balao:{name:"Bà lão", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-balao" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-balao" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8A6E52" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-balao)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-balao)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#CFC6B8" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="30" cy="8" r="4.5" fill="#CFC6B8" stroke="#3B2B1E" stroke-width="1.5"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M22 32 L35 52" stroke="#4A3535" stroke-width="1.5"/><path d="M42 32 L40 54" stroke="#5C4030" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>`},
  vua:  {name:"Vua",    svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-vua" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-vua" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E3A72F" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-vua)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-vua)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M18 17 L20 7 Q25 12 30 5 Q35 12 40 7 L42 17 Z" fill="#E3A72F" stroke="#B5811C" stroke-width="2.5" stroke-linejoin="round"/><circle cx="30" cy="5" r="2" fill="#C8452A"/><circle cx="20" cy="7" r="1.5" fill="#7FB3C8"/><circle cx="40" cy="7" r="1.5" fill="#7FB3C8"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>null<path d="M22 38 Q30 50 38 38" fill="none" stroke="#C8452A" stroke-width="3"/><path d="M30 38 V50" stroke="#C8452A" stroke-width="3"/>
  </g>
</svg>`},
  linh: {name:"Lính",   svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-linh" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-linh" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4E6E52" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#4E6E52" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#4E6E52" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-linh)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-linh)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 12 17 Q 30 -1 48 17 Z" fill="#C89B62" stroke="#8A6E52" stroke-width="2.5" stroke-linejoin="round"/><path d="M 14 16 Q 30 22 46 16" fill="none" stroke="#C8452A" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>null<path d="M46 22 L 46 56" stroke="#5C4030" stroke-width="3" stroke-linecap="round"/><path d="M42 22 L50 22 L46 10 Z" fill="#7C8894" stroke="#3A444C" stroke-width="1.5"/><path d="M46 22 L 42 28 M 46 22 L 50 28 M 46 22 L 46 28" stroke="#C8452A" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`},
  but:  {name:"Bụt",     svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-but" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-but" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E2D2" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#E8E2D2" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#E8E2D2" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-but)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-but)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 Q 30 8 17 21 Z" fill="#F1E6C8" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="30" cy="7" r="4" fill="#F1E6C8" stroke="#3B2B1E" stroke-width="1.5"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M23 27 Q30 47 37 27 Q33 31 30 31 Q27 31 23 27 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2"/><path d="M22 32 Q30 42 38 32" fill="none" stroke="#4A3535" stroke-width="2" stroke-dasharray="2,2"/><path d="M 40 45 L 45 55" stroke="#5C4030" stroke-width="3" stroke-linecap="round"/><path d="M 40 45 Q 35 30 45 20 Q 55 30 40 45 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="1.5" stroke-linejoin="round"/><path d="M 40 45 Q 40 30 45 25 M 40 45 Q 45 35 48 28" fill="none" stroke="#3B2B1E" stroke-width="1"/>
  </g>
</svg>`},
  bong: {name:"Cá Bống", svg:`<svg viewBox="0 0 60 60">
    <defs>
      <linearGradient id="bongGrad-bong" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9BCBE0" />
        <stop offset="100%" stop-color="#55889E" />
      </linearGradient>
    </defs>
    <!-- Bóng -->
    <ellipse cx="28" cy="40" rx="14" ry="4" fill="rgba(0,0,0,0.2)"/>
    <!-- Thân -->
    <ellipse cx="28" cy="32" rx="14" ry="9" fill="url(#bongGrad-bong)" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Đuôi -->
    <path d="M42 32 L52 24 L52 40 Z" fill="#6499AE" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Mắt -->
    <circle cx="22" cy="30" r="1.6" fill="#3B2B1E"/>
    <circle cx="21" cy="29.5" r="0.6" fill="white"/>
    <!-- Miệng -->
    <path d="M26 36 Q29 38 32 36" stroke="#3B2B1E" stroke-width="1.5" fill="none"/>
    <!-- Vảy cá -->
    <path d="M25 28 Q27 30 25 32 M29 28 Q31 30 29 32 M33 29 Q35 31 33 33" stroke="#4A7A8E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- Sóng -->
    <path d="M12 24 Q16 20 20 24 M10 40 Q14 44 18 40" stroke="#F1F7F5" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`},
  chim: {name:"Chim sẻ",svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="45" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><path d="M 18 36 L 4 28 L 8 42 Z" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/><ellipse cx="30" cy="36" rx="15" ry="11" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><path d="M15 36 Q30 47 45 36" fill="#8A6E52"/><circle cx="41" cy="27" r="8" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><circle cx="42.5" cy="24.5" r="0.6" fill="white"/><path d="M48 28 L55 26 L48 31 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  vanganh:{name:"Vàng anh",svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="45" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><path d="M 18 36 L 4 28 L 8 42 Z" fill="#C9A227" stroke="#3B2B1E" stroke-width="2.5"/><ellipse cx="30" cy="36" rx="15" ry="11" fill="#E8C93E" stroke="#3B2B1E" stroke-width="2.5"/><path d="M15 36 Q30 47 45 36" fill="#C9A227"/><circle cx="41" cy="27" r="8" fill="#E8C93E" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><circle cx="42.5" cy="24.5" r="0.6" fill="white"/><path d="M48 28 L55 26 L48 31 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="2"/></svg>`},
  bom:  {name:"Bờm",     svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-bom" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-bom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C9B27C" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="15.299999999999999" ry="3.4" fill="rgba(0,0,0,0.15)"/>
  
  <g transform="translate(30, 52) scale(0.85) translate(-30, -52)">
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#C9B27C" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#C9B27C" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-bom)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-bom)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <circle cx="30" cy="7" r="4" fill="#3B2B1E"/><circle cx="19" cy="12" r="3.5" fill="#3B2B1E"/><circle cx="41" cy="12" r="3.5" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M47 22 Q60 14 56 4 Q44 6 45 16 Z" fill="#C9A46A" stroke="#3B2B1E" stroke-width="2"/><path d="M47 22 L50 27" stroke="#8A6E52" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/>
  </g>
</svg>`},
  phuong:{name:"Phú ông", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-phuong" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-phuong" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7A5296" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#7A5296" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#7A5296" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-phuong)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-phuong)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 20 A 13 13 0 0 1 43 20 Z" fill="#2B2B2B"/><rect x="19" y="11" width="22" height="4.5" rx="2" fill="#2B2B2B"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 28 Q30 26 34 28" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M24 26 Q27 24 29 26 M31 26 Q33 24 36 26" stroke="#3B2B1E" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M20 40 Q30 55 40 40" fill="none" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`},
  tan:  {name:"Tân (anh)", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-tan" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-tan" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6A9B61" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#6A9B61" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#6A9B61" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-tan)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-tan)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Búi tó nam giới -->
    <circle cx="30" cy="6" r="4.5" fill="#3B2B1E"/>
    <!-- Mái vén -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 Q 30 14 17 21 Z" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M25 33 L30 40 L35 33" fill="none" stroke="#D1E8CC" stroke-width="1.5"/><rect x="18" y="44" width="24" height="4" fill="#8A4A5E" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`},
  lang: {name:"Lang (em)", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-lang" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-lang" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6A9B61" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#6A9B61" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#6A9B61" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-lang)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-lang)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Búi tó nam giới -->
    <circle cx="30" cy="6" r="4.5" fill="#3B2B1E"/>
    <!-- Mái vén -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 Q 30 14 17 21 Z" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M25 33 L30 40 L35 33" fill="none" stroke="#D1E8CC" stroke-width="1.5"/><rect x="18" y="44" width="24" height="4" fill="#4A6C8A" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`},
  nangluu:{name:"Nàng Lưu", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-nangluu" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-nangluu" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7FA88F" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#7FA88F" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#7FA88F" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-nangluu)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-nangluu)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><circle cx="40" cy="10" r="3.5" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="1.5"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M25 32 L30 38 L35 32" stroke="#F7F1E0" stroke-width="2" fill="none"/><circle cx="30" cy="38" r="1.5" fill="#DE7BA4"/>
  </g>
</svg>`},
  sontinh:{name:"Sơn Tinh", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-sontinh" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-sontinh" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7A6A45" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#7A6A45" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#7A6A45" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-sontinh)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-sontinh)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M18 18 L24 7 L30 13 L36 5 L42 18 Z" fill="#7A6A45" stroke="#3B2B1E" stroke-width="2"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M45 54 L45 20" stroke="#5C4030" stroke-width="3" stroke-linecap="round"/><path d="M45 28 L55 24 L57 32 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="1.5" stroke-linejoin="round"/>
  </g>
</svg>`},
  thuytinh:{name:"Thuỷ Tinh", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-thuytinh" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-thuytinh" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3A7CA5" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#3A7CA5" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#3A7CA5" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-thuytinh)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-thuytinh)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M17 18 Q22 6 30 11 Q38 4 43 18 Q36 13 30 17 Q24 13 17 18 Z" fill="#2E6E8E" stroke="#3B2B1E" stroke-width="2"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M22 37 q4 3 8 0 M30 37 q4 3 8 0" stroke="#7FB3C8" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 45 Q26 42 30 45 Q34 48 38 45" fill="none" stroke="#F7F1E0" stroke-width="1.5"/>
  </g>
</svg>`},
  minuong:{name:"Mị Nương", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-minuong" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-minuong" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C86B85" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#C86B85" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#C86B85" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-minuong)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-minuong)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><path d="M24 8 L36 8" stroke="#E3A72F" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="38" cy="40" r="5" fill="#F7F1E0" stroke="#DE7BA4" stroke-width="1.5"/><path d="M34 44 L38 40" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`},
  voi:  {name:"Voi chín ngà", svg:`<svg viewBox="0 0 60 60"><ellipse cx="34" cy="48" rx="18" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="34" cy="36" rx="18" ry="13" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M16 36 Q34 49 52 36" fill="#7C8894"/><circle cx="15" cy="28" r="10" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2.5"/><ellipse cx="20" cy="20" rx="6" ry="8" fill="#B8C4CC" stroke="#3B2B1E" stroke-width="2"/><path d="M10 32 Q4 38 8 46 Q12 45 12 40" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="2.5"/><path d="M12 36 Q4 34 2 30 M13 39 Q6 40 3 38 M13 42 Q8 46 6 48" stroke="#F7F1E0" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="14" cy="26" r="1.4" fill="#3B2B1E"/><circle cx="13" cy="25" r="0.6" fill="white"/><path d="M26 47 L25 53 M36 47 L35 53 M44 45 L43 52" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  ga:   {name:"Gà chín cựa", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="44" rx="14" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="30" cy="34" rx="14" ry="11" fill="#C86B4A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M16 34 Q30 45 44 34" fill="#A84B2A"/><circle cx="41" cy="22" r="7" fill="#C86B4A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M 37 17 Q 39 9 41 14 Q 44 8 45 15 Q 47 11 47 17 Z" fill="#C8452A" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="43" cy="21" r="1.4" fill="#3B2B1E"/><circle cx="42" cy="20" r="0.6" fill="white"/><path d="M47 24 L54 23 L47 27 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/><path d="M18 30 Q8 24 10 34 Q16 38 22 34 Z" fill="#8A5A3B" stroke="#3B2B1E" stroke-width="2"/><path d="M26 44 L25 48 L27 52 M34 44 L33 48 L35 52 M22 49 l-4 -3 M24 51 l-5 -1 M38 49 l4 -3 M36 51 l5 -1" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/></svg>`},
  nguahong:{name:"Ngựa hồng mao", svg:`<svg viewBox="0 0 60 60"><ellipse cx="33" cy="48" rx="17" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="33" cy="38" rx="17" ry="10" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><path d="M16 38 Q33 48 50 38" fill="#8A6E52"/><path d="M 23 15 Q 30 18 28 26 M 25 22 Q 31 25 29 32" stroke="#DE7BA4" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M26 34 Q20 24 22 14" fill="none" stroke="#A9825B" stroke-width="9"/><path d="M24 13 L12 14 Q8 15 8 19 L10 22 Q14 23 20 22 Z" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 13 L20 7 L26 10 Z" fill="#A9825B" stroke="#3B2B1E" stroke-width="2"/><circle cx="15" cy="16" r="1.2" fill="#3B2B1E"/><circle cx="14" cy="15" r="0.6" fill="white"/><path d="M25 47 L24 50 L26 53 M33 47 L32 50 L34 53 M41 47 L40 50 L42 53 M46 44 L45 47 L47 50" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M49 34 Q56 37 53 45" stroke="#DE7BA4" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`},
  me:   {name:"Mẹ Gióng", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-me" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-me" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A9825B" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-me)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-me)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 20 A 13 13 0 0 1 43 20 Z" fill="#5C4030"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><rect x="22" y="38" width="5" height="5" fill="#8A6E52" stroke="#4A3535" stroke-width="1"/>
  </g>
</svg>`},
  giong:{name:"Bé Gióng", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-giong" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-giong" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C97B5A" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="14.4" ry="3.2" fill="rgba(0,0,0,0.15)"/>
  
  <g transform="translate(30, 52) scale(0.8) translate(-30, -52)">
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#C97B5A" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#C97B5A" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-giong)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-giong)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <circle cx="30" cy="7" r="4.5" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M24 32 L30 40 L36 32 Z" fill="#C8452A"/>
  </g>
</svg>`},
  giongts:{name:"Tráng sĩ Gióng", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-giongts" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-giongts" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7C8894" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#7C8894" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#7C8894" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-giongts)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-giongts)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M16 18 Q30 2 44 18 Z" fill="#7C8894" stroke="#3B2B1E" stroke-width="2"/><path d="M30 3 V8" stroke="#C8452A" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M52 8 V44" stroke="#5C6670" stroke-width="3.5" stroke-linecap="round"/><path d="M20 35 L40 35 L38 48 L22 48 Z" fill="#5C6670" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="30" cy="41" r="3" fill="#9AA5A8"/>
  </g>
</svg>`},
  suga: {name:"Sứ giả", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-suga" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-suga" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2E4A62" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#2E4A62" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-suga)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-suga)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 22 18 C 22 8, 38 8, 38 18" fill="#1C2D3A" stroke="#1A2D3A" stroke-width="2.5"/><rect x="18" y="16" width="24" height="6" rx="3" fill="#2E4A62" stroke="#1A2D3A" stroke-width="2"/><path d="M 18 19 L 5 17 L 5 21 Z" fill="#2E4A62" stroke="#1A2D3A" stroke-width="2"/><path d="M 42 19 L 55 17 L 55 21 Z" fill="#2E4A62" stroke="#1A2D3A" stroke-width="2"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 28 Q30 26 34 28" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>null<rect x="40" y="24" width="12" height="18" rx="2" fill="#F7F1E0" stroke="#8A6E52" stroke-width="2"/><path d="M 40 28 L 52 28 M 40 32 L 52 32 M 40 36 L 52 36" stroke="#8A6E52" stroke-width="1.5"/><rect x="40" y="30" width="12" height="4" fill="#C8452A"/>
  </g>
</svg>`},
  nguasat:{name:"Ngựa sắt", svg:`<svg viewBox="0 0 60 60"><ellipse cx="33" cy="48" rx="17" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="33" cy="38" rx="17" ry="10" fill="#7C8894" stroke="#3B2B1E" stroke-width="2.5"/><path d="M 23 15 Q 30 18 28 26 M 25 22 Q 31 25 29 32" stroke="#C8452A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M26 34 Q20 24 22 14" fill="none" stroke="#7C8894" stroke-width="9"/><path d="M24 13 L12 14 Q8 15 8 19 L10 22 Q14 23 20 22 Z" fill="#7C8894" stroke="#3B2B1E" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 13 L20 7 L26 10 Z" fill="#7C8894" stroke="#3B2B1E" stroke-width="2"/><circle cx="15" cy="16" r="1.2" fill="#3B2B1E"/><circle cx="14" cy="15" r="0.6" fill="white"/><!-- Lửa phun ra đúng từ mõm ngựa --><path d="M 10 16 Q 2 12 1 16 Q 4 17 5 17 Q 1 19 1 21 Q 4 21 5 21 Q 2 25 4 25 Q 8 23 10 20 Z" fill="#C8452A" stroke="#E3A72F" stroke-width="1.5" stroke-linejoin="round"/><path d="M25 47 L24 50 L26 53 M33 47 L32 50 L34 53 M41 47 L40 50 L42 53 M46 44 L45 47 L47 50" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M49 34 Q56 37 53 45" stroke="#C8452A" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`},
  giac1:{name:"Giặc Ân", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-giac1" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-giac1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6B4444" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#6B4444" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#6B4444" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-giac1)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-giac1)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M18 18 L30 4 L42 18 Z" fill="#4A3535" stroke="#3B2B1E" stroke-width="2"/><path d="M30 4 V0" stroke="#4A3535" stroke-width="3"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M42 38 L54 18" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><path d="M54 18 L58 12 L50 16 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="44" cy="34" r="3.5" fill="#F3D8B2" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`},
  giac2:{name:"Giặc Ân", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-giac2" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-giac2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6B4444" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#6B4444" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#6B4444" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-giac2)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-giac2)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M18 18 L30 4 L42 18 Z" fill="#4A3535" stroke="#3B2B1E" stroke-width="2"/><path d="M30 4 V0" stroke="#4A3535" stroke-width="3"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 29 L34 29" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M42 42 L58 22" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M52 28 Q58 22 56 16 Q48 20 52 28 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="1.5"/><circle cx="45" cy="35" r="3.5" fill="#F3D8B2" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`},
  khoai:{name:"Anh Khoai", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-khoai" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-khoai" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C89B62" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#C89B62" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#C89B62" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-khoai)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-khoai)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 18 16 A 12 12 0 0 1 42 16 Q 30 18 18 16 Z" fill="#8A6E52" stroke="#3B2B1E" stroke-width="1.5"/><path d="M39 13 L48 8 L44 17 Z" fill="#8A6E52" stroke="#3B2B1E" stroke-width="1.5"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M40 30 L40 52" stroke="#5A7D3C" stroke-width="2.5"/><path d="M38 38 L42 38 M38 45 L42 45" stroke="#3B2B1E" stroke-width="1"/>
  </g>
</svg>`},
  congai:{name:"Con gái phú ông", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-congai" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-congai" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DE7BA4" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-congai)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-congai)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><circle cx="41" cy="9" r="4" fill="#DE7BA4" stroke="#3B2B1E" stroke-width="1.5"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M18 35 Q25 45 35 52" fill="none" stroke="#F7F1E0" stroke-width="2"/>
  </g>
</svg>`},
  chure:{name:"Công tử", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-chure" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-chure" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3A6EA5" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#3A6EA5" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#3A6EA5" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-chure)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-chure)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 20 A 13 13 0 0 1 43 20 Z" fill="#1F3A5F"/><rect x="19" y="11" width="22" height="4.5" rx="2" fill="#1F3A5F"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 28 Q30 26 34 28" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="38" r="2.5" fill="#C8452A"/>
  </g>
</svg>`},
  /* Bộ ba đốt tre phân vai gốc/đốt/ngọn — thứ tự chuỗi tự hiện ra bằng mắt */
  dot1: {name:"Gốc tre", svg:`<svg viewBox="0 0 60 60"><path d="M 24 15 L 36 15 L 36 48 L 24 48 Z" fill="#6A9B61" stroke="#3E6257" stroke-width="2.5" stroke-linejoin="round"/><path d="M 22 25 Q 30 28 38 25 M 22 38 Q 30 41 38 38" fill="none" stroke="#3E6257" stroke-width="3" stroke-linecap="round"/><path d="M 24 48 Q 18 53 12 55 M 30 48 V 56 M 36 48 Q 42 53 48 55" fill="none" stroke="#5C4030" stroke-width="3" stroke-linecap="round"/></svg>`},
  came: {name:"Cá mè",   svg:`<svg viewBox="0 0 60 60"><defs><linearGradient id="cameGrad-came" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#D0D9DF" /><stop offset="100%" stop-color="#9BA6AE" /></linearGradient></defs><ellipse cx="28" cy="40" rx="14" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="28" cy="32" rx="14" ry="9" fill="url(#cameGrad-came)" stroke="#3B2B1E" stroke-width="2.5"/><path d="M42 32 L52 24 L52 40 Z" fill="#9BA6AE" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="22" cy="30" r="1.6" fill="#3B2B1E"/><circle cx="21" cy="29.5" r="0.6" fill="white"/><path d="M26 36 Q29 38 32 36" stroke="#3B2B1E" stroke-width="1.5" fill="none"/><path d="M25 28 Q27 30 25 32 M29 28 Q31 30 29 32" stroke="#7C8894" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M12 24 Q16 20 20 24 M10 40 Q14 44 18 40" stroke="#F1F7F5" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  chimdm:{name:"Chim đồi mồi",svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="45" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><path d="M 18 36 L 4 28 L 8 42 Z" fill="#5C3A1E" stroke="#3B2B1E" stroke-width="2.5"/><ellipse cx="30" cy="36" rx="15" ry="11" fill="#8B5A2B" stroke="#3B2B1E" stroke-width="2.5"/><path d="M15 36 Q30 47 45 36" fill="#5C3A1E"/><circle cx="41" cy="27" r="8" fill="#8B5A2B" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><circle cx="42.5" cy="24.5" r="0.6" fill="white"/><path d="M48 28 L55 26 L48 31 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/><circle cx="27" cy="34" r="2" fill="#5C3A1E"/><circle cx="34" cy="39" r="2" fill="#5C3A1E"/></svg>`},
  trau: {name:"Trâu",   svg:`<svg viewBox="0 0 60 60"><ellipse cx="33" cy="48" rx="18" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="33" cy="38" rx="18" ry="11" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M15 38 Q33 49 51 38" fill="#4B555F"/><circle cx="15" cy="30" r="8" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M11 23 Q2 18 10 14" fill="none" stroke="#C9B27C" stroke-width="3.5" stroke-linecap="round"/><path d="M19 23 Q28 18 20 14" fill="none" stroke="#C9B27C" stroke-width="3.5" stroke-linecap="round"/><circle cx="13" cy="30" r="1.5" fill="#3B2B1E"/><circle cx="12" cy="29" r="0.6" fill="white"/><path d="M11 35 q3 2 6 1" stroke="#3B2B1E" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M24 48 L23 51 L25 54 M32 48 L31 51 L33 54 M40 48 L39 51 L41 54 M46 45 L45 48 L47 51" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M50 33 Q57 37 53 45" stroke="#3B2B1E" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  dot2: {name:"Đốt tre", svg:`<svg viewBox="0 0 60 60"><path d="M 24 12 L 36 12 L 36 48 L 24 48 Z" fill="#6A9B61" stroke="#3E6257" stroke-width="2.5" stroke-linejoin="round"/><path d="M 22 24 Q 30 27 38 24 M 22 36 Q 30 39 38 36" fill="none" stroke="#3E6257" stroke-width="3" stroke-linecap="round"/></svg>`},
  dot3: {name:"Ngọn tre", svg:`<svg viewBox="0 0 60 60"><path d="M 24 15 L 36 15 L 36 48 L 24 48 Z" fill="#6A9B61" stroke="#3E6257" stroke-width="2.5" stroke-linejoin="round"/><path d="M 22 36 Q 30 39 38 36" fill="none" stroke="#3E6257" stroke-width="3" stroke-linecap="round"/><path d="M 22 15 Q 30 18 38 15" fill="none" stroke="#3E6257" stroke-width="3" stroke-linecap="round"/><path d="M 26 15 Q 10 5 12 25 Q 20 15 26 15 Z" fill="#5A7D3C" stroke="#3E6257" stroke-width="1.5" stroke-linejoin="round"/><path d="M 34 15 Q 50 5 48 25 Q 40 15 34 15 Z" fill="#5A7D3C" stroke="#3E6257" stroke-width="1.5" stroke-linejoin="round"/><path d="M 30 15 Q 30 -5 40 5 Q 35 13 30 15 Z" fill="#6A9B61" stroke="#3E6257" stroke-width="1.5" stroke-linejoin="round"/></svg>`},
  qthi: {name:"Quả thị",svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="16" fill="#E8912D" stroke="#C26B1E" stroke-width="2.5"/><path d="M30 18 Q30 10 38 10" fill="none" stroke="#5A7D3C" stroke-width="3.5" stroke-linecap="round"/><path d="M30 14 Q22 8 16 14 Q22 20 30 14" fill="#5A7D3C" stroke="#3E6257" stroke-width="2"/><circle cx="25.5" cy="33" r="1.5" fill="#3B2B1E"/><circle cx="34.5" cy="33" r="1.5" fill="#3B2B1E"/><path d="M26 39 Q30 42 34 39" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/></svg>`},
};

/* ===== Môi trường trên bàn cờ ===== */
const ENVS = {
  ao:   {name:"ao",       water:true, svg:`<svg viewBox="0 0 60 60"><path d="M12 30 Q20 25 28 30 T44 30" fill="none" stroke="#F1F7F5" stroke-width="3" stroke-linecap="round" opacity=".9"/><path d="M16 42 Q24 37 32 42 T48 42" fill="none" stroke="#F1F7F5" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>`},
  gieng:{name:"giếng",    svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="32" r="18" fill="#9AA5A8" stroke="#454A4B" stroke-width="3"/><circle cx="30" cy="32" r="10" fill="#2E4A62" stroke="#454A4B" stroke-width="2.5"/><path d="M14 20 L30 8 L46 20" fill="none" stroke="#8A6E52" stroke-width="4" stroke-linecap="round"/></svg>`},
  thung:{name:"thúng thóc",svg:`<svg viewBox="0 0 60 60"><path d="M12 28 H48 L43 48 H17 Z" fill="#C89B62" stroke="#5A452C" stroke-width="3"/><path d="M12 28 H48" stroke="#5A452C" stroke-width="3"/><ellipse cx="30" cy="26" rx="15" ry="5" fill="#E3A72F" stroke="#5A452C" stroke-width="2.5"/></svg>`},
  cong: {name:"cổng làng", svg:`<svg viewBox="0 0 60 60"><path d="M 5 26 Q 30 10 55 26 L 50 30 Q 30 16 10 30 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2.5" stroke-linejoin="round"/><rect x="12" y="28" width="8" height="28" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="40" y="28" width="8" height="28" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="22" y="22" width="16" height="8" fill="#F7F1E0" stroke="#8A6E52" stroke-width="2"/><path d="M 25 26 L 35 26 M 26 24 V 28 M 34 24 V 28" stroke="#3A444C" stroke-width="1.5"/><path d="M 10 56 L 22 56 M 38 56 L 50 56" stroke="#5C4030" stroke-width="4" stroke-linecap="round"/></svg>`},
  kieu: {name:"kiệu vua",  svg:`<svg viewBox="0 0 60 60"><path d="M 4 48 L 56 48 M 4 40 L 56 40" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><path d="M 16 22 L 44 22 L 46 44 L 14 44 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2.5" stroke-linejoin="round"/><path d="M 18 24 L 42 24 L 42 34 Q 30 24 18 34 Z" fill="#E3A72F" opacity="0.8"/><path d="M 10 22 Q 30 5 50 22 L 46 25 Q 30 12 14 25 Z" fill="#E3A72F" stroke="#B5811C" stroke-width="2.5" stroke-linejoin="round"/><circle cx="30" cy="12" r="3" fill="#C8452A" stroke="#B5811C" stroke-width="1.5"/></svg>`},
  caythi:{name:"cây thị",  svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="54" rx="16" ry="4" fill="rgba(0,0,0,0.15)"/><path d="M 27 52 L 27 25 L 33 25 L 33 52 Z" fill="#5C4030" stroke="#3E2723" stroke-width="2.5" stroke-linejoin="round"/><path d="M 15 32 C 5 32, 10 12, 25 15 C 25 5, 45 5, 45 15 C 55 12, 58 32, 48 32 C 55 42, 35 48, 30 42 C 25 48, 5 42, 15 32 Z" fill="#5A7D3C" stroke="#3E6257" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="30" r="3" fill="#E8C93E" stroke="#C26B1E" stroke-width="1.5"/><circle cx="42" cy="26" r="3" fill="#E8C93E" stroke="#C26B1E" stroke-width="1.5"/><circle cx="34" cy="38" r="3" fill="#E8C93E" stroke="#C26B1E" stroke-width="1.5"/></svg>`},
  quan: {name:"quán nước", svg:`<svg viewBox="0 0 60 60"><path d="M8 26 L30 10 L52 26 Z" fill="#C9B27C" stroke="#3E3124" stroke-width="3"/><rect x="14" y="26" width="4" height="26" fill="#8A6E52" stroke="#3E3124" stroke-width="2"/><rect x="42" y="26" width="4" height="26" fill="#8A6E52" stroke="#3E3124" stroke-width="2"/><rect x="20" y="38" width="20" height="8" fill="#C89B62" stroke="#3E3124" stroke-width="2.5"/></svg>`},
  rom:  {name:"đống rơm",  svg:`<svg viewBox="0 0 60 60"><path d="M10 50 Q12 22 30 16 Q48 22 50 50 Z" fill="#E3C56F" stroke="#665831" stroke-width="3"/><path d="M22 44 Q24 32 30 28 M38 44 Q36 34 32 28" fill="none" stroke="#B9964A" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  bunsvg:{name:"vũng bùn", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="38" rx="20" ry="11" fill="#8F6A42" stroke="#564530" stroke-width="2.5" opacity=".85"/><ellipse cx="24" cy="35" rx="5" ry="2.5" fill="#C09A6C"/><ellipse cx="38" cy="41" rx="4" ry="2" fill="#C09A6C"/></svg>`},
  cayda:{name:"cây đa",   svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="54" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/><path d="M 26 52 L 26 25 L 34 25 L 34 52 Z" fill="#5C4030" stroke="#3E2723" stroke-width="2.5" stroke-linejoin="round"/><path d="M 18 35 L 18 50 M 42 35 L 42 50" stroke="#5C4030" stroke-width="2.5" stroke-linecap="round"/><path d="M 12 32 C 2 32, 5 15, 20 15 C 20 2, 40 2, 40 15 C 55 15, 58 32, 48 32 C 55 42, 35 45, 30 40 C 25 45, 5 42, 12 32 Z" fill="#4E6E52" stroke="#2E4A35" stroke-width="2.5" stroke-linejoin="round"/></svg>`},
  tre:  {name:"bụi tre",  svg:`<svg viewBox="0 0 60 60">
    <ellipse cx="30" cy="54" rx="16" ry="4" fill="rgba(0,0,0,0.15)"/>
    <path d="M 20 52 L 20 10 M 30 52 L 30 5 M 40 52 L 40 15" stroke="#6A9B61" stroke-width="4" stroke-linecap="round"/>
    <path d="M 18 40 L 22 40 M 18 28 L 22 28 M 18 16 L 22 16" stroke="#3E6257" stroke-width="2"/>
    <path d="M 28 42 L 32 42 M 28 30 L 32 30 M 28 18 L 32 18 M 28 8 L 32 8" stroke="#3E6257" stroke-width="2"/>
    <path d="M 38 44 L 42 44 M 38 32 L 42 32 M 38 20 L 42 20" stroke="#3E6257" stroke-width="2"/>
    <path d="M 20 16 Q 12 14 10 20 Q 15 18 20 16 Z" fill="#5A7D3C"/>
    <path d="M 30 18 Q 20 15 18 22 Q 25 20 30 18 Z" fill="#5A7D3C"/>
    <path d="M 30 8 Q 38 5 42 10 Q 36 10 30 8 Z" fill="#5A7D3C"/>
    <path d="M 40 20 Q 48 18 52 24 Q 45 22 40 20 Z" fill="#5A7D3C"/>
  </svg>`},
  dinh: {name:"sân đình", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="52" rx="22" ry="4" fill="rgba(0,0,0,0.15)"/><rect x="12" y="30" width="36" height="20" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="18" y="36" width="8" height="14" fill="#5C4030" stroke="#3E2723" stroke-width="2"/><rect x="34" y="36" width="8" height="14" fill="#5C4030" stroke="#3E2723" stroke-width="2"/><path d="M 6 30 Q 30 15 54 30 L 48 30 Q 30 20 12 30 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2.5" stroke-linejoin="round"/></svg>`},
  caycau:{name:"cây cau", svg:`<svg viewBox="0 0 60 60"><path d="M28 54 Q30 30 29 12" stroke="#8A6E52" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M26 20 h6 M27 30 h5 M27 40 h5" stroke="#28381B" stroke-width="1.5"/><path d="M29 12 Q16 6 10 12 M29 12 Q42 4 50 10 M29 12 Q20 2 14 4 M29 12 Q38 0 46 2" stroke="#5A7D3C" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="26" cy="15" r="2.2" fill="#E3A72F" stroke="#28381B" stroke-width="1.5"/><circle cx="32" cy="16" r="2.2" fill="#E3A72F" stroke="#28381B" stroke-width="1.5"/></svg>`},
  cung: {name:"cung vua", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="54" rx="24" ry="4" fill="rgba(0,0,0,0.15)"/><rect x="10" y="42" width="40" height="10" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="16" y="28" width="28" height="14" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="25" y="32" width="10" height="10" fill="#C8452A" stroke="#8A2A1A" stroke-width="2"/><path d="M 6 42 Q 30 30 54 42 L 48 42 Q 30 35 12 42 Z" fill="#E3A72F" stroke="#B5811C" stroke-width="2.5" stroke-linejoin="round"/><path d="M 10 28 Q 30 15 50 28 L 44 28 Q 30 20 16 28 Z" fill="#E3A72F" stroke="#B5811C" stroke-width="2.5" stroke-linejoin="round"/></svg>`},
  mocau:{name:"mo cau",   svg:`<svg viewBox="0 0 60 60"><path d="M14 40 Q20 18 46 22 Q40 34 30 38 Q22 42 14 40 Z" fill="#C9A46A" stroke="#5A492F" stroke-width="2.5"/><path d="M20 36 Q28 26 42 25" stroke="#8A6E52" stroke-width="2" fill="none"/></svg>`},
  nui:  {name:"núi đá",   svg:`<svg viewBox="0 0 60 60"><path d="M6 50 L24 14 L34 32 L42 20 L54 50 Z" fill="#9AA5A8" stroke="#454A4B" stroke-width="3"/><path d="M24 14 L29 23 L24 29 L19 23 Z" fill="#F1F7F5" stroke="#454A4B" stroke-width="2"/></svg>`},
  baico:{name:"bãi cỏ",   svg:`<svg viewBox="0 0 60 60"><path d="M10 48 Q12 34 14 48 M20 48 Q23 30 26 48 M32 48 Q35 34 38 48 M44 48 Q46 32 48 48" fill="#5A7D3C" stroke="#28381B" stroke-width="2"/></svg>`},
  saophoi:{name:"sào phơi áo", svg:`<svg viewBox="0 0 60 60"><path d="M8 16 V52 M52 16 V52" stroke="#8A6E52" stroke-width="3.5" stroke-linecap="round"/><path d="M8 18 H52" stroke="#5A1F12" stroke-width="2.5"/><path d="M20 18 L18 38 Q26 42 34 38 L32 18 Z" fill="#C8452A" stroke="#5A1F12" stroke-width="2.5"/><path d="M23 25 h7" stroke="#E3A72F" stroke-width="2"/></svg>`},
  dantrau:{name:"đàn trâu bò", svg:`<svg viewBox="0 0 60 60"><path d="M4 54 H56" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><path d="M8 54 L7 44 M52 54 L53 44 M30 54 L29 44 M15 54 L14 44 M45 54 L44 44" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><circle cx="19" cy="30" r="9" fill="#5C6670" stroke="#3B2B1E" stroke-width="2.5"/><path d="M15 25 Q11 20 16 16 M23 25 Q27 20 22 16" fill="none" stroke="#C9B27C" stroke-width="3" stroke-linecap="round"/><circle cx="17" cy="30" r="1.4" fill="#3B2B1E"/><circle cx="42" cy="32" r="9" fill="#A9825B" stroke="#3B2B1E" stroke-width="2.5"/><path d="M39 27 Q36 22 39 19 M45 27 Q48 22 45 19" fill="none" stroke="#E9D9A8" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="32" r="1.4" fill="#3B2B1E"/></svg>`},
  begolim:{name:"bè gỗ lim", water:true, svg:`<svg viewBox="0 0 60 60"><rect x="8" y="20" width="44" height="7" rx="3.5" fill="#4A3527" stroke="#3B2B1E" stroke-width="2"/><rect x="8" y="29" width="44" height="7" rx="3.5" fill="#5C4030" stroke="#3B2B1E" stroke-width="2"/><rect x="8" y="38" width="44" height="7" rx="3.5" fill="#4A3527" stroke="#3B2B1E" stroke-width="2"/><path d="M18 18 V47 M42 18 V47" stroke="#C9B27C" stroke-width="2.5"/></svg>`},
  namxoi:{name:"nắm xôi",  svg:`<svg viewBox="0 0 60 60"><path d="M8 42 Q30 30 52 42 Q30 52 8 42 Z" fill="#5A7D3C" stroke="#28381B" stroke-width="2.5"/><path d="M18 40 Q20 26 30 24 Q40 26 42 40 Q30 45 18 40 Z" fill="#F7F1E0" stroke="#28381B" stroke-width="2.5"/><path d="M24 18 Q26 14 24 10 M32 18 Q34 14 32 10" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  mamco:{name:"mâm cỗ",   svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="38" rx="22" ry="10" fill="#E3A72F" stroke="#664B15" stroke-width="2.5"/><circle cx="22" cy="34" r="5" fill="#F7F1E0" stroke="#664B15" stroke-width="2"/><circle cx="36" cy="32" r="5" fill="#C8452A" stroke="#664B15" stroke-width="2"/><circle cx="40" cy="40" r="4" fill="#5A7D3C" stroke="#664B15" stroke-width="2"/><path d="M26 22 Q28 18 26 14" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  batcom:{name:"bát cơm", svg:`<svg viewBox="0 0 60 60"><path d="M14 30 Q30 26 46 30 L42 44 Q30 48 18 44 Z" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="2.5"/><path d="M18 28 Q22 22 30 21 Q38 22 42 28 Q30 32 18 28 Z" fill="#FFFDF5" stroke="#3B2B1E" stroke-width="2"/><path d="M36 8 L48 24 M40 6 L52 22" stroke="#8A6E52" stroke-width="2.5" stroke-linecap="round"/></svg>`},
  tangda:{name:"tảng đá vôi", svg:`<svg viewBox="0 0 60 60"><path d="M12 46 Q8 30 20 22 Q30 14 42 22 Q52 30 48 46 Q30 52 12 46 Z" fill="#E8E2D2" stroke="#68655E" stroke-width="3"/><path d="M22 32 Q28 28 34 32 M20 40 Q30 36 42 40" stroke="#B8B0A0" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  vetchan:{name:"vết chân lạ", svg:`<svg viewBox="0 0 60 60"><g transform="translate(15, 15) scale(0.6)"><path d="M22 46 Q13 36 17 23 Q21 13 30 13 Q39 13 43 23 Q47 36 38 46 Q30 52 22 46 Z" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="21" cy="11" r="3.5" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2"/><circle cx="30" cy="8" r="3.5" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2"/><circle cx="39" cy="11" r="3.5" fill="#C0A87E" stroke="#3B2B1E" stroke-width="2"/></g></svg>`},
  noicom:{name:"nồi cơm làng", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="38" rx="20" ry="13" fill="#5C6670" stroke="#292D32" stroke-width="3"/><path d="M10 32 Q30 24 50 32" fill="none" stroke="#292D32" stroke-width="2.5"/><path d="M18 26 Q21 16 30 14 Q39 16 42 26 Q30 31 18 26 Z" fill="#F7F1E0" stroke="#292D32" stroke-width="2.5"/><path d="M26 10 Q28 6 26 2 M34 10 Q36 6 34 2" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
};
/* dot1/dot2/dot3 giờ mỗi vai một hình riêng (gốc/đốt/ngọn) — khai thẳng trong CHARS */
/* giac2 giờ có bản vẽ RIÊNG của ver 2 — bỏ dòng chép đè từ giac1. */   /* id riêng, hình y nguyên */
/* linh2 GIỮ vạch đỏ giữa ngực, linh thì không — để phân biệt hai người lính.
   Vì thế không còn chép từ linh được nữa, phải tự dựng lấy. */
CHARS.linh2 = {name:"Lính", svg:CHARS.linh.svg
  .split('-linh"').join('-linh2"').split("-linh)").join("-linh2)")
  .replace("</svg>", '<path d="M 24 45 L 36 45" stroke="#C8452A" stroke-width="4"/></svg>')};  // id riêng, hình y nguyên
/* lang giờ có bản vẽ RIÊNG của ver 2 — bỏ dòng chép đè từ tan.
   Lưu ý cốt truyện: Tân và Lang là anh em sinh đôi "giống nhau như hai giọt nước";
   ver 2 vẽ hai người hơi khác nhau, nên màn "Hai giọt nước" cần xem lại. */
/* sinh đôi — giống nhau như hai giọt nước, đúng nghĩa đen.
   Chỉ đổi hậu tố id gradient để hai bản không đụng id nhau; nét vẽ không đổi. */

/* ===== Địa điểm cho màn ma trận ===== */
const PLACES = {
  dong:    {name:"Ngoài đồng", ter:"bùn lầy", svg:`<svg viewBox="0 0 60 60"><rect x="6" y="30" width="48" height="22" rx="4" fill="#8FB06A" stroke="#404F2F" stroke-width="2.5"/><path d="M12 36 V48 M20 34 V50 M28 36 V48 M36 34 V50 M44 36 V48" stroke="#5A7D3C" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="14" r="7" fill="#E3A72F" stroke="#404F2F" stroke-width="2.5"/></svg>`},
  san:     {name:"Sân nhà", svg:`<svg viewBox="0 0 60 60"><path d="M8 28 L30 10 L52 28 Z" fill="#C8452A" stroke="#5A1F12" stroke-width="2.5"/><rect x="14" y="28" width="32" height="22" fill="#E9D9A8" stroke="#5A1F12" stroke-width="2.5"/><rect x="26" y="36" width="9" height="14" fill="#8A6E52" stroke="#5A1F12" stroke-width="2"/></svg>`},
  boao:    {name:"Bờ ao", svg:ENVS.ao.svg},
  sandinh: {name:"Sân đình", svg:ENVS.dinh.svg},
  baico:   {name:"Bãi cỏ", svg:`<svg viewBox="0 0 60 60"><path d="M10 48 Q12 34 14 48 M20 48 Q23 30 26 48 M32 48 Q35 34 38 48 M44 48 Q46 32 48 48" fill="#5A7D3C" stroke="#28381B" stroke-width="2"/><circle cx="46" cy="16" r="6" fill="#F1E6C8" stroke="#28381B" stroke-width="2"/></svg>`},
  duongbun:{name:"Đường làng", ter:"bùn lầy", svg:ENVS.bunsvg.svg},
  bep:     {name:"Bếp", svg:`<svg viewBox="0 0 60 60"><path d="M16 46 L30 46 L44 46" stroke="#292D32" stroke-width="3"/><path d="M20 46 L24 34 M40 46 L36 34" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><ellipse cx="30" cy="32" rx="12" ry="8" fill="#5C6670" stroke="#292D32" stroke-width="2.5"/><path d="M24 46 Q27 40 30 46 Q33 40 36 46" fill="#C8452A" stroke="#292D32" stroke-width="2"/><path d="M28 20 Q30 15 28 11" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  chuongtrau:{name:"Chuồng trâu", ter:"bùn lầy", svg:`<svg viewBox="0 0 60 60"><path d="M4 54 H56 M8 54 V38 M52 54 V38 M30 54 V40" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="28" r="10" fill="#5C6670" stroke="#292D32" stroke-width="2.5"/><path d="M23 21 Q15 14 22 8 M37 21 Q45 14 38 8" fill="none" stroke="#C9B27C" stroke-width="3" stroke-linecap="round"/><circle cx="27" cy="28" r="1.5" fill="#292D32"/></svg>`},
  hangxoi: {name:"Hàng xôi", svg:`<svg viewBox="0 0 60 60"><path d="M10 34 H50 L45 52 H15 Z" fill="#C89B62" stroke="#5A452C" stroke-width="2.5"/><path d="M20 32 Q22 20 30 18 Q38 20 40 32 Q30 37 20 32 Z" fill="#F7F1E0" stroke="#5A452C" stroke-width="2.5"/><path d="M26 12 Q28 8 26 4 M34 12 Q36 8 34 4" stroke="#9AA5A8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`},
  hangnuoc:{name:"Hàng nước", svg:ENVS.quan.svg},
  xoandao: {name:"Gốc xoan đào", svg:`<svg viewBox="0 0 60 60"><rect x="27" y="34" width="7" height="20" fill="#8A6E52" stroke="#28381B" stroke-width="2.5"/><circle cx="30" cy="22" r="16" fill="#5A7D3C" stroke="#28381B" stroke-width="3"/><circle cx="22" cy="18" r="3.5" fill="#DE7BA4" stroke="#28381B" stroke-width="1.5"/><circle cx="36" cy="14" r="3.5" fill="#DE7BA4" stroke="#28381B" stroke-width="1.5"/><circle cx="38" cy="27" r="3.5" fill="#DE7BA4" stroke="#28381B" stroke-width="1.5"/></svg>`},
  khungcui:{name:"Khung cửi", svg:`<svg viewBox="0 0 60 60"><rect x="10" y="14" width="40" height="34" fill="none" stroke="#8A6E52" stroke-width="4"/><path d="M14 20 H46 M14 26 H46 M14 32 H46 M14 38 H46" stroke="#C9B27C" stroke-width="2.5"/><path d="M10 48 L6 54 M50 48 L54 54" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/></svg>`},
  sanphoi: {name:"Sân phơi", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="20" ry="12" fill="#E9D9A8" stroke="#68614B" stroke-width="2.5"/><path d="M18 30 Q30 26 42 30 M16 36 Q30 32 44 36 M20 41 Q30 38 40 41" stroke="#C89B62" stroke-width="2" fill="none"/></svg>`},
};

PLACES.ruongbun = {name:"Ruộng", ter:"bùn lầy", svg:PLACES.dong.svg};
PLACES.nhatren  = {name:"Nhà trên", svg:PLACES.san.svg};
PLACES.bienai   = {name:"Biên ải", svg:ENVS.nui.svg};
PLACES.rungnui  = {name:"Rừng núi", svg:ENVS.nui.svg};
PLACES.conglang = {name:"Cổng nhà", svg:`<svg viewBox="0 0 60 60"><path d="M 5 26 Q 30 10 55 26 L 50 30 Q 30 16 10 30 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2.5" stroke-linejoin="round"/><rect x="12" y="28" width="8" height="28" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="40" y="28" width="8" height="28" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2.5"/><rect x="22" y="22" width="16" height="8" fill="#F7F1E0" stroke="#8A6E52" stroke-width="2"/><path d="M 25 26 L 35 26 M 26 24 V 28 M 34 24 V 28" stroke="#3A444C" stroke-width="1.5"/><path d="M 10 56 L 22 56 M 38 56 L 50 56" stroke="#5C4030" stroke-width="4" stroke-linecap="round"/></svg>`};
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
  khacnhap:{name:"Khắc nhập", svg:`<svg viewBox="0 0 60 60"><rect x="24" y="16" width="12" height="28" rx="5" fill="#5A7D3C" stroke="#3E6257" stroke-width="2.5"/><path d="M24 25 h12 M24 35 h12" stroke="#3E6257" stroke-width="2"/><path d="M3 30 h9" stroke="#C8452A" stroke-width="4" stroke-linecap="round"/><path d="M12 23 L21 30 L12 37 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2"/><path d="M57 30 h-9" stroke="#C8452A" stroke-width="4" stroke-linecap="round"/><path d="M48 23 L39 30 L48 37 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2"/></svg>`},
  khacxuat:{name:"Khắc xuất", svg:`<svg viewBox="0 0 60 60"><rect x="16" y="16" width="11" height="28" rx="5" fill="#5A7D3C" stroke="#3E6257" stroke-width="2.5"/><rect x="33" y="16" width="11" height="28" rx="5" fill="#5A7D3C" stroke="#3E6257" stroke-width="2.5"/><path d="M16 25 h11 M16 35 h11 M33 25 h11 M33 35 h11" stroke="#3E6257" stroke-width="2"/><path d="M13 30 h-4" stroke="#2E4A62" stroke-width="4" stroke-linecap="round"/><path d="M9 23 L2 30 L9 37 Z" fill="#2E4A62" stroke="#1A2D3A" stroke-width="2"/><path d="M47 30 h4" stroke="#2E4A62" stroke-width="4" stroke-linecap="round"/><path d="M51 23 L58 30 L51 37 Z" fill="#2E4A62" stroke="#1A2D3A" stroke-width="2"/></svg>`},
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
    svg:`<svg viewBox="0 0 60 60"><path d="M30 8 Q34 12 40 12 L30 52 L20 12 Q26 12 30 8 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2.5"/><path d="M20 12 Q14 16 12 22 M40 12 Q46 16 48 22" stroke="#C8452A" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="30" cy="24" r="4" fill="#E3A72F" stroke="#B5811C" stroke-width="1.5"/></svg>`},
  quatmo:  {name:"Quạt mo", lore:"mo cau nhà Tấm — thành quạt của Bờm, rồi về tay phú ông",
    svg:null},
  dot100:  {name:"Đốt tre thứ 100", lore:"khắc nhập! khắc xuất!",
    svg:`<svg viewBox="0 0 60 60"><path d="M 24 15 L 36 15 L 36 48 L 24 48 Z" fill="#6A9B61" stroke="#3E6257" stroke-width="2.5" stroke-linejoin="round"/><path d="M 22 36 Q 30 39 38 36" fill="none" stroke="#3E6257" stroke-width="3" stroke-linecap="round"/><path d="M 22 15 Q 30 18 38 15" fill="none" stroke="#3E6257" stroke-width="3" stroke-linecap="round"/><path d="M 26 15 Q 10 5 12 25 Q 20 15 26 15 Z" fill="#5A7D3C" stroke="#3E6257" stroke-width="1.5" stroke-linejoin="round"/><path d="M 34 15 Q 50 5 48 25 Q 40 15 34 15 Z" fill="#5A7D3C" stroke="#3E6257" stroke-width="1.5" stroke-linejoin="round"/><path d="M 30 15 Q 30 -5 40 5 Q 35 13 30 15 Z" fill="#6A9B61" stroke="#3E6257" stroke-width="1.5" stroke-linejoin="round"/></svg>`},
  roisat:  {name:"Roi sắt gãy", lore:"gãy thì gãy — đã có tre ngà!",
    svg:`<svg viewBox="0 0 60 60"><path d="M10 46 L26 30" stroke="#5C6670" stroke-width="6" stroke-linecap="round"/><path d="M34 24 L50 8" stroke="#5C6670" stroke-width="6" stroke-linecap="round"/><path d="M24 34 l-4 4 M29 28 l4 -4" stroke="#9AA5A8" stroke-width="2" stroke-linecap="round"/></svg>`},
  vaytt:   {name:"Vảy Thuỷ Tinh", lore:"sóng đánh văng lên bờ trong trận nước dâng",
    svg:`<svg viewBox="0 0 60 60"><path d="M30 8 Q48 24 44 40 Q38 52 30 52 Q22 52 16 40 Q12 24 30 8 Z" fill="#7FB3C8" stroke="#3A7CA5" stroke-width="2.5"/><path d="M30 16 V46 M22 26 Q30 32 38 26 M20 36 Q30 42 40 36" stroke="#3A7CA5" stroke-width="2" fill="none"/></svg>`},
  miengtrau:{name:"Miếng trầu têm", lore:"miếng trầu là đầu câu chuyện",
    svg:`<svg viewBox="0 0 60 60"><path d="M14 34 Q14 18 30 14 Q46 18 46 34 Q38 30 30 34 Q22 30 14 34 Z" fill="#5A7D3C" stroke="#3E6257" stroke-width="2.5"/><path d="M22 38 Q30 34 38 38 Q36 48 30 50 Q24 48 22 38 Z" fill="#C8452A" stroke="#8A2A1A" stroke-width="2.5"/></svg>`},
};
RELICS.quatmo.svg = ENVS.mocau.svg;
/* dot100 giờ có nét vẽ RIÊNG của ver2, không mượn dot3 nữa —
   bỏ dòng gán đè cũ, kẻo nó ghi lại đè lên hình mới. */

/* ===== Chương 7 · Mai An Tiêm ===== */
CHARS.antiem = {name:"Mai An Tiêm", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-antiem" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-antiem" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3E6257" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#3E6257" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#3E6257" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-antiem)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-antiem)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <path d="M 17 20 A 13 13 0 0 1 43 20 Z" fill="#2E4A62"/><path d="M40 12 L48 9 L45 16 Z" fill="#2E4A62" stroke="#3B2B1E" stroke-width="1.5"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><!-- ngực trần --><path d="M18 32 L42 32 L40 45 L20 45 Z" fill="url(#headGrad-antiem)" opacity="0.8"/><!-- khố --><rect x="19" y="43" width="22" height="9" fill="#3E6257"/><!-- dưa hấu --><circle cx="30" cy="42" r="6" fill="#1F4A28"/><path d="M26 42 Q30 36 34 42" stroke="#5A7D3C" stroke-width="1.5" fill="none"/>
  </g>
</svg>`};
CHARS.voat  = {name:"Vợ An Tiêm", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-voat" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-voat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8A4A5E" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#8A4A5E" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#8A4A5E" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-voat)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-voat)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><path d="M20 8 Q30 3 40 8" stroke="#8A4A5E" stroke-width="3" fill="none" stroke-linecap="round"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M22 32 L38 32 L30 42 Z" fill="#C86B85"/>
  </g>
</svg>`};
CHARS.beat  = {name:"Bé An", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-beat" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-beat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D98E4A" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="14.4" ry="3.2" fill="rgba(0,0,0,0.15)"/>
  
  <g transform="translate(30, 52) scale(0.8) translate(-30, -52)">
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#D98E4A" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#D98E4A" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-beat)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-beat)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <circle cx="22" cy="9" r="4" fill="#3B2B1E"/><circle cx="38" cy="9" r="4" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="35" cy="40" r="2.5" fill="#F7F1E0" stroke="#3B2B1E" stroke-width="1"/>
  </g>
</svg>`};
CHARS.chimtrang = {name:"Chim trắng", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="45" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><path d="M 18 36 L 4 28 L 8 42 Z" fill="#D8D2C0" stroke="#3B2B1E" stroke-width="2.5"/><ellipse cx="30" cy="36" rx="15" ry="11" fill="#F1EDE0" stroke="#3B2B1E" stroke-width="2.5"/><path d="M15 36 Q30 47 45 36" fill="#D8D2C0"/><circle cx="41" cy="27" r="8" fill="#F1EDE0" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="43.5" cy="25.5" r="1.5" fill="#3B2B1E"/><circle cx="42.5" cy="24.5" r="0.6" fill="white"/><path d="M48 28 L55 26 L48 31 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="2"/></svg>`};
CHARS.hatden = {name:"Hạt lạ", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="32" rx="10" ry="15" fill="#2B2B2B" stroke="#3B2B1E" stroke-width="2.5" transform="rotate(20 30 32)"/><path d="M26 21 q3 -3 6 0" stroke="#F1EDE0" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`};
CHARS.dua1 = {name:"Quả dưa hấu", svg:`<svg viewBox="0 0 60 60">
    <defs>
      <radialGradient id="duaGrad-dua1" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#3B874B" />
        <stop offset="100%" stop-color="#1F4A28" />
      </radialGradient>
    </defs>
    <ellipse cx="30" cy="49" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
    <circle cx="30" cy="34" r="17" fill="url(#duaGrad-dua1)" stroke="#3B2B1E" stroke-width="2.5"/>
    <path d="M22 20 Q18 32 22 47 M30 17 V51 M38 20 Q42 32 38 47" stroke="#13331A" stroke-width="3" fill="none"/>
    <path d="M30 17 Q33 12 37 12" stroke="#5A7D3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`};
CHARS.dua2 = {name:"Quả dưa hấu", svg:`<svg viewBox="0 0 60 60">
    <defs>
      <radialGradient id="duaGrad-dua2" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#3B874B" />
        <stop offset="100%" stop-color="#1F4A28" />
      </radialGradient>
    </defs>
    <ellipse cx="30" cy="49" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
    <circle cx="30" cy="34" r="17" fill="url(#duaGrad-dua2)" stroke="#3B2B1E" stroke-width="2.5"/>
    <path d="M20 23 Q17 34 21 45 M27 18 Q25 34 28 50 M35 18 Q38 34 34 50 M42 25 Q44 34 41 44" stroke="#13331A" stroke-width="3" fill="none"/>
    <path d="M30 17 Q27 11 23 12" stroke="#5A7D3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`};
CHARS.dua3 = {name:"Quả dưa hấu", svg:`<svg viewBox="0 0 60 60">
    <defs>
      <radialGradient id="duaGrad-dua3" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#3B874B" />
        <stop offset="100%" stop-color="#1F4A28" />
      </radialGradient>
    </defs>
    <ellipse cx="30" cy="49" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>
    <circle cx="30" cy="34" r="17" fill="url(#duaGrad-dua3)" stroke="#3B2B1E" stroke-width="2.5"/>
    <path d="M24 19 Q19 34 26 48 M34 18 Q38 34 33 50" stroke="#13331A" stroke-width="3" fill="none"/>
    <path d="M30 17 Q31 11 30 8" stroke="#5A7D3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`};
CHARS.duathu = {name:"Dưa khắc tên", svg:`<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="17" fill="#2F6B3C" stroke="#3B2B1E" stroke-width="2.5"/><path d="M22 20 Q20 32 22 47 M38 20 Q40 32 38 47" stroke="#1F4A28" stroke-width="3" fill="none"/><path d="M24 30 h12 M24 37 h12" stroke="#F1EDE0" stroke-width="2.5" stroke-linecap="round"/><path d="M30 17 Q33 12 37 12" stroke="#5A7D3C" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`};

ENVS.leu = {name:"lều tranh", svg:`<svg viewBox="0 0 60 60"><path d="M8 46 L30 14 L52 46 Z" fill="#C9B27C" stroke="#5A5037" stroke-width="3"/><path d="M14 46 L30 22 L46 46" stroke="#8A6E52" stroke-width="2" fill="none"/><rect x="25" y="34" width="10" height="12" fill="#5C4030" stroke="#5A5037" stroke-width="2"/></svg>`};
ENVS.thuyen = {name:"thuyền", water:true, svg:`<svg viewBox="0 0 60 60"><path d="M10 38 Q30 46 50 38 L44 50 Q30 54 16 50 Z" fill="#8A6E52" stroke="#3E3124" stroke-width="2.5"/><path d="M30 8 V38" stroke="#3E3124" stroke-width="2.5"/><path d="M30 10 Q46 18 30 30 Z" fill="#C9B27C" stroke="#3E3124" stroke-width="2"/></svg>`};

PLACES.baida  = {name:"Bãi đá", svg:ENVS.tangda.svg};
PLACES.rungcay= {name:"Rừng cây", svg:ENVS.tre.svg};
PLACES.suoi   = {name:"Suối", svg:ENVS.ao.svg};

LORE.leu = "lều tranh dựng bằng hai bàn tay trắng";
LORE.thuyen = "cánh buồm nâu — tin từ đất liền";

RELICS.hatdua = {name:"Hạt dưa đen", lore:"chim trắng thả xuống — cả một mùa vàng bắt đầu", svg:CHARS.hatden.svg};

/* ===== Chương 8 · Chú Cuội ===== */
CHARS.cuoi = {name:"Chú Cuội", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-cuoi" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-cuoi" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8A6E52" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#8A6E52" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-cuoi)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-cuoi)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Búi tó nam giới -->
<circle cx="30" cy="6" r="4.5" fill="#3B2B1E"/>
<!-- Mái vén -->
<path d="M 17 21 A 13 13 0 0 1 43 21 Q 30 14 17 21 Z" fill="#3B2B1E"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 28 Q30 26 34 28" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><path d="M40 30 L40 52" stroke="#5C4030" stroke-width="2.5"/><path d="M36 24 L44 32 L40 32 Z" fill="#9AA5A8" stroke="#3B2B1E" stroke-width="1.5"/>
  </g>
</svg>`};
CHARS.cogai = {name:"Cô gái", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-cogai" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-cogai" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6B8E9E" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#6B8E9E" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#6B8E9E" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-cogai)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-cogai)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><path d="M42 14 Q46 18 45 24" stroke="#3B2B1E" stroke-width="3" fill="none" stroke-linecap="round"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M22 32 Q30 40 38 32" fill="none" stroke="#F7F1E0" stroke-width="2"/>
  </g>
</svg>`};
CHARS.vocuoi = {name:"Vợ Cuội", svg:`<svg viewBox="0 0 60 60">
  <defs>
    <radialGradient id="headGrad-vocuoi" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF0D4" />
      <stop offset="100%" stop-color="#F3D8B2" />
    </radialGradient>
    <linearGradient id="bodyGrad-vocuoi" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6B8E9E" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>
  <!-- Bóng đổ dưới chân -->
  <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
  
  <g>
    <!-- Thân chính -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#6B8E9E" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#6B8E9E" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Phủ khối sáng tối cho thân -->
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad-vocuoi)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />

    <!-- Đầu (Dùng Gradient) -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad-vocuoi)" stroke="#3B2B1E" stroke-width="2.5"/>
    
    <!-- Tóc / Phụ kiện -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><path d="M42 14 Q46 18 45 24" stroke="#3B2B1E" stroke-width="3" fill="none" stroke-linecap="round"/>
    
    <!-- Mắt và điểm sáng -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/>
    <circle cx="33.5" cy="20" r="0.6" fill="white"/>
    
    <!-- Miệng và Extra (Má hồng sẽ truyền vào đây) -->
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><path d="M22 38 Q30 46 38 38" fill="none" stroke="#F7F1E0" stroke-width="3"/>
  </g>
</svg>`};   /* cùng một người — cô gái được cứu năm xưa */
CHARS.ho = {name:"Hổ mẹ", svg:`<svg viewBox="0 0 60 60"><ellipse cx="32" cy="46" rx="18" ry="4" fill="rgba(0,0,0,0.2)"/><path d="M22 45 L21 52 M30 45 L29 52 M40 45 L41 52 M48 45 L49 52" stroke="#3B2B1E" stroke-width="3" stroke-linecap="round"/><ellipse cx="32" cy="38" rx="18" ry="12" fill="#D98E3A" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="14" cy="30" r="9" fill="#D98E3A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M8 24 L6 18 L12 22 M20 24 L22 18 L16 22" fill="#D98E3A" stroke="#3B2B1E" stroke-width="2"/><circle cx="11" cy="29" r="1.5" fill="#3B2B1E"/><circle cx="17" cy="29" r="1.5" fill="#3B2B1E"/><path d="M11 34 q3 3 6 0" stroke="#3B2B1E" stroke-width="1.5" fill="none"/><path d="M26 28 v8 M33 27 v10 M40 28 v8 M46 31 v6" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/><path d="M49 32 Q57 34 54 43" stroke="#3B2B1E" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`};
CHARS.hocon = {name:"Hổ con", svg:`<svg viewBox="0 0 60 60"><ellipse cx="32" cy="48" rx="13" ry="4" fill="rgba(0,0,0,0.2)"/><path d="M24 45 L23 52 M30 45 L29 52 M38 45 L39 52 M44 45 L45 52" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/><ellipse cx="32" cy="42" rx="13" ry="8" fill="#E3A75A" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="18" cy="36" r="7" fill="#E3A75A" stroke="#3B2B1E" stroke-width="2.5"/><path d="M13 31 L11 26 L16 29 M23 31 L25 26 L20 29" fill="#E3A75A" stroke="#3B2B1E" stroke-width="1.8"/><circle cx="16" cy="35" r="1.2" fill="#3B2B1E"/><circle cx="20" cy="35" r="1.2" fill="#3B2B1E"/><path d="M28 36 v6 M34 35 v7 M40 37 v5" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/></svg>`};
CHARS.cho = {name:"Chó vàng", svg:`<svg viewBox="0 0 60 60"><ellipse cx="30" cy="46" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/><ellipse cx="30" cy="40" rx="15" ry="9" fill="#C9A227" stroke="#3B2B1E" stroke-width="2.5"/><circle cx="15" cy="32" r="8" fill="#C9A227" stroke="#3B2B1E" stroke-width="2.5"/><path d="M9 26 Q7 20 12 22 L14 26 M21 26 Q23 20 18 22" fill="#A9825B" stroke="#3B2B1E" stroke-width="2"/><circle cx="13" cy="31" r="1.4" fill="#3B2B1E"/><circle cx="12" cy="35" r="2" fill="#3B2B1E"/><path d="M44 36 Q52 30 50 24" stroke="#C9A227" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M22 46 L21 52 M30 46 L29 52 M38 46 L39 52" stroke="#3B2B1E" stroke-width="2.5" stroke-linecap="round"/></svg>`};
CHARS.chihang = {name:"Chị Hằng", svg:`<svg viewBox="0 0 60 60">
    <ellipse cx="30" cy="56" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
    <!-- Dải lụa bay phía sau -->
    <path d="M 8 45 C -2 30, 15 5, 30 20 C 45 5, 62 30, 52 45" fill="none" stroke="#F7F1E0" stroke-width="4.5" opacity="0.8" stroke-linecap="round"/>
    <!-- Body -->
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="#F1EDE0" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="#F1EDE0" stroke="#3B2B1E" stroke-width="2.5"/>
    <rect x="18" y="32" width="24" height="20" rx="9" fill="url(#bodyGrad)" opacity="0.4"/>
    <ellipse cx="30" cy="52" rx="16" ry="6" fill="rgba(0,0,0,0.15)" />
    <!-- Head -->
    <circle cx="30" cy="21" r="13" fill="url(#headGrad)" stroke="#3B2B1E" stroke-width="2.5"/>
    <!-- Hair -->
    <!-- Tóc xõa 2 bên vai -->
    <path d="M 17 21 C 10 30, 10 45, 18 48 C 18 40, 17 30, 17 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <path d="M 43 21 C 50 30, 50 45, 42 48 C 42 40, 43 30, 43 21 Z" fill="#3B2B1E" stroke="#3B2B1E" stroke-width="1"/>
    <!-- Mái chẻ ngôi -->
    <path d="M 17 21 A 13 13 0 0 1 43 21 C 38 14, 32 14, 30 18 C 28 14, 22 14, 17 21 Z" fill="#3B2B1E"/><path d="M38 6 Q44 8 42 14 Q38 12 38 6 Z" fill="#E3A72F" stroke="#3B2B1E" stroke-width="1.5"/>
    <!-- Face -->
    <circle cx="25.5" cy="21" r="1.8" fill="#3B2B1E"/><circle cx="34.5" cy="21" r="1.8" fill="#3B2B1E"/>
    <circle cx="24.5" cy="20" r="0.6" fill="white"/><circle cx="33.5" cy="20" r="0.6" fill="white"/>
    <path d="M26 27 Q30 30 34 27" fill="none" stroke="#3B2B1E" stroke-width="2" stroke-linecap="round"/>
    <!-- Cheeks -->
    <circle cx="24" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/><circle cx="36" cy="24" r="2.5" fill="#FF7F7F" opacity="0.5"/>
  </svg>`};

ENVS.caythuoc = {name:"cây thuốc quý", svg:`<svg viewBox="0 0 60 60"><rect x="27" y="36" width="6" height="16" fill="#8A6E52" stroke="#314E28" stroke-width="2.5"/><path d="M30 36 Q18 30 16 18 Q28 20 30 30 Q32 18 44 16 Q42 30 30 36 Z" fill="#6FAF5A" stroke="#314E28" stroke-width="2.5"/><path d="M22 10 l2 4 M40 8 l-2 4 M30 6 v4" stroke="#E3A72F" stroke-width="2" stroke-linecap="round"/></svg>`};
LORE.caythuoc = "lá cải tử hoàn sinh — tưới nước TRONG thôi đấy!";

PLACES.giengp = {name:"Giếng làng", svg:`<svg viewBox="0 0 60 60"><path d="M15 30 L30 15 L45 30" fill="#8A6E52" stroke="#5C4030" stroke-width="2.5" stroke-linejoin="round"/><circle cx="30" cy="36" r="14" fill="#7FB3C8" stroke="#3A444C" stroke-width="4"/><circle cx="30" cy="36" r="10" fill="#3A7CA5"/></svg>`};
PLACES.caythuocp = {name:"Gốc cây thuốc", svg:ENVS.caythuoc.svg};

RELICS.lathuoc = {name:"Lá thuốc thần", lore:"cải tử hoàn sinh — chỉ mọc trên một cây duy nhất", svg:`<svg viewBox="0 0 60 60"><path d="M30 50 Q14 38 16 20 Q30 24 32 38 Q34 22 46 14 Q48 34 30 50 Z" fill="#6FAF5A" stroke="#3E6E34" stroke-width="2.5"/><path d="M30 48 Q28 34 24 26" stroke="#3E6E34" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`};

/* Dây trầu — nàng Lưu hoá thân, quấn quanh thân cau */
ENVS.daytrau = {name:"dây trầu", svg:`<svg viewBox="0 0 60 60"><path d="M30 54 Q28 34 30 14" stroke="#5A7D3C" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M30 44 Q18 40 16 28 Q28 30 30 44 Z" fill="#5A7D3C" stroke="#28381B" stroke-width="2"/><path d="M30 32 Q42 28 44 16 Q32 18 30 32 Z" fill="#6B8F47" stroke="#28381B" stroke-width="2"/><path d="M30 20 Q20 16 19 8 Q29 10 30 20 Z" fill="#5A7D3C" stroke="#28381B" stroke-width="2"/></svg>`};
LORE.daytrau = "lá xanh mướt, quấn chặt lấy thân cau — chẳng rời nửa bước";

/* ============================================================
   Tách hình cho các địa điểm từng dùng chung một bức.
   Trước đây "Bờ ao / Sông biển / Suối" cùng một hình nước, "Biên ải / Rừng núi"
   cùng một hình núi… — đặt hai cột như thế vào cùng một màn ma trận là trẻ
   nhìn thấy hai bức giống hệt nhau, không phân biệt được.
   ============================================================ */

/* --- Nước: bờ ao / sông biển / suối --- */
PLACES.boao = {name:"Bờ ao", svg:`<svg viewBox="0 0 60 60"><rect x="0" y="26" width="60" height="34" fill="#9CC6D6"/><rect x="0" y="20" width="60" height="8" fill="#8FB06A" stroke="#39505A" stroke-width="2"/><path d="M8 38 Q16 33 24 38 M30 48 Q38 43 46 48" stroke="#F1F7F5" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="46" cy="34" r="5" fill="#DE7BA4" stroke="#39505A" stroke-width="2"/></svg>`};
PLACES.songbien = {name:"Sông biển", svg:`<svg viewBox="0 0 60 60"><rect x="0" y="18" width="60" height="42" fill="#7FB3C8"/><path d="M0 30 Q10 24 20 30 T40 30 T60 30 M0 42 Q10 36 20 42 T40 42 T60 42 M0 53 Q10 47 20 53 T40 53 T60 53" stroke="#F1F7F5" stroke-width="2.5" fill="none"/><path d="M34 8 L34 24 L48 24 Z" fill="#F7F1E0" stroke="#39505A" stroke-width="2.5"/><path d="M34 8 V26" stroke="#39505A" stroke-width="2.5"/></svg>`};
PLACES.suoi = {name:"Suối", svg:`<svg viewBox="0 0 60 60"><path d="M22 0 Q34 16 20 30 Q6 44 26 60 L40 60 Q22 44 34 30 Q48 16 36 0 Z" fill="#7FB3C8" stroke="#39505A" stroke-width="2"/><circle cx="10" cy="16" r="6" fill="#9AA5A8" stroke="#39505A" stroke-width="2"/><circle cx="50" cy="38" r="7" fill="#9AA5A8" stroke="#39505A" stroke-width="2"/><circle cx="46" cy="12" r="4.5" fill="#9AA5A8" stroke="#39505A" stroke-width="2"/></svg>`};

/* --- Núi: biên ải (có luỹ chắn) / rừng núi (có cây) --- */
PLACES.bienai = {name:"Biên ải", svg:`<svg viewBox="0 0 60 60"><path d="M5 45 L15 20 L25 45 M35 45 L45 20 L55 45 M15 45 L30 10 L45 45" fill="#5C6670" stroke="#3A444C" stroke-width="2.5" stroke-linejoin="round"/><rect x="25" y="35" width="10" height="10" fill="#E8D9C0" stroke="#8A6E52" stroke-width="2"/><path d="M30 35 V45" stroke="#8A6E52" stroke-width="2"/></svg>`};
PLACES.rungnui = {name:"Rừng núi", svg:`<svg viewBox="0 0 60 60"><path d="M5 45 L15 25 L25 45 M35 45 L45 25 L55 45" fill="#5A7D3C" stroke="#3E6257" stroke-width="2.5" stroke-linejoin="round"/><path d="M15 45 L30 15 L45 45" fill="#4E7038" stroke="#2E4A35" stroke-width="2.5" stroke-linejoin="round"/></svg>`};

/* --- Nhà: sân nhà (có rào) / nhà trên (giữ hình mái nhà) / làng Phù Đổng (cụm mái) --- */
PLACES.san = {name:"Sân nhà", svg:`<svg viewBox="0 0 60 60"><rect x="0" y="34" width="60" height="26" fill="#E9D9A8"/><path d="M4 34 Q30 26 56 34" stroke="#C89B62" stroke-width="2" fill="none"/><path d="M0 20 L14 8 L28 20 L28 34 L0 34 Z" fill="#C8452A" stroke="#68614B" stroke-width="2.5"/><path d="M36 54 V40 M44 54 V40 M52 54 V40 M32 44 H56" stroke="#8A6E52" stroke-width="3" stroke-linecap="round"/></svg>`};
PLACES.langpd = {name:"Làng Phù Đổng", svg:`<svg viewBox="0 0 60 60"><path d="M2 30 L14 18 L26 30 L26 44 L2 44 Z" fill="#C8452A" stroke="#5A1F12" stroke-width="2.5"/><path d="M30 38 L40 28 L50 38 L50 50 L30 50 Z" fill="#C9B27C" stroke="#5A1F12" stroke-width="2.5"/><path d="M34 16 L44 6 L54 16 L54 26 L34 26 Z" fill="#E3A72F" stroke="#5A1F12" stroke-width="2.5"/><path d="M0 52 Q30 46 60 52" stroke="#5A7D3C" stroke-width="3.5" fill="none"/></svg>`};

/* --- Ruộng đồng: ngoài đồng (lúa) / ruộng bùn (nước đục) / đồng bằng (trải rộng) --- */
PLACES.dong = {name:"Ngoài đồng", svg:`<svg viewBox="0 0 60 60"><rect x="0" y="24" width="60" height="36" fill="#8FB06A" stroke="#404F2F" stroke-width="2.5"/><path d="M8 32 V54 M18 30 V56 M28 32 V54 M38 30 V56 M48 32 V54" stroke="#5A7D3C" stroke-width="3.5" stroke-linecap="round"/><circle cx="48" cy="12" r="7" fill="#E3A72F" stroke="#404F2F" stroke-width="2.5"/></svg>`};
PLACES.ruongbun = {name:"Ruộng", svg:`<svg viewBox="0 0 60 60"><rect x="0" y="26" width="60" height="34" fill="#A98055" stroke="#564530" stroke-width="2.5"/><path d="M0 38 H60 M0 50 H60" stroke="#8F6A42" stroke-width="3"/><ellipse cx="16" cy="32" rx="7" ry="3" fill="#C09A6C"/><ellipse cx="42" cy="44" rx="8" ry="3.5" fill="#C09A6C"/><path d="M10 22 V16 M22 22 V14 M34 22 V17" stroke="#5A7D3C" stroke-width="3" stroke-linecap="round"/></svg>`};
PLACES.dongbang = {name:"Đồng bằng", svg:`<svg viewBox="0 0 60 60"><rect x="0" y="30" width="60" height="30" fill="#C9D6A3"/><path d="M0 30 Q15 24 30 30 T60 30" fill="#8FB06A" stroke="#5A6049" stroke-width="2"/><path d="M0 44 Q20 40 40 44 T60 42" stroke="#8FB06A" stroke-width="2.5" fill="none"/><path d="M6 56 Q10 50 14 56 M24 58 Q28 52 32 58 M44 56 Q48 50 52 56" fill="#5A7D3C" stroke="#5A6049" stroke-width="1.5"/><circle cx="12" cy="14" r="6" fill="#F1E6C8" stroke="#5A6049" stroke-width="2"/></svg>`};

/* ĐIỂM NHẤN: chỉ vẽ ở Ô ĐẦU TIÊN của vùng (xem renderBoard trong ui.js).
   Ao trải 10 ô mà ô nào cũng có bông súng thì thành 10 bông — nên tách ra đây. */
ENVS.ao.diem = '<circle cx="44" cy="18" r="6" fill="#DE7BA4" stroke="#39505A" stroke-width="2"/>';
ENVS.baico.diem = '<circle cx="46" cy="16" r="6" fill="#F1E6C8" stroke="#28381B" stroke-width="2"/>';
/* Cột ma trận chỉ hiện MỘT lần nên giữ nguyên cả điểm nhấn trong nền */
PLACES.baico = {name:"Bãi cỏ", svg:ENVS.baico.svg.replace("</svg>", '<circle cx="46" cy="16" r="6" fill="#F1E6C8" stroke="#28381B" stroke-width="2"/></svg>')};
