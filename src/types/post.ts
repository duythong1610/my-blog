import { Tag } from "./tag";
import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User; // Có thể là ObjectId hoặc đã populate thành IUser
  status: "draft" | "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
  slug: string;
  thumbnail: string;
  tags: Tag[];
  viewCount: number;
  totalLike: number;
  totalComment: number;
}
