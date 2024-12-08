import GeneralError from '@/pages/errors/GeneralError'
import MaintenanceError from '@/pages/errors/MaintenanceError'
import NotFoundError from '@/pages/errors/NotFoundError'
import UnauthorizedError from '@/pages/errors/UnauthorizedError'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    // Auth routes
    {
        path: '/login',
        lazy: async () => ({
            Component: (await import('@/pages/auth/SignIn')).default,
        }),
        loader: () => {
            document.title = "Sign In";
            return null;
        },
    },
    // {
    //     path: "/profile/:userId",
    //     element: <Profile />,
    //     loader: ({ params }) => fetchUserData(params.userId), // Tải dữ liệu trước khi render Profile
    // },
    {
        path: '/forgot-password',
        lazy: async () => ({
            Component: (await import('@/pages/auth/ForgotPassword')).default,
        }),
    },

    // Main routes
    {
        path: '/',
        lazy: async () => {
            const AppShell = await import('@/layout/AppShell')
            return { Component: AppShell.default }
        },
        // errorElement: <GeneralError />,
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import('@/pages/dashboard/Dashboard')).default,
                }),
            },
            {
                path: 'categories',
                lazy: async () => ({
                    Component: (await import('@/pages/category/Category')).default,
                }),
            },
            {
                path: 'levels',
                lazy: async () => ({
                    Component: (await import('@/pages/level/Level')).default,
                }),
            },
            {
                path: 'users',
                lazy: async () => ({
                    Component: (await import('@/pages/user/User')).default,
                }),
            },
            {
                path: 'courses',
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('@/pages/course/Course')).default,
                        }),
                    },
                    {
                        path: 'add',
                        lazy: async () => ({
                            Component: (await import('@/pages/course/AddCourse')).default,
                        }),
                    },
                    {
                        path: ':id/update',
                        lazy: async () => ({
                            Component: (await import('@/pages/course/UpdateCourse')).default,
                        }),
                    },
                    {
                        path: ':id/lessons',
                        lazy: async () => ({
                            Component: (await import('@/pages/lesson/Lesson')).default,
                        }),
                    },
                    {
                        path: ':id/lessons/:lessonId',
                        lazy: async () => ({
                            Component: (await import('@/pages/lesson/LessonDetail')).default,
                        }),
                    },
                    {
                        path: ':id/lessons/:lessonId/add-test',
                        lazy: async () => ({
                            Component: (await import('@/pages/test/AddTest')).default,
                        }),
                    },
                    {
                        path: ':id/lessons/:lessonId/update/:testId',
                        lazy: async () => ({
                            Component: (await import('@/pages/test/UpdateTest')).default,
                        }),
                    }
                ]
            },
            {
                path: 'vocabularies',
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('@/pages/vocabulary/Vocabulary')).default,
                        }),
                    },
                    {
                        path: 'add',
                        lazy: async () => ({
                            Component: (await import('@/pages/vocabulary/AddVocab')).default,
                        }),
                    },
                    {
                        path: 'create-with-ai',
                        lazy: async () => ({
                            Component: (await import('@/pages/vocabulary/GenerateVocab')).default,
                        }),
                    },
                    {
                        path: ':id/update',
                        lazy: async () => ({
                            Component: (await import('@/pages/vocabulary/UpdateVocab')).default,
                        }),
                    },
                ]
            },
            {
                path: 'profile',
                lazy: async () => ({
                    Component: (await import('@/pages/profile/Profile')).default,
                }),
            }
        ],
    },

    // Error routes
    { path: '/500', Component: GeneralError },
    { path: '/503', Component: MaintenanceError },
    { path: '/401', Component: UnauthorizedError },

    // Fallback 404 route
    { path: '*', Component: NotFoundError },
])

export default router
