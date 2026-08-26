# Làng Cổ Tích — Kế hoạch tính năng

Trạng thái: mùa 1 hoàn chỉnh (8 chương, 71 màn, save, chọn chương, đọc to, âm thanh,
di vật, màn hình mở đầu, bàn tay hướng dẫn; hội làng đang làm).

Nguyên tắc xuyên suốt: mỗi giai đoạn kết thúc bằng một **phép thử thật** — đưa cho
một đứa trẻ chơi mà không giải thích gì.

---

## Giai đoạn A — Sẵn sàng cho trẻ chơi thật (1–2 tuần)

Mục tiêu: một đứa trẻ 6–9 tuổi cầm máy tự chơi 15 phút không cần người lớn.

1. ~~**Màn hình mở đầu**~~ ✅ (4da7bc3) — logo, parade nhân vật, Chơi tiếp / Chơi lại.
2. ~~**Hướng dẫn chạm lần đầu**~~ ✅ (4da7bc3) — bàn tay 👆 khay → ô đích, chỉ màn 1 chưa save.
3. ~~**Bộ ghi lượt chơi (telemetry cục bộ)**~~ ✅ (571602e) — lct_log + nút 💡 chỉ sáng khi bí.
4. ~~**Gắn nhãn `skills` + `tier`**~~ ✅ — js/skills.js: heuristic theo loại màn + 31 override
   tay; mọi màn (kể cả sinh máy, kể cả thêm sau) luôn có nhãn mặc định hợp lý.
5. ~~**Đổi lời khen sang khen quá trình**~~ ✅ — mảng PRAISE 7 câu xoay vòng, hết "Giỏi quá!".
6. ~~**Tem truyện**~~ ✅ — tem suy ra từ save (xong trọn chương), trao trong hộp thắng, trưng ngăn hai Túi đồ; hội làng không tem.
7. **Hoàn thiện Hội làng** (hoilang.js — đang làm dở).
8. **Polish nhỏ**: hiệu ứng thắng, transition chuyển màn, viền bàn ấm lên khi gần xong.
9. **QA thiết bị thật**: Android tầm trung, tablet — kích thước ô bấm với ngón tay trẻ.

**Phép thử A**: 2–3 trẻ chơi, người lớn chỉ quan sát + ghi chú; telemetry ghi song song.

---

## Giai đoạn B — Phát hành nhỏ (2–4 tuần sau phép thử A)

1. **Deploy web** — GitHub Pages / Cloudflare Pages (game đã static thuần).
2. **PWA** — manifest + service worker: cài màn hình chính, chơi offline.
3. **Sửa theo phản hồi phép thử A.**
4. **Trang giới thiệu cho phụ huynh** — game dạy gì, không quảng cáo, không thu thập dữ liệu.
5. **Analytics tối giản tự host hoặc không có** — không SDK bên thứ ba.

**Phép thử B**: nhóm phụ huynh quen, 20–50 lượt chơi đầu.

---

## C2 — Bảng kỹ năng phụ huynh (ưu tiên cao, thiết kế đã chốt 2026-08)

Tính năng bán hàng cốt lõi cho thị trường toán tư duy. Ba khối:

### C2.1 Đo cái gì (chốt sau thảo luận về đo lường trẻ em)

**Nguyên tắc:** tốc độ KHÔNG làm điểm (chậm = đang nghĩ kỹ / đọc chậm / bị gọi đi ăn cơm;
chỉ lưu bucket nhanh-vừa-lâu để nhìn xu hướng). "Sai" phải tách loại: thử-rồi-sửa là
học chính đáng, không trừ.

Tín hiệu dùng thật, theo độ mạnh:
| Tín hiệu | Nghĩa |
|---|---|
| Cùng MỘT chip đỏ lặp ≥3 lần | Không học được từ phản hồi — tín hiệu "bí" tốt nhất |
| Bỏ dở màn (vào rồi thoát) | Vật lộn mạnh nhất |
| Số lần bấm Xếp lại | Bế tắc toàn cục |
| Thắng "sạch" (không đỏ lần nào) | Thành thạo |
| Chạm chip xem gợi ý | KHÔNG trừ — biết tìm trợ giúp là điểm cộng, đếm riêng |

**Bản ghi mỗi lượt chơi** (vào localStorage, cạnh lct_save):
`{levelId, ts, resets, redMaxRepeat, redTotal, hintTaps, clean, timeBucket, finished}`

