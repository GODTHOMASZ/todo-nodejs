import { FC, useState } from "react"
import Login from '../components/Login'
import Register from '../components/Register'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'


const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const isAuth = useAuth()
  return (<>
            {(isAuth ? (<Navigate to="/" replace={true} />) :
              <div className="mt-40 flex flex-col items-center justify-center">
                <h1 className="mb-10 text-center text-2xl">
                  {isLogin ? 'Авторизация' : 'Регистрация'}
                </h1>

                {isLogin ? <Login /> :<Register setIsLogin={setIsLogin}/>}

                <div className="flex justify-center mt-5">
                  {
                    isLogin ? (
                      <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-900"
                      >
                        Нет аккаунта? Регистрация
                      </button>
                    ) : (
                      <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-900"
                      >
                        Уже есть аккаунт? Авторизация
                      </button>
                    )
                  }
                </div>
              </div>
            )}
          </>
  )
}

export default Auth