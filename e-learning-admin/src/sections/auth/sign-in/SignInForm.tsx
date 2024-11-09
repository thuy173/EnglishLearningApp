import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { LoginReq } from '@/models/auth'
import { loginUser } from '@/store/auth/authSlice'
import { AppDispatch, RootState } from '@/store/store'
import { deleteTokenCookie } from '@/utils/cookieUtils'
import { handleError } from '@/utils/handleError'
import React, { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type SignInFormProps = HTMLAttributes<HTMLDivElement>

const SignInForm: React.FC<SignInFormProps> = ({ className, ...props }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    // Initialize the form
    const form = useForm<LoginReq>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginReq) => {
        try {
            deleteTokenCookie()
            const resultAction = await dispatch(loginUser(data))
            if (loginUser.fulfilled.match(resultAction)) {
                toast.success('Login successfully')
                navigate('/');
            } else if (loginUser.rejected.match(resultAction)) {
                handleError(error, 'Failed to login')

            }
        } catch (err) {
            handleError(err, 'Failed to login')
        }
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='name@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className='flex items-center justify-between'>
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            to='/forgot-password'
                                            className='text-sm font-medium text-muted-foreground hover:opacity-75'
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input type='password' placeholder='********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='mt-2' loading={loading}>
                            Login
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SignInForm