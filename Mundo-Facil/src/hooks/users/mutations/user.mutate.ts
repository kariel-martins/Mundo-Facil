import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/user.service";

const service = new userService()
export function DeleteAccountMuntate() {
    return useMutation({
        mutationFn: service.removeAccount,
    })
}