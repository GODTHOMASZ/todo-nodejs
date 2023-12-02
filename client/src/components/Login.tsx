import React from 'react'
import { FC, useState } from "react"
import { AuthService } from "../services/auth.service"
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { logIn } from '../store/user/userSlice'

const Login: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()

    
    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({login, password})
            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(logIn(data))
                toast.success('Вход успешно выполнен')
                window.location.href = '/'
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <form onSubmit={loginHandler} className="flex w-1/3 flex-col mx-auto gap-5">
            <input 
                type="text" 
                className="imput" 
                placeholder="Логин"
                onChange={(e) => setLogin(e.target.value)}
                required
            />
            <input 
                type="password" 
                className="imput" 
                placeholder="Пароль" 
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button className="btn btn-blue mx-auto text-white">Войти</button>
        </form>
    )
}

export default Login