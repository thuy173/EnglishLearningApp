import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'

type ForgotFormProps = HTMLAttributes<HTMLDivElement>

const ForgotForm: React.FC<ForgotFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState(false)

    // Initialize the form
    const form = useForm({
        defaultValues: {
            email: '',
        },
    });

    // Handle form submission
    const onSubmit = (data: { email: string }) => {
        setIsLoading(true)
        console.log('Form submitted:', data);
        // Add your submission logic here
    };

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
                        <Button className='mt-2' loading={isLoading}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ForgotForm