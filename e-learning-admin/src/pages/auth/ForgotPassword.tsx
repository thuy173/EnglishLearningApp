import { Card } from '@/components/ui/card'
import ForgotForm from '@/sections/auth/forgot-password/ForgotForm'
import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
    return (
        <>
            <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
                    <Card className='p-6'>
                        <div className="text-center mb-5">
                            <h1 className='text-2xl font-semibold mb-2'>Quên mật khẩu</h1>
                            <p className='text-sm text-muted-foreground'>Nhập địa chỉ email của bạn để khôi phục mật khẩu</p>
                        </div>
                        <ForgotForm />
                        <p className='text-center mt-3'>
                            <Link to={'/sign-in'} className='text-sm text-primary hover:underline'>Quay lại trang đăng nhập</Link>
                        </p>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword