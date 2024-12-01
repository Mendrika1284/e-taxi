import { CreateUser, User } from "@/models/User";
import axios from "axios";

export const userService = {
  async createUser(data: CreateUser): Promise<User> {
    const response = await axios.post<User>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "users",
      data,
    );
    return response.data;
  },
};
