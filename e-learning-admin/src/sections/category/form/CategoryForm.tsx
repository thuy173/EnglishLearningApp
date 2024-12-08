import React, { useEffect, useState } from 'react'
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
import PreviewUpload from '@/components/common/PreviewUpload'
import DragDropField from '@/components/form/DragDropField'

type CategoryFormProps = {
    categoriesData: PageResponse<CategoryRes>;
    setCategoriesData: (data: PageResponse<CategoryRes>) => void;
} & (
        | {
            updateItem: CategoryRes;
            onClose: (id: number) => void;
        }
        | {
            updateItem?: undefined;
            onClose?: undefined;
        }
    );

const CategoryForm: React.FC<CategoryFormProps> = ({ categoriesData, setCategoriesData, updateItem, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const form = useForm<CategoryReq>({
        defaultValues: {
            name: '',
            description: '',
            icon: '',
            status: false,
        },
    })

    useEffect(() => {
        if (updateItem && updateItem.id) {
            form.reset({
                name: updateItem.name,
                description: updateItem.description,
                status: updateItem.status
            })
        }
    }, [updateItem, form])

    const handleSave = async (formData: CategoryReq) => {
        try {
            setLoading(true)
            if (!(formData.icon instanceof File)) {
                form.reset({
                    ...formData,
                    icon: ''
                })
            }

            if (updateItem && updateItem.id) {
                const response = await categoryService.updateCategory(updateItem.id, form.getValues())
                const updatedItem = response;
                const index = categoriesData.content.findIndex((item) => item.id === updateItem.id);

                if (index >= 0) {
                    const updatedItems = [...categoriesData.content];
                    updatedItems[index] = { ...updatedItems[index], ...updatedItem };

                    setCategoriesData({
                        ...categoriesData,
                        content: updatedItems,
                    });
                }
                toast.success('Update category successfully!')
                onClose(updateItem.id)
            } else {
                const response = await categoryService.addCategory(form.getValues())
                setCategoriesData({
                    ...categoriesData,
                    content: [...categoriesData.content, response],
                    totalElements: categoriesData.totalElements + 1
                })
                form.reset()
                setPreviewImage('')
                toast.success('Add new category successfully!')
            }
        } catch (error) {
            handleError(error, 'Error!')
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = (file: File) => {
        if (file) {
            const newPreviewImage = URL.createObjectURL(file);
            setPreviewImage(newPreviewImage);
        }
    }

    return (
        <div className="pt-5">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)}>
                        <div className='w-96'>
                            {(previewImage || updateItem?.icon) ? (
                                <PreviewUpload
                                    onDelete={() => {
                                        const newPreviewImage = '';
                                        setPreviewImage(newPreviewImage);
                                        form.setValue(`icon`, '');
                                    }}
                                    currentLink={updateItem?.icon}
                                    file={form.getValues('icon')}
                                />
                            ) : (
                                <div className="mb-3">
                                    <DragDropField
                                        form={form}
                                        name={`icon`}
                                        isRequired={true}
                                        label={'Hình ảnh'}
                                        description={'PNG, JPG, WEBP,...'}
                                        accept='image/*'
                                        handleFileChange={(file) => handleImageChange(file)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{
                                    required: 'Name is required'
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
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
                                    maxLength: {
                                        value: 255,
                                        message: 'Description cannot be longer than 255 character'
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description" className='resize-none' {...field} />
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
                                {updateItem ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    )
}

export default CategoryForm