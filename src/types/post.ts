import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User; // Có thể là ObjectId hoặc đã populate thành IUser
  status: "draft" | "pending" | "approved";
  createdAt?: Date;
  updatedAt?: Date;
}
