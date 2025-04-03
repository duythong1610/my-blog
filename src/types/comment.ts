import { User } from "./user";

export interface Comment {
  _id: string;
  postId: string; // ObjectId của bài viết
  author: User | string; // Có thể là ObjectId hoặc đã populate thành IUser
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
