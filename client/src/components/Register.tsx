import React from 'react'
import { FC, useState } from "react"
import { AuthService } from "../services/auth.service"
import { toast } from 'react-toastify'

interface Props {
    setIsLogin: (isLogin: boolean) => void
} 

const Register: FC<Props> = ({setIsLogin}) => {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [middlename, setMiddlename] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
 
    
    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({name, surname, middlename, login, password})
            if (data) {
                toast.success('Аккаунт создан')
                setIsLogin(true)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <form onSubmit={registrationHandler} className="flex w-1/3 flex-col mx-auto gap-5">
            <input 
                type="text" 
                className="imput" 
                placeholder="Фамилия"
                onChange={(e) => setSurname(e.target.value)}
                required
            />
            <input 
                type="text" 
                className="imput" 
                placeholder="Имя"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input 
                type="text" 
                className="imput" 
                placeholder="Очество"
                onChange={(e) => setMiddlename(e.target.value)}
            />
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

            <button className="btn btn-blue mx-auto text-white">Зарегистироваться</button>
        </form>
    )
}

export default Register