import { useAppSelector } from "../store/hooks"
import { IUser } from "../types/types"

export const useAuth = ():boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth)

    return isAuth
}

export const authUser = ():IUser | null => {
    const isAuth = useAppSelector((state) => state.user.user)

    return isAuth
}