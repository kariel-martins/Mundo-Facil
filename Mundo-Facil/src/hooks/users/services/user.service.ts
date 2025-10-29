import { axiosInstance } from "@/lib/axios";

export class userService {
    async removeAccount(user_id: string): Promise<void> {
        await axiosInstance.delete(`users/${user_id}`);
    }
}
