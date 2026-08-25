/* ============================================================
   sound.js — âm thanh tối giản.
   File wav tái dùng từ hai dự án nhà trồng:
   - cham/dung/sai: tin_hoc (bộ âm giáo dục chạm/đúng/sai)
   - pop/ding: blog2video (tự sinh bằng gen_sfx.py — không dính bản quyền)
   ============================================================ */
const SFX = (() => {
  let on = true;
  try { on = (localStorage.getItem("lct_sound") || "1") === "1"; } catch (e) {}

  const bank = {};
  ["cham", "pop", "dung", "sai", "ding"].forEach(n => {
    const a = new Audio(`assets/sfx/${n}.wav`);
    a.preload = "auto";
    bank[n] = a;
  });

  function play(n) {
    if (!on || !bank[n]) return;
    try {
      const a = bank[n].cloneNode();      // cho phép chồng tiếng khi bấm nhanh
      a.volume = 0.5;
      a.play().catch(() => {});           // autoplay policy: chỉ kêu sau tương tác — các hook đều nằm trong click
    } catch (e) {}
  }
  function toggle() {
    on = !on;
    try { localStorage.setItem("lct_sound", on ? "1" : "0"); } catch (e) {}
    return on;
  }
  return { play, toggle, get on() { return on; } };
})();
