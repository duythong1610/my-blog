import { Post } from "./post";
import { User } from "./user";

interface Notification {
  _id: string;
  user: User;
  post: Post;
  message: string;
  type: "post_approved" | "post_rejected";
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default Notification;
