import { RequestHandler } from "express"
import { AuthService } from "../services/service.auth"
import { passwordCrypto } from "../../../share/services/PasswordCrypto"
import { JWTService } from "../../../share/services/JWTService"

type signUp = {
    name: string,
    email: string,
    password: string,
    confPassword: string
}

const service = new AuthService()
export const signUp: RequestHandler = async (req, res) => {
    const {name, email, password, confPassword} = req.body as signUp
    if (!name || !email || !password || !confPassword) {
        res.status(400).json({error: "Os campos são obrigatorios"})
        return
    }
    
    if ( password !== confPassword ) {
        res.status(400).json({error: "Senhas não coincidem."})
        return
    }

    try {
        await service.getByEmail(email)
        res.status(409).json({field: "email", message: "Email já existe"})
        return
    } catch {
        const passwordHash = (await passwordCrypto.hashPassword(password)).toString()
        const user = await service.createUser({name, email, passwordHash})
        if (!user) {
            res.status(400).json({error: "Não foi possível criar o usuário"})
            return
        }
        const uid = user.id
        if (uid === undefined) {
            res.status(404).json({error: "Id do usuario não encontrado"})
            return
        }
        const tokenVerication = JWTService.sign({scope: uid})
        if (!tokenVerication || tokenVerication === "JWT_SECRET_NOT_FOUND") {
            res.status(500).json({error: "Erro ao gera o token"})
            return
        }
        
    }
};

export const verifyEmail: RequestHandler = (req, res) => {
    const token = req.cookies['verifyEmail']

    if (!token) {
        res.status(401).json({error: "Token não encotrado."})
        return
    }
}
export const sigIn: RequestHandler = (req, res) => {};

export const forgotPassword: RequestHandler = (req, res) => {};

export const resertPassword: RequestHandler = (req, res) => {};