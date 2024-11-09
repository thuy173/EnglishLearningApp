import { Card } from '@/components/ui/card'
import SignInForm from '@/sections/auth/sign-in/SignInForm'
import React from 'react'

const SignIn: React.FC = () => {
    return (
        <>
            <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
                    <Card className='p-6'>
                        <div className="text-center mb-5">
                            <h1 className='text-2xl font-semibold mb-2'>Login</h1>
                            <p className='text-sm text-muted-foreground'>Enter your information to access the management system</p>
                        </div>
                        <SignInForm />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default SignIn