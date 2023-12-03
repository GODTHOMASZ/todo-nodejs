import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconContext } from "react-icons"
import { HiUserCircle, HiLogout } from "react-icons/hi"
import { FaGithub } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logOut } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'

const Header: FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logOut())
        removeTokenFromLocalStorage('token')
        toast.success('Вы вышли из системы')
        navigate('/')
    }


    return (
        <>
        {
            isAuth && (
                <header className='flex fixed h-screen overflow-auto overflow-x-hidden flex-col align-center items-center justify-between w-[50px] px-1 py-4 shadow-sm bg-blue'>
                    <Link to="/task">
                        <img src="/logo.svg"/>
                    </Link>

                    <div className='flex flex-col items-center py-2 gap-5'>
                        <Link to="https://github.com/GODTHOMASZ" title='Проект на github'>
                            <IconContext.Provider value={{ className: "btn-menu-svg" }}>
                                <FaGithub size={25}/>
                            </IconContext.Provider>
                        </Link>
                        <IconContext.Provider value={{ className: "btn-menu-svg" }}>
                            <Link to="/task" title='Пользователь'>
                                <HiUserCircle size={40}/>
                            </Link>
                        </IconContext.Provider>
                        <button title='Выход' onClick={logoutHandler}>
                            <IconContext.Provider value={{ className: "btn-menu-svg" }}>
                                <HiLogout size={25} />
                            </IconContext.Provider>
                        </button>
                    </div>

                </header>
            )
        }
        </>
    )
}

export default Header