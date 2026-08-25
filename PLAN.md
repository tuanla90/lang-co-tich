# Làng Cổ Tích — Kế hoạch tính năng

Trạng thái: mùa 1 hoàn chỉnh (8 chương, 71 màn, save, chọn chương, đọc to, âm thanh, di vật, hội làng đang làm).

Nguyên tắc xuyên suốt: mỗi giai đoạn kết thúc bằng một **phép thử thật** — đưa cho một đứa trẻ chơi mà không giải thích gì.

---

## Giai đoạn A — Sẵn sàng cho trẻ chơi thật (1–2 tuần)

Mục tiêu: một đứa trẻ 6–9 tuổi cầm máy tự chơi 15 phút không cần người lớn.

1. **Màn hình mở đầu** — logo + nút "Chơi" to. Hiện tại game nhảy thẳng vào màn 1,
   không có khoảnh khắc "bắt đầu". Kèm chọn: tiếp tục / chơi lại.
2. **Hướng dẫn chạm lần đầu** — bàn tay chỉ vào Tấm rồi chỉ vào ô (animation CSS,
   chỉ hiện ở màn 1 khi chưa có save). Chữ hướng dẫn hiện tại trẻ chưa đọc thạo sẽ bỏ qua.
3. **Tem truyện** — xong mỗi chương tặng 1 con tem Đông Hồ vào Túi đồ (ngăn thứ hai).
   Phần thưởng đúng triết lý không-điểm-số. Art: 8 tem = 8 chân dung đã có, đóng khung tem.
4. **Hoàn thiện Hội làng** (hoilang.js — đang làm dở) — màn crossover cuối mùa.
5. **Polish nhỏ**: hiệu ứng thắng màn (lá tre rơi?), transition chuyển màn,
   đèn sáng dần khi gần xong (3/4 chip xanh → viền bàn ấm lên).
6. **QA thiết bị thật**: điện thoại Android tầm trung, tablet, touch — đặc biệt
   kích thước ô bấm với ngón tay trẻ em.

**Phép thử A**: 2–3 trẻ (con cháu người quen) chơi, người lớn chỉ quan sát + ghi chú:
kẹt ở đâu, bỏ ở màn nào, có đòi chơi tiếp không. Đây là dữ liệu quý nhất dự án.

---

## Giai đoạn B — Phát hành nhỏ (2–4 tuần sau phép thử A)

Mục tiêu: người lạ chơi được, có kênh phản hồi.

1. **Deploy web** — GitHub Pages / Cloudflare Pages (game đã là static thuần).
   Tên miền nếu muốn nghiêm túc.
2. **PWA** — manifest + service worker: cài lên màn hình chính, chơi offline.
   Rẻ (game đã chạy file://), biến web thành "app" trong mắt phụ huynh.
3. **Sửa theo phản hồi phép thử A** — dự kiến sẽ lộ: màn quá khó/quá dễ,
   chữ nhiều quá ở đâu, luật nào cần dạy lại.
4. **Trang giới thiệu cho phụ huynh** — 1 trang: game dạy gì (suy luận, đọc,
   văn hoá dân gian), không quảng cáo, không thu thập dữ liệu.
5. **Analytics tối giản, tự host hoặc không có** — nếu cần thì đếm ẩn danh
   màn hoàn thành để biết chỗ trẻ bỏ cuộc. Không SDK bên thứ ba.

**Phép thử B**: đăng nhóm phụ huynh / bạn bè FB, xem 20–50 lượt chơi đầu.

---

## Giai đoạn C — Chiều sâu (chọn MỘT, sau khi B có tín hiệu)

Ba hướng, không làm song song:

- **C1. Câu đố mỗi ngày** (đặt cược lớn nhất, kế hoạch từ đầu dự án):
  bộ sinh đề từ từ vựng đã mở khoá + solver đếm lời giải làm thước độ khó
  (nền tảng có sẵn: audit.js đã đo độ chặt). Mô hình Wordle: mỗi ngày một đề,
  cả nhà cùng giải, chia sẻ kết quả. Đây là engine giữ chân + lan truyền.
- **C2. Bảng kỹ năng phụ huynh** ⬆ **ĐÃ NÂNG ƯU TIÊN — bắt đầu ngay sau phép thử A**
  (quyết định 2026-08: đây là tính năng bán hàng cốt lõi cho thị trường toán tư duy).
  Lộ trình 2 bước:
  1. *Gắn nhãn trước (làm dần từ bây giờ)* — thêm trường `skills:[...]` vào từng màn.
     Bộ nhãn chốt 5 loại:
     - `suyluan`  — loại trừ, đối chiếu manh mối (ma trận, nói ngược)
     - `khonggian`— vị trí, hướng, sau lưng, kề/cách (bàn cờ, tường)
     - `dochieu`  — đọc lời dẫn/chip để rút ra luật (nghe lén, lời Cuội)
     - `ghinho`   — nhớ chi tiết truyện, ghép trình tự (màn story)
     - `kehoach`  — xếp nhiều ràng buộc chồng nhau, thử-sai có tính toán (chain, đoàn rước)
     Một màn 1–3 nhãn. Nhãn nằm sẵn trong dữ liệu → màn mới nào cũng gắn ngay từ đầu.
  2. *Màn hình phụ huynh* — tổng hợp từ save: mỗi kỹ năng đếm màn đã qua /
     số lần reset / thời gian trung bình (cần ghi thêm 2 số này vào save),
     hiển thị "bé mạnh gì, đang tập gì" bằng lời — KHÔNG chấm điểm con số.
- **C3. Mùa 2 — Bến tàu năm châu**: Grimm/Andersen theo khung thuyền buôn
  ghé bến (đã thiết kế: PD sạch, tránh tạo hình Disney, art Đông Hồ,
  không trộn nhân vật hai thế giới ngoài bến tàu).

Chọn theo tín hiệu từ B: người chơi quay lại ít → C1; phụ huynh hỏi "học được gì"
nhiều → C2; trẻ chơi hết sạch nội dung → C3.

---

## Không làm (đã cân nhắc và gác lại)

- Điểm số, sao, bảng xếp hạng — trái triết lý, tạo áp lực sai kiểu.
- Tài khoản / đăng nhập — localStorage đủ cho giai đoạn này.
- Quảng cáo — không bao giờ với game trẻ em.
- Mua trong app — nếu kiếm tiền thì bán một lần (mùa 2) hoặc bản premium,
  quyết sau khi C có dữ liệu.
- Chuyển engine (Godot/Unity) — web thuần đang là lợi thế, không phải nợ.
