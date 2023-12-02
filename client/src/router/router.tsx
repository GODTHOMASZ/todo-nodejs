import { createBrowserRouter, Navigate } from 'react-router-dom'
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
                element: (<ProtectedRoute>
                            <Navigate to="task" replace={true} />
                        </ProtectedRoute>),
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
            },
            {
                path: 'auth',
                element: <Auth />
            }
        ],
        errorElement: <ErrorPage />,
    }
])