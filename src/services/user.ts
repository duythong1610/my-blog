import { userApi } from "@/api/user.api";

export const getUserDetail = async (username: string) => {
  const response = await userApi.findOne(username);
  return response.data;
};
