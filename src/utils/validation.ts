export const usernameRules = [
  { required: true, message: "Vui lòng nhập tên người dùng!" },
  {
    pattern: /^[a-zA-Z0-9_]{4,20}$/,
    message:
      "Tên người dùng phải từ 4–20 ký tự, chỉ bao gồm chữ cái, số hoặc dấu gạch dưới (_)",
  },
];
