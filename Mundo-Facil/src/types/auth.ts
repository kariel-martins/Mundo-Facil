export type signInData = {
    email: string,
    password: string,
}

export type signUpData = {
    name: string
    email: string,
    password: string,
    confirmPassword: string
}

export type forgotPasswordData = {
    email: string
}

export type resetPasswordData = {
    password: string,
    confirmPassword: string
}

export type UserSignInRequestData = {
    user_id: string;
    email: string;
    name: string;
}

export type UserSignUpRequestData = {
    name: string;
    email: string;
    id: string;
    created_at?: Date | undefined;
}