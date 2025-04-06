import { Post } from "./post";
import { User } from "./user";

export interface Comment {
  _id: string;
  post: Post;
  user: User;
  content: string;
  parent: Comment | null;
  createdAt: Date;
  updatedAt: Date;
}
