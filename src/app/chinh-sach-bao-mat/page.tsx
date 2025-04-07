// app/privacy-policy/page.tsx
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Chính sách bảo mật</h1>
      <p className="mb-4">Cập nhật lần cuối: 06/04/2025</p>

      <p className="mb-6">
        Trang blog của chúng tôi cam kết tôn trọng và bảo vệ quyền riêng tư của
        người dùng. Chính sách bảo mật này nhằm mục đích giải thích cách chúng
        tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn khi
        truy cập và sử dụng trang blog.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        1. Thông tin chúng tôi thu thập
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>Thông tin cá nhân: Họ tên, email, ảnh đại diện.</li>
        <li>Thông tin kỹ thuật: IP, trình duyệt, hệ điều hành.</li>
        <li>Thông tin hành vi: Lượt xem bài viết, bình luận, tương tác.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">
        2. Mục đích sử dụng thông tin
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>Nâng cao trải nghiệm người dùng.</li>
        <li>Phản hồi yêu cầu hoặc câu hỏi của bạn.</li>
        <li>Phân tích và cải tiến hiệu suất blog.</li>
        <li>Gửi thông báo khi có bài viết mới (nếu bạn đăng ký).</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">3. Chia sẻ thông tin</h2>
      <p className="mb-4">
        Chúng tôi <strong>không bán hoặc chia sẻ</strong> thông tin cá nhân của
        bạn cho bên thứ ba, trừ khi:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>Theo yêu cầu của pháp luật.</li>
        <li>Ngăn chặn hành vi vi phạm hoặc gian lận.</li>
        <li>Sử dụng dịch vụ bên thứ ba như gửi email, phân tích dữ liệu.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">
        4. Cookie và công nghệ theo dõi
      </h2>
      <p className="mb-6">
        Blog có thể sử dụng cookie để ghi nhớ tùy chọn của bạn, phân tích hành
        vi truy cập, hoặc cá nhân hóa trải nghiệm. Bạn có thể tắt cookie qua
        trình duyệt của mình.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Bảo mật thông tin</h2>
      <p className="mb-6">
        Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ dữ liệu cá
        nhân. Tuy nhiên, không có phương thức nào an toàn tuyệt đối trên
        Internet.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Quyền của người dùng</h2>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>Xem, chỉnh sửa hoặc yêu cầu xóa dữ liệu cá nhân.</li>
        <li>Hủy đăng ký email.</li>
        <li>Yêu cầu không dùng thông tin cho mục đích tiếp thị.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">7. Liên hệ</h2>
      <p className="mb-1">
        📧 Email:{" "}
        <a
          href="mailto:auduythong1610@gmail.com"
          className="text-purple-600 underline"
        >
          auduythong1610@gmail.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
