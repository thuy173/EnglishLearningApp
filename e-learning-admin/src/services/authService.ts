import { AuthRes, LoginReq, SignUpReq } from "@/models/auth"
import axiosInstance from "./agent"

export const login = async (req: LoginReq): Promise<AuthRes> => {
    try {
        const response = await axiosInstance.post(`/auth/login`, req)
        return response.data
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const signUp = async (req: SignUpReq): Promise<void> => {
    try {
        await axiosInstance.post(`/auth/sign-up`, req)
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export default { login, signUp }