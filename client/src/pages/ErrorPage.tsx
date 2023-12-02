import { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-3'>
        <h2 className='text-2xl'>Страница не найдена</h2>
        <span>Страница была удалена или никогда не существовала. Убедитесь, что Вы написали адрес правильно.</span>
        <Link to="/" className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600 text-white">На главную</Link>
    </div>
  )
}

export default ErrorPage