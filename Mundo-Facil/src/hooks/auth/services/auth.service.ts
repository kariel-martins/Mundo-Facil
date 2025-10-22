
import { axiosInstance } from "@/lib/axios"
import type { forgotPasswordData, resetPasswordData, signInData, signUpData, UserSignInRequestData, UserSignUpRequestData } from "@/types/auth"

export async function forgotPasswordAService(email: string):Promise<void> {
    await axiosInstance.post("/auth/resert-password", email)
}

export async function signInService(data: signInData): Promise<UserSignInRequestData> {
    const result = await axiosInstance.post('/auth/signin', data)
    return result.data
}

export async function signUpService(data: signUpData): Promise<UserSignUpRequestData> {
    const result = await axiosInstance.post('/auth/signup', data)
    return result.data
}

export async function verifyEmail({token, user_id}: {token: string, user_id: string}):Promise<void> {
    await axiosInstance.get(`/auth/verify-email?token=${token}&user_id=${user_id}`)
}

export async function forgotPassword(data: forgotPasswordData):Promise<void> {
    await axiosInstance.post('/auth/forgot-password', data)
}
export async function resetPassword(data: resetPasswordData):Promise<void> {
    await axiosInstance.put('/auth/reset-password', data)
}

export async function removeAutentication():Promise<void> {
    await axiosInstance.delete("/auth/remove-token")
}