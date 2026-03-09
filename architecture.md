A. Tư tưởng kiến trúc:
geton.vn được xây dựng với triết lý cốt lõi là “Idea → Product Lab”, nghĩa là một môi trường giúp biến ý tưởng của sinh viên thành sản phẩm chạy thật trên web nhanh nhất có thể, một cách tự động hóa. Thay vì tập trung vào việc cung cấp hạ tầng lưu trữ hay công cụ lập trình thuần túy, hệ thống hướng tới việc hỗ trợ toàn bộ hành trình từ khi một ý tưởng được hình thành cho đến khi nó trở thành một prototype có thể sử dụng và chia sẻ. Luồng tư duy của nền tảng rất đơn giản: người dùng nhập ý tưởng, hệ thống phân loại ý tưởng, gợi ý hướng triển khai phù hợp, tạo tool hoặc project tương ứng, sau đó triển khai sản phẩm và cho phép chia sẻ. Nhờ vậy, geton.vn đóng vai trò như một phòng thí nghiệm sản phẩm số dành cho sinh viên.

Kiến trúc domain của hệ thống được chia thành ba nhóm chính. Nhóm thứ nhất là Idea Hub, bao gồm các cổng như geton.vn hoặc lab.sviuh.net, nơi người dùng nhập ý tưởng, nhận gợi ý từ AI và được chuyển hướng tới các công cụ hoặc dự án phù hợp. Đây là điểm khởi đầu của toàn bộ hệ sinh thái. Nhóm thứ hai là Tool Apps, tức các ứng dụng nhỏ hoạt động độc lập, phục vụ những ý tưởng đơn giản không cần backend phức tạp. Ví dụ như các công cụ tạo CV, portfolio hoặc landing page. Những ứng dụng này thường chạy trên Firebase Hosting và có thể sử dụng Firestore để lưu dữ liệu nếu cần. Người dùng có thể tạo sản phẩm trực tiếp, chẳng hạn một trang CV cá nhân tại dạng địa chỉ như cv.geton.vn/username.

Nhóm thứ ba là Project Apps, dành cho các ý tưởng phức tạp hơn cần phát triển thành một dự án đầy đủ. Mỗi dự án dạng này có repository riêng trên GitHub, quy trình CI/CD riêng, dịch vụ chạy trên Cloud Run và một subdomain riêng. Ví dụ như các ứng dụng tạo truyện tranh bằng AI, hệ thống tạo podcast AI, hoặc các công cụ xây dựng ứng dụng web. Các project này hoạt động như những sản phẩm độc lập nhưng vẫn nằm trong hệ sinh thái geton.

Toàn bộ hệ thống được tổ chức theo ba lớp kiến trúc chính. Lớp đầu tiên là Idea Layer, nơi người dùng tương tác với hệ thống để nhập và mô tả ý tưởng. Layer này chủ yếu chạy trên Firebase Hosting nhằm tận dụng CDN toàn cầu, tốc độ tải nhanh và chi phí thấp. Tại đây, AI sẽ hỗ trợ phân loại ý tưởng và định hướng bước tiếp theo cho người dùng, chẳng hạn chuyển sang một công cụ sẵn có hoặc khởi tạo một dự án mới.

Lớp thứ hai là Platform Layer, đóng vai trò backend của toàn hệ thống. Thành phần trung tâm của lớp này là một service duy nhất chạy trên Google Cloud Run, gọi là geton-main. Bên trong service này có các module xử lý như quản lý ý tưởng, tạo project, quản lý repository, triển khai dịch vụ và registry của hệ thống. Tuy có nhiều chức năng khác nhau, các module vẫn được giữ trong một service duy nhất thay vì tách thành nhiều microservice để tránh làm hệ thống trở nên phức tạp.

Lớp thứ ba là Runtime Layer, nơi các sản phẩm thực sự được vận hành. Layer này gồm hai loại môi trường. Loại thứ nhất là các ứng dụng đơn giản chạy trên Firebase Hosting và sử dụng Firestore, phù hợp với các tool nhỏ. Loại thứ hai là các dự án phức tạp hơn chạy trên Google Cloud Run, mỗi dự án tương ứng với một container và một service riêng có khả năng tự động mở rộng theo nhu cầu.

Luồng hoạt động tổng thể của hệ thống được thiết kế rất đơn giản. Người dùng truy cập geton.vn và nhập ý tưởng của mình. AI sẽ phân tích và phân loại ý tưởng. Nếu ý tưởng phù hợp với một tool có sẵn, hệ thống sẽ chuyển hướng người dùng đến ứng dụng tương ứng để tạo sản phẩm ngay lập tức. Nếu ý tưởng cần phát triển thành dự án, nền tảng sẽ tự động tạo repository GitHub, tạo service Cloud Run, gán subdomain và lưu thông tin vào registry của hệ thống. Sau đó người dùng có thể tiếp tục phát triển dự án bằng cách push code lên GitHub và hệ thống CI/CD sẽ tự động triển khai.

