# Hướng Dẫn Bảo Trì Dự Án: Chống Ma Quỷ Theo Công Giáo

Tài liệu này cung cấp cái nhìn chi tiết về cấu trúc tệp tin, các thành phần logic và cách thức vận hành của hệ thống để hỗ trợ việc bảo trì và nâng cấp dự án trong tương lai.

## 🏗️ Cấu Trúc Hệ Thống

### 1. Thư mục `/app` (Cấu trúc ứng dụng)
- **`layout.tsx`**: Tệp bố cục chính. Quản lý việc nạp Phông chữ (Google Fonts), cài đặt Metadata SEO, và tích hợp các thành phần toàn cầu như `ReadingProgressBar`, `ThemeToggle`, và `BackToTop`.
- **`page.tsx`**: Trang chủ chính. Thực hiện lấy dữ liệu bài viết (Server-side) và hiển thị bố cục hai cột (Mục lục và Nội dung bài viết).
- **`globals.css`**: Quản lý toàn bộ phong cách của ứng dụng, bao gồm cả biến màu sắc cho Chế độ Sáng/Tối và các quy tắc in ấn (`@media print`).

### 2. Thư mục `/components` (Thành phần giao diện)
Đây là nơi chứa các khối xây dựng của trang web:
- **`TableOfContents.tsx`**: Xử lý logic mục lục động, theo dõi cuộn để đánh dấu phần đang đọc và cung cấp menu cho thiết di động.
- **`ArticleSection.tsx`**: Thành phần render từng phần của bài viết (Tiêu đề, Bảng biểu, DropCaps).
- **`ParagraphWithCitations.tsx`**: Thành phần quan trọng nhất để xử lý văn bản có chứa trích dẫn, quản lý logic mở Popover khi nhấn vào số hiệu trích dẫn.
- **`CitationFootnotes.tsx`**: Hiển thị danh sách tài liệu tham khảo ở cuối trang với tính năng "Quay lại văn bản".
- **`ReadingProgressBar.tsx`** & **`ThemeToggle.tsx`**: Các tiện ích nâng cao trải nghiệm người dùng.
- **`BackToTop.tsx`**: Nút cuộn nhanh lên đầu trang.
- **`Blockquote.tsx`**: Định dạng các đoạn trích dẫn thiêng liêng/học thuật.

### 3. Thư mục `/lib` (Logic xử lý dữ liệu)
- **`parse-article.ts`**: Chứa bộ máy (engine) để chuyển đổi nội dung từ tệp Markdown sang cấu trúc dữ liệu JSON mà React có thể hiểu được.
- **`article-types.ts`**: Định nghĩa các kiểu dữ liệu (TypeScript Interfaces) cho toàn bộ dự án, đảm bảo tính nhất quán của dữ liệu bài viết.
- **`reading-time.ts`**: Chứa logic tính toán thời gian đọc ước tính dựa trên tổng số từ.

### 4. Thư mục `/data` (Nội dung)
- **`article.md`**: Nguồn nội dung duy nhất của bài báo cáo. Mọi thay đổi về nội dung văn bản nên được thực hiện ở đây.
- **`citations.ts`**: Quản lý cơ sở dữ liệu về các nguồn tham khảo, sách và tài liệu được trích dẫn trong bài.

---

## 🛠️ Hướng Dẫn Bảo Trì

### Cách cập nhật nội dung bài viết
Để cập nhật nội dung, bạn chỉ cần chỉnh sửa tệp `/data/article.md`. Hệ thống sẽ tự động tạo lại Mục lục và cập nhật các liên kết trích dẫn tương ứng.

### Cách thêm Trích dẫn mới
1. Mở `/data/citations.ts`.
2. Thêm một đối tượng mới vào mảng `citations` với `id` tiếp theo.
3. Trong tệp `.md`, sử dụng cú pháp `[^id]` để chèn trích dẫn vào văn bản.

### Chỉnh sửa màu sắc giao diện
Tất cả màu sắc được quản lý qua biến CSS trong `app/globals.css`. 
- Để chỉnh giao diện Sáng: Sửa các biến trong khối `:root`.
- Để chỉnh giao diện Tối: Sửa các biến trong khối `[data-theme="dark"]`.

### Tối ưu hóa Bản in
Nếu muốn thay đổi cách trang web hiện ra khi in hoặc xuất PDF, hãy tìm đến phần `@media print` trong tệp `globals.css`.

---

## 🧪 Kiểm Thử & Đảm Bảo Chất Lượng
Dự án sử dụng **Vitest** để kiểm tra logic. Trước khi bàn giao hoặc sau khi sửa logic quan trọng, hãy chạy:
```bash
npm run test:run
```
Các tệp kiểm thử nằm trong thư mục `/test`, tập trung vào việc kiểm tra bộ phân tách Markdown và logic của Mục lục.

---
*Tài liệu này được soạn thảo để đảm bảo tính bền vững và khả năng mở rộng của dự án Chống Ma Quỷ Theo Công Giáo.*
