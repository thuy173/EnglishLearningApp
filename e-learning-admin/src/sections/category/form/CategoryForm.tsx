import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { PageResponse } from '@/models/common/pageResponse'
import { CategoryReq, CategoryRes } from '@/models/category'
import categoryService from '@/services/categoryService'
import { handleError } from '@/utils/handleError'

type CategoryFormProps = {
    categoriesData: PageResponse<CategoryRes>;
    setCategoriesData: (data: PageResponse<CategoryRes>) => void;
}
const CategoryForm: React.FC<CategoryFormProps> = ({ categoriesData, setCategoriesData }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<CategoryReq>({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const handleSave = async () => {
        try {
            setLoading(true)
            const response = await categoryService.addCategory(form.getValues())
            setLoading(false)
            setCategoriesData({
                ...categoriesData,
                content: [...categoriesData.content, response],
                totalElements: categoriesData.totalElements + 1
            })
            form.reset()
            toast.success('Thêm loại tưởng nhớ thành công!')
        } catch (error) {
            setLoading(false)
            handleError(error, 'Thêm loại tưởng nhớ lỗi!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="pt-5">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)}>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{
                                    required: 'Tên loại tưởng nhớ là bắt buộc'
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên loại tưởng nhớ</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tên loại tưởng nhớ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="description"
                                rules={{
                                    required: 'Mô tả là bắt buộc',
                                    maxLength: {
                                        value: 255,
                                        message: 'Mô tả không được dài quá 255 ký tự'
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Mô tả" className='resize-none' {...field} />
                                        </FormControl>
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
                                Add
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    )
}

export default CategoryForm