Về quản lý mã nguồn, toàn bộ dự án được đặt trong một GitHub organization chung. Hệ thống cung cấp một repository template để tạo các project mới, trong đó đã có sẵn Dockerfile, cấu hình CI/CD và cấu trúc cơ bản cho frontend và backend. Khi một dự án mới được tạo, nó sẽ được khởi tạo từ template này để đảm bảo mọi project đều có cấu trúc thống nhất.

Hệ thống DNS được giữ ở mức đơn giản nhất có thể. Domain chính là geton.vn và sử dụng wildcard subdomain để phục vụ các project. Nhờ vậy, mỗi sản phẩm có thể dễ dàng được gán một địa chỉ riêng như ai-comic.geton.vn hoặc podcast-ai.geton.vn mà không cần cấu hình DNS phức tạp.

Ở phía backend, nền tảng cần một cơ sở dữ liệu nhỏ để quản lý registry của các project. Database này lưu thông tin cơ bản như tên dự án, slug, repository GitHub, service Cloud Run, domain, chủ sở hữu và thời điểm tạo. Đây là lớp quản lý trung tâm giúp hệ thống biết mỗi project đang tồn tại ở đâu và chạy như thế nào.

Về dữ liệu của các project, mỗi dự án có thể lựa chọn hệ quản trị cơ sở dữ liệu phù hợp với nhu cầu của mình, chẳng hạn Firestore, PostgreSQL hoặc các hệ thống bên ngoài. Nếu sử dụng PostgreSQL, hệ thống có thể vận hành một instance chung nhưng tạo nhiều database riêng cho từng dự án để đảm bảo tách biệt dữ liệu.

Nhờ sử dụng kiến trúc serverless như Firebase và Cloud Run, chi phí vận hành của hệ thống có thể giữ ở mức rất thấp. Với vài trăm đến khoảng một nghìn project sinh viên, phần lớn dịch vụ vẫn nằm trong free tier. Chi phí chính chủ yếu đến từ database trung tâm, ví dụ một instance Cloud SQL, và tổng chi phí vận hành hàng tháng có thể chỉ khoảng vài chục đô la.

Tư tưởng thiết kế của geton xoay quanh bốn nguyên tắc chính. Thứ nhất là đơn giản, tránh xây dựng hệ thống microservice phức tạp mà chỉ cần một backend trung tâm, một database và một GitHub organization. Thứ hai là serverless, tận dụng các dịch vụ như Firebase và Cloud Run để giảm gánh nặng vận hành. Thứ ba là idea-first, nghĩa là hệ thống bắt đầu từ ý tưởng của người dùng chứ không phải từ code. Và cuối cùng là xây dựng một hệ sinh thái tool, nơi nhiều công cụ nhỏ có thể hỗ trợ sinh viên tạo sản phẩm nhanh chóng.

Về tầm nhìn dài hạn, geton có thể trở thành một AI Product Lab dành cho sinh viên, nơi họ có thể nhập ý tưởng, tạo prototype, triển khai sản phẩm thật trên web, xây dựng portfolio cá nhân và thậm chí phát triển thành startup. Toàn bộ hệ thống được thiết kế để giúp quá trình này diễn ra nhanh, đơn giản và ít rào cản kỹ thuật nhất.

B. Tiến độ phát triển:
Hiện tại geton.vn đã hoàn thành trang thu nhận idea --> gọi prompt AI để phân tích ý tưởng thành các thông số như mode, brand, title, vân vân. Khi người dùng nhấn nút Tạo dự án hoặc Tạo sản phẩm thì chuyển qua trang /p/[slug] cho phép người dùng lựa chọn các tham số khác. Khi người dùng nhấn nút Thiết kế dự án hoặc Tạo sản phẩm thì chuyển sang trang /web/[slug] với nội dung là các preset. Thành phần của trang /web/[slug] gồm các section được định nghĩa sẵn tương ứng với mỗi mode.

C. Một số công đoạn quan trọng đang xem xét:
1. Tạo Repository trên GitHub từ Template
    1.1 Frontend gửi yêu cầu
    1.2 Backend tiếp nhận và xác thực
    1.3 Backend gọi GitHub API
    1.4 GitHub thực hiện tạo Repository
    1.5 Backend nhận kết quả và lưu vào Registry
2. Kích hoạt CI/CD để triển khai lần đầu lên Cloud Run
3. Gán Subdomain cho Cloud Run Service
4. Lưu thông tin vào Registry Database