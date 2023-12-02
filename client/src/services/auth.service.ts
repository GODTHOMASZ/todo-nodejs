import { instance } from "../api/axios.api"
import { IUser, IUserData } from "../types/types"

export const AuthService = {
    async registration(userData: IUserData): Promise<IUser> {
        const {data} = await instance.post<IUser>('user/new', userData)
        return data
    },
    async login(userData: IUserData): Promise<IUser> {
        const {data} = await instance.post<IUser>('auth/login', userData)
        return data
    },
    async get(): Promise<IUser | undefined> {
        const {data} = await instance.get<IUser>('auth/profile')
        if(data) return data
    }
}