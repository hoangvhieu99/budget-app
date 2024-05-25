import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  // const userName = currentUser.username;
  return (
    <div className="px-4 pt-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-700">
        Welcome to my Budget App
      </h1>

      <p className="mb-4 text-slate-700">
        Đây là một ứng dụng web được xây dựng bởi MERN (MongoDB, Express, React,
        Node.js). Nó bao gồm những chức năng chính: đăng ký, đăng nhập, đăng
        xuất, cập nhật và cung cấp quyền truy cập vào các routes được bảo vệ chỉ
        dành cho người dùng được xác thực
      </p>
      <p className="mb-4 text-slate-700">
        Phần giao diện (front-end) của ứng dụng được xây dựng bằng React và sử
        dụng React Router để thực hiện định tuyến ở phía client. Phần máy chủ
        (back-end) được xây dựng bằng Node.js và Express, và sử dụng MongoDB làm
        cơ sở dữ liệu. Xác thực được triển khai bằng cách sử dụng JSON Web
        Tokens (JWT).
      </p>
      <p className="mb-4 text-slate-700">
        Ứng dụng này được thiết kế để làm điểm khởi đầu cho việc xây dựng các
        ứng dụng web toàn bộ bộ công nghệ MERN với chức năng xác thực. Hãy thoải
        mái sử dụng nó như một mẫu (template) cho các dự án của bạn!
      </p>
    </div>
  );
}
