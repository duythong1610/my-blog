import { Post } from "./post";
import { User } from "./user";

export enum NotificationType {
  comment = "comment",
  reply = "reply",
  follow = "follow",
  postApprove = "post_approved",
  postReject = "post_rejected",
}

interface Notification {
  _id: string;
  user: User;
  post: Post;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  senders: User[];
}

export default Notification;
