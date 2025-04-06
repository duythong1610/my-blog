import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng - WriteFlow",
  description:
    "Điều khoản sử dụng của WriteFlow cho phép người dùng hiểu rõ quyền lợi, nghĩa vụ và các quy định khi sử dụng nền tảng chia sẻ kiến thức và cộng đồng lập trình.",
};

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Điều Khoản Sử Dụng</h1>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">1. Giới thiệu</h2>
        <p>
          Chào mừng bạn đến với <strong>WriteFlow</strong> – một nền tảng chia
          sẻ kiến thức, kinh nghiệm lập trình và phát triển nghề nghiệp. Bằng
          việc truy cập và sử dụng trang web của chúng tôi, bạn đồng ý tuân thủ
          các điều khoản và điều kiện dưới đây. Nếu bạn không đồng ý với bất kỳ
          điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">
          2. Mục đích sử dụng dịch vụ
        </h2>
        <p>
          Website <strong>WriteFlow</strong> cung cấp một môi trường an toàn và
          hữu ích cho các lập trình viên, người mới bắt đầu và các chuyên gia
          trong ngành công nghệ thông tin. Mục đích của chúng tôi là tạo ra một
          cộng đồng chia sẻ thông tin, kinh nghiệm, cũng như kết nối những người
          có chung đam mê về lập trình và công nghệ.
        </p>
        <p>
          Bạn có thể sử dụng dịch vụ để đăng bài, chia sẻ kiến thức, tham gia
          thảo luận và kết nối với cộng đồng.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">
          3. Quyền và nghĩa vụ của người dùng
        </h2>
        <p>
          Khi sử dụng dịch vụ của <strong>WriteFlow</strong>, bạn có quyền:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Được phép đăng bài viết, chia sẻ kiến thức và kinh nghiệm cá nhân.
          </li>
          <li>
            Tham gia thảo luận và bình luận dưới các bài viết trên nền tảng.
          </li>
          <li>Tiếp cận các tài nguyên học hỏi từ cộng đồng.</li>
        </ul>

        <p>Bạn có nghĩa vụ:</p>
        <ul className="list-disc pl-6">
          <li>
            Cung cấp thông tin chính xác và hợp lệ khi đăng ký tài khoản và sử
            dụng dịch vụ.
          </li>
          <li>Tuân thủ các quy định về bảo mật và bảo vệ tài khoản cá nhân.</li>
          <li>
            Chịu trách nhiệm về tất cả các hành động và nội dung mà bạn đăng tải
            hoặc chia sẻ trên website.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">
          4. Quyền sử dụng nội dung
        </h2>
        <p>
          Tất cả nội dung, bao gồm bài viết, hình ảnh, video và các tài liệu
          khác trên website của <strong>WriteFlow</strong> đều thuộc sở hữu của
          chúng tôi hoặc các bên sở hữu bản quyền có liên quan. Bạn chỉ có thể
          sử dụng các nội dung này cho mục đích cá nhân và không được sao chép,
          phân phối hoặc tái sản xuất mà không có sự đồng ý của{" "}
          <strong>WriteFlow</strong>.
        </p>
        <p>
          Khi bạn đăng tải nội dung lên <strong>WriteFlow</strong>, bạn đồng ý
          cấp phép cho chúng tôi quyền sử dụng, chỉnh sửa, sao chép và phân phối
          nội dung đó trên nền tảng của chúng tôi và các nền tảng khác của{" "}
          <strong>WriteFlow</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">5. Quy định về hành vi</h2>
        <p>
          Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý không thực hiện các hành
          vi sau:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Đăng tải nội dung vi phạm quyền sở hữu trí tuệ của người khác, hoặc
            nội dung có thể gây tổn hại đến quyền lợi, danh dự của các cá nhân
            hoặc tổ chức khác.
          </li>
          <li>
            Chia sẻ thông tin sai lệch, gây hiểu lầm hoặc có khả năng gây hại
            cho cộng đồng.
          </li>
          <li>
            Thực hiện các hành vi xâm nhập, tấn công hệ thống hoặc can thiệp
            trái phép vào dịch vụ của <strong>WriteFlow</strong>.
          </li>
          <li>
            Sử dụng dịch vụ để thực hiện các hoạt động gian lận hoặc vi phạm
            pháp luật.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">
          6. Quyền và nghĩa vụ của WriteFlow
        </h2>
        <p>
          <strong>WriteFlow</strong> cam kết cung cấp một nền tảng an toàn và
          hiệu quả cho người dùng. Tuy nhiên, chúng tôi không chịu trách nhiệm
          về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không sử dụng
          thông tin từ website, bao gồm nhưng không giới hạn ở mất mát dữ liệu
          hoặc gián đoạn dịch vụ.
        </p>
        <p>
          Chúng tôi có quyền chỉnh sửa, cập nhật hoặc xóa bỏ bất kỳ nội dung nào
          được đăng tải trên nền tảng nếu phát hiện vi phạm các điều khoản này.{" "}
          <strong>WriteFlow</strong> cũng có quyền chấm dứt quyền truy cập của
          người dùng vào dịch vụ nếu phát hiện hành vi vi phạm.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">7. Bảo mật</h2>
        <p>
          Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng theo chính
          sách bảo mật của chúng tôi. Tuy nhiên, bạn cũng có trách nhiệm bảo vệ
          tài khoản của mình và thông báo cho chúng tôi ngay lập tức nếu phát
          hiện ra bất kỳ hành vi truy cập trái phép nào vào tài khoản của bạn.
          <strong>WriteFlow</strong> không chịu trách nhiệm về các thiệt hại
          phát sinh từ việc sử dụng sai mật khẩu hoặc thông tin tài khoản.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">8. Giới hạn trách nhiệm</h2>
        <p>
          <strong>WriteFlow</strong> không chịu trách nhiệm về bất kỳ thiệt hại
          trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả phát sinh từ
          việc sử dụng hoặc không sử dụng dịch vụ của chúng tôi, bao gồm nhưng
          không giới hạn ở việc mất mát dữ liệu, sự cố hệ thống, hoặc các lỗi
          không mong muốn khác.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-2 font-semibold">
          9. Quyền sửa đổi điều khoản
        </h2>
        <p>
          <strong>WriteFlow</strong> có quyền thay đổi, điều chỉnh hoặc bổ sung
          các điều khoản này mà không cần thông báo trước. Bạn có trách nhiệm
          theo dõi các thay đổi này và việc tiếp tục sử dụng dịch vụ của chúng
          tôi sau khi các điều khoản được cập nhật sẽ được coi là sự chấp nhận
          của bạn đối với các thay đổi đó.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
