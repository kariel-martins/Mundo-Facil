import { useMutation, useQueryClient } from "@tanstack/react-query"
import { forgotPasswordAService, removeAutentication, resetPassword, signInService, signUpService, verifyEmail} from "../services/auth.service"

export function sigUpMutate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: signUpService,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['get-signUp']})
        }
    })
}

export function signInMutate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: signInService,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['get-login']})
        }
    })
}

export function forgotPasswordMutate() {
    const queryClient = useQueryClient()
    return useMutation<void, Error, string>({
        mutationFn: forgotPasswordAService,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-forgot-password']})
        }
    })
}

export function resetPasswordMutate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-forgot-password']})
        }
    })
}

export function verifyEmailMutate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: verifyEmail,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['get-verify-email']})
        }
    })
}

export function removeAutenticationMutate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeAutentication,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['remove-authetication']})
        }
    })
}