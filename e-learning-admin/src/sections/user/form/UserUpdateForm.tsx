import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { PageResponse } from '@/models/common/pageResponse'
import { UserRes, UserUpdateReq } from '@/models/user'
import userService from '@/services/userService'
import { handleError } from '@/utils/handleError'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { genderList, getGenderText } from '@/enums/gender'

type UserUpdateFormProps = {
    usersData: PageResponse<UserRes>;
    setUsersData: (data: PageResponse<UserRes>) => void;
    updateItem: UserRes;
    onClose: (id: number) => void;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ usersData, setUsersData, updateItem, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<UserUpdateReq>({
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            gender: undefined,
            dob: undefined,
            status: false,
        },
    })

    useEffect(() => {
        if (updateItem && updateItem.id) {
            form.reset({
                fullName: updateItem.fullName,
                phoneNumber: updateItem.phone,
                gender: updateItem.gender,
                dob: new Date(updateItem.dob),
                status: updateItem.status
            })
        }
    }, [updateItem, form])

    const handleSave = async () => {
        try {
            setLoading(true)
            const response = await userService.updateUser(updateItem.id, form.getValues())
            const index = usersData.content.findIndex((item) => item.id === updateItem.id);

            if (index >= 0) {
                const updatedItems = [...usersData.content];
                updatedItems[index] = { ...updatedItems[index], ...response };

                setUsersData({
                    ...usersData,
                    content: updatedItems,
                });
            }
            toast.success('Update user successfully!')
            onClose(updateItem.id)
        } catch (error) {
            handleError(error, 'Error!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="pt-3">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)}>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="fullName"
                                rules={{
                                    required: 'Full name is required'
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-3 gap-3 mb-3">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                rules={{
                                    required: 'Phone number is required'
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dob"
                                rules={{
                                    required: 'Dob is required'
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dob</FormLabel>
                                        <FormControl>
                                            <Input type='date'
                                                value={field.value ? (field.value).toISOString().split('T')[0] : ''}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value ? new Date(e.target.value) : null);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {genderList.map((item) => (
                                                    <SelectItem key={item} value={item.toString()}>{getGenderText(item)}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button tabIndex={1} variant="secondary" className="px-6">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type='submit' tabIndex={0} className="px-6" loading={loading}>
                                Save change
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    )
}

export default UserUpdateForm