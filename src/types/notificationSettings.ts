import { User } from "./user";

export interface NotificationSettings {
  _id: string;
  user: User;
  comment: boolean;
  follow: boolean;
  reply: boolean;
  postApprove: boolean;
  postReject: boolean;
}
