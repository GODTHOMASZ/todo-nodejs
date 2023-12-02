import { RouterProvider, useNavigate } from 'react-router-dom'
import { router } from './router/router'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localstorage.helper'
import { AuthService } from './services/auth.service'
import { logIn, logOut } from './store/user/userSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if(token){
        const data = await AuthService.get()
        if(data){
          dispatch(logIn(data))
        } else{
          dispatch(logOut())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
