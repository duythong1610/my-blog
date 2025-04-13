import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions"; // đường dẫn đúng với cấu trúc của bạn

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
