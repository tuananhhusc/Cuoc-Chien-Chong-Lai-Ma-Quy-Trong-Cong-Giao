# Chống Ma Quỷ Theo Công Giáo - Báo Cáo Nghiên Cứu Chuyên Sâu

Dự án này là một ứng dụng web hiện đại, được xây dựng bằng **Next.js**, nhằm trình bày báo cáo nghiên cứu thần học và giáo luật về thực tại cuộc chiến tâm linh trong truyền thống Công giáo. Trang web được thiết kế với phong cách học thuật cao cấp, ưu tiên trải nghiệm đọc và tính lưu trữ.

## 🌟 Tính năng nổi bật

### 1. Trải nghiệm đọc học thuật
- **Thiết kế Typography tối ưu**: Sử dụng phông chữ *EB Garamond* cho tiêu đề và *Lora* cho nội dung, tối ưu hóa hiển thị tiếng Việt và mang lại cảm giác như đang đọc một cuốn sách thực thụ.
- **Reading Progress Bar**: Thanh tiến trình chạy dọc đỉnh trang giúp người đọc theo dõi vị trí hiện tại trong bài viết.
- **Ước tính thời gian đọc**: Tự động tính toán thời gian cần thiết để hoàn thành bài báo cáo.
- **Back to Top**: Nút điều hướng nhanh về đầu trang khi cuộn xuống sâu.

### 2. Chế độ tối "Sacred Dark"
- Giao diện tối được thiết kế riêng với tông màu xanh đen sâu (Deep Abyss Navy), giảm mỏi mắt nhưng vẫn giữ được sự trang trọng.
- Chuyển đổi linh hoạt giữa giao diện Sáng/Tối và ghi nhớ lựa chọn của người dùng qua `localStorage`.

### 3. Hệ thống Trích dẫn & Mục lục Thông minh
- **Mục lục động (Auto TOC)**: Tự động tạo mục lục từ nội dung Markdown, hỗ trợ cuộn mượt và đánh dấu phần đang đọc.
- **Citations Popover**: Nhấn vào số trích dẫn để xem nguồn tham khảo ngay lập tức qua một cửa sổ nhỏ (popover) mà không cần cuộn trang.
- **Hệ thống dẫn nguồn hai chiều**: Cho phép nhảy từ văn bản xuống phần tài liệu tham khảo và ngược lại một cách chính xác.

### 4. Công nghệ & Hiệu suất
- **Next.js App Router**: Sử dụng kiến trúc mới nhất của Next.js cho hiệu suất vượt trội và SEO tốt hơn.
- **Tailwind CSS & Modern CSS**: Kết hợp linh hoạt giữa utility-first và các biến CSS nâng cao (CSS Variables) để quản lý theme.
- **Tối ưu hóa In ấn**: Chế độ `@media print` được thiết kế đặc biệt để xuất bản báo cáo ra PDF/giấy sạch sẽ, loại bỏ mọi yếu tố thừa của trang web.

## 🛠 Công nghệ sử dụng

- **Frontend**: [Next.js 15+](https://nextjs.org/), React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Variables, Lucide React (Icons)
- **Content Parsing**: Markdown-to-TS logic (Tailwind typography-like custom engine)
- **Fonts**: Google Fonts (EB Garamond, Lora, Be Vietnam Pro) thông qua `next/font`

## 🚀 Hướng dẫn cài đặt & Chạy dự án

1. **Clone repository:**
   ```bash
   git clone [url-dan-den-repo]
   cd chonglaimaquy
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy ở chế độ phát triển (Development):**
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

4. **Xây dựng bản sản xuất (Production build):**
   ```bash
   npm run build
   npm start
   ```

## 📋 Cấu trúc thư mục chính

- `/app`: Chứa layout, trang chính và các cấu hình global.
- `/components`: Các thành phần giao diện tái sử dụng (TOC, Footnotes, ProgressBar, v.v.).
- `/lib`: Chứa các hàm xử lý logic (Parse article, calculate reading time).
- `/data`: Chứa nội dung bài viết và dữ liệu trích dẫn.
- `/public`: Chứa các tài sản tĩnh (images, favicon, v.v.).

## 📝 Giấy phép

Dự án này được thiết kế cho mục đích lưu trữ và báo cáo nghiên cứu thần học chuyên sâu. Mọi quyền về nội dung thuộc về tác giả của báo cáo.

---
*© 2026 Chống Ma Quỷ Theo Công Giáo*