**Tổng hợp:** gộp theo kỹ năng → 3 mức BẰNG LỜI: *Đang làm quen → Đang tiến bộ → Vững*
+ mũi tên xu hướng. "Vững" đòi thắng sạch ở màn tier ≥ 2. CHỈ so bé với chính bé —
không có chuẩn tuổi, không giả vờ có ("đây là quan sát, không phải chẩn đoán" ghi rõ
trên màn hình phụ huynh). Không con số nào lộ ra cho bé.

### C2.2 Gắn cờ màn

```js
skills: ["khonggian","dochieu"],  // 1–3 nhãn; PHẦN TỬ ĐẦU = kỹ năng chính
tier: 2                           // 1 làm quen · 2 vận dụng · 3 thử thách
```
- Quy kết: nhãn chính trọng số đủ, nhãn phụ một nửa.
- Bộ 5 nhãn: `suyluan` (loại trừ, ma trận, nói ngược) · `khonggian` (vị trí, hướng,
  sau lưng, tường) · `dochieu` (đọc để rút luật) · `ghinho` (màn story, trình tự) ·
  `kehoach` (chain, nhiều ràng buộc chồng).
- Tier KHÔNG chấm tay chay: audit.js đo độ chặt + số ràng buộc + luật mới → gợi ý,
  người duyệt lại. Trọng số ×tier chỉ dùng nội bộ, không bao giờ hiển thị.

### C2.3 Màn hình phụ huynh — ✅ bản 1 đã chạy

"👪 Góc cha mẹ" trong Túi đồ: 5 dòng kỹ năng mức bằng lời (· / ● / ●● / ●●●),
hint được khen là thói quen tốt, mục "gợi ý cùng chơi" nêu màn bé đang vướng,
disclaimer "quan sát, không phải chẩn đoán". Bản sau: xu hướng theo tuần khi đủ dữ liệu.

---

## D — Tính năng DẠY (tăng kỹ năng, không chỉ đo) — xếp theo bằng chứng khoa học

1. **"Bé ra đề cho bố mẹ"** ★ đặt cược cao nhất — bé tự đặt nhân vật + chọn ràng buộc,
   đưa máy cho bố mẹ giải. Tạo đề là tầng cao nhất của hiểu; biến game thành hoạt động
   bố-mẹ-con. Engine đủ: bàn cờ + kho ràng buộc + solver kiểm đề giải được.
2. **Ôn ngắt quãng** — vài ngày sau mời lại màn cũ bằng giọng truyện ("Bống nhớ bạn…").
   Cùng nền với C1 Câu đố mỗi ngày.
3. **Trợ giúp mờ dần** — cùng chip đỏ 3 lần MỚI gợi ý, theo bậc: nháy đối tượng →
   nháy ô đích (tái dùng bàn tay A2). Gợi ý sớm quá là hại. Bậc gợi ý bé cần
   = thước trình độ trung thực nhất → tự nuôi ngược C2.
4. **Câu hỏi "vì sao" sau thắng** — mỗi chương 1 lần, 2–3 đáp án bằng tranh.
5. ~~Lời khen quá trình~~ → đã đưa lên A5.
6. **Đọc karaoke** — TTS tô sáng từng từ đang đọc: công cụ tập đọc thật sự.

Thứ tự làm D: 3 (rẻ, nuôi C2) → 1 (killer feature) → 2 → 4 → 6.

## C1 / C3 (giữ nguyên, chọn theo tín hiệu phép thử B)

- **C1. Câu đố mỗi ngày** — bộ sinh đề + solver; nền: audit.js. Chọn nếu người chơi ít quay lại.
- **C3. Mùa 2 — Bến tàu năm châu** — Grimm/Andersen theo khung thuyền buôn ghé bến
  (PD sạch, tránh tạo hình Disney, art Đông Hồ, không trộn nhân vật ngoài bến tàu).
  Chọn nếu trẻ chơi hết sạch nội dung.

---

## Không làm (đã cân nhắc và gác lại)

- Điểm số, sao, bảng xếp hạng — trái triết lý; C2 dùng mức bằng lời, chỉ phụ huynh thấy.
- Chuẩn tuổi / percentile giả — không có dữ liệu chuẩn thì không giả vờ có.
- Tài khoản / đăng nhập — localStorage đủ cho giai đoạn này.
- Quảng cáo — không bao giờ với game trẻ em.
- Mua trong app — nếu kiếm tiền: bán một lần (mùa 2) hoặc premium, quyết sau C.
- Chuyển engine — web thuần đang là lợi thế, không phải nợ.
