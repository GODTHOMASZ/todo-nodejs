import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Tasks, { tasksAction, tasksLoader } from '../pages/Tasks'
import Auth from '../pages/Auth'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Auth />
            },
            {
                path: 'task',
                action: tasksAction,
                loader: tasksLoader,
                element: (
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                    ),
            }
        ],
        errorElement: <ErrorPage />,
    }
])