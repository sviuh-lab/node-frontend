A. Tư tưởng kiến trúc:
**geton.vn** là một **Phòng Thí Nghiệm Sản Phẩm (Product Lab)**, được thiết kế để giúp sinh viên biến ý tưởng thành sản phẩm số một cách nhanh chóng và tự động. Triết lý cốt lõi là **"From Idea to Live Product in Minutes"** – tập trung vào việc giảm thiểu mọi rào cản kỹ thuật, cho phép người dùng tập trung vào sáng tạo.

Hệ thống được xây dựng dựa trên 4 nguyên tắc chính:
1.  **Idea-First**: Mọi thứ bắt đầu từ ý tưởng của người dùng, không phải từ code.
2.  **Serverless-Native**: Tận dụng tối đa Firebase và Cloud Run để tối ưu chi phí và giảm gánh nặng vận hành.
3.  **Simplicity**: Kiến trúc đơn giản với một lõi backend (monolith) và một database registry duy nhất để dễ quản lý.
4.  **Ecosystem**: Xây dựng một hệ sinh thái gồm các "công cụ" và "dự án" có thể tái sử dụng và mở rộng.

### Kiến trúc 3 Lớp theo chủ đề "Lab"

1.  **Cổng Ý Tưởng (Idea Gateway)**: Đây là lớp giao diện (tại `geton.vn` hoặc `lab.sviuh.net`), nơi người dùng nhập ý tưởng. AI sẽ phân tích, phân loại và đề xuất hướng đi. Lớp này được triển khai trên Firebase Hosting để tối ưu tốc độ và chi phí.

2.  **Lõi Vận Hành (Platform Core)**: "Bộ não" của hệ thống, là một service monolith chạy trên Google Cloud Run. Nó chịu trách nhiệm xử lý logic chính: quản lý ý tưởng, tạo và quản lý repository trên GitHub, điều phối CI/CD, triển khai dịch vụ và ghi nhận thông tin vào **Registry Database** (Cloud SQL).

3.  **Không Gian Triển Khai (Runtime Space)**: Là nơi các sản phẩm "sống". Môi trường này có hai dạng:
    *   **Tool Apps**: Các ứng dụng đơn giản, không cần backend phức tạp (VD: portfolio, landing page) sẽ được triển khai tức thì trên Firebase Hosting.
    *   **Project Apps**: Các ý tưởng lớn hơn sẽ được cấp một không gian riêng gồm repository GitHub (từ template có sẵn), dịch vụ Cloud Run và subdomain riêng (`*.geton.vn`) để phát triển độc lập.

### Luồng Hoạt Động

1.  **Input**: Người dùng nhập ý tưởng vào **Cổng Ý Tưởng**.
2.  **Analyze**: AI phân tích, xác định `mode` (loại sản phẩm) và các thông số ban đầu.
3.  **Orchestrate**: Dựa trên `mode`, **Lõi Vận Hành** sẽ:
    *   Chuyển hướng đến một **Tool App** có sẵn để tạo sản phẩm ngay.
    *   Hoặc khởi tạo một **Project App** mới: tạo repo GitHub, kích hoạt CI/CD, và cấp phát subdomain.
4.  **Develop & Deploy**: Người dùng phát triển dự án bằng cách push code lên GitHub. Hệ thống CI/CD sẽ tự động triển khai các thay đổi lên **Không Gian Triển Khai**.

### Tầm nhìn
**geton.vn** không chỉ là một công cụ, mà là một **AI Product Lab** toàn diện cho sinh viên: từ việc thử nghiệm ý tưởng, tạo prototype, triển khai sản phẩm, xây dựng portfolio, cho đến việc đặt nền móng cho một startup trong tương lai.

B. Tiến độ phát triển:
Hệ thống đã hoàn thành các chức năng cốt lõi tại trang chủ (`/`):
1.  **Thu nhận ý tưởng**: Người dùng nhập ý tưởng vào ô input.
2.  **Phân tích bằng AI**: Khi nhấn nút, hệ thống gửi một yêu cầu duy nhất đến API (`/api/lab/analyze`). API này sẽ trả về kết quả phân tích toàn diện, bao gồm:
    *   Các thông số cơ bản: `mode` (loại website), `brand`, `title`.
    *   Dữ liệu `preview` có cấu trúc cho các phần Phân tích, Thiết kế và Kiến trúc.
    *   Nội dung chi tiết dạng Markdown.
3.  **Cấu hình dự án**: Sau khi có kết quả, người dùng có thể xem trước và tùy chỉnh `slug` (URL) cũng như các thông số khác của website thông qua component `WebsiteConfiguration`.
4.  **Tạo và Chuyển hướng**: Khi nhấn "Tạo dự án", toàn bộ dữ liệu dự án (`project`) và website (`website`) được lưu vào `localStorage`. Sau đó, người dùng được chuyển hướng đến trang `/web/[slug]`. Trang này sẽ đọc dữ liệu từ `localStorage` để hiển thị nội dung ban đầu dựa trên các `preset` tương ứng với `mode` đã được AI xác định.

C. Một số công đoạn quan trọng tiếp theo đang xem xét:
1. Hoàn chỉnh template cho web/[slug] để đảm bảo đa dạng thành phần, có layout rõ ràng hoặc có thể lựa chọn các layout.
2. Thay thế nội dung preset thành nội dung tinh chỉnh của AI
3. Lưu trang web vào Firebase lâu dài để người dùng chỉnh sửa, upload ảnh.

4. Tạo Repository cho Template dự án trên GitHub
5. Tạo Repository trên GitHub từ Template
    5.1 Frontend gửi yêu cầu
    5.2 Backend tiếp nhận và xác thực
    5.3 Backend gọi GitHub API
    5.4 GitHub thực hiện tạo Repository
    5.5 Backend nhận kết quả và lưu vào Registry
6. Kích hoạt CI/CD để triển khai lần đầu lên Cloud Run
7. Gán Subdomain cho Cloud Run Service
8. Lưu thông tin vào Registry Database