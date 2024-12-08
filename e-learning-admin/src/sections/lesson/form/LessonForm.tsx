import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { PageResponse } from '@/models/common/pageResponse'
import { LessonReq, LessonRes } from '@/models/lesson'
import lessonService from '@/services/lessonService'
import { handleError } from '@/utils/handleError'
import PreviewUpload from '@/components/common/PreviewUpload'
import DragDropField from '@/components/form/DragDropField'
import { LessonStatus } from '@/enums/lessonStatus'

type LessonFormProps = {
    lessonsData: PageResponse<LessonRes>;
    setLessonsData: (data: PageResponse<LessonRes>) => void;
    courseId: number;
} & (
        | {
            updateItem: LessonRes;
            onClose: (id: number) => void;
        }
        | {
            updateItem?: undefined;
            onClose?: undefined;
        }
    );

const LessonForm: React.FC<LessonFormProps> = ({ lessonsData, setLessonsData, courseId, updateItem, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const form = useForm<LessonReq>({
        defaultValues: {
            name: '',
            description: '',
            thumbnail: '',
            status: LessonStatus.DRAFT,
            courseId: courseId,
        },
    })

    useEffect(() => {
        if (updateItem && updateItem.id) {
            form.reset({
                name: updateItem.name,
                description: updateItem.description,
                status: updateItem.status,
                courseId: courseId
            })
        }
    }, [updateItem, form, courseId])

    const handleSave = async () => {
        try {
            setLoading(true)
            if (updateItem && updateItem.id) {
                const response = await lessonService.updateLesson(updateItem.id, form.getValues())
                const updatedItem = response;
                const index = lessonsData.content.findIndex((item) => item.id === updateItem.id);

                if (index >= 0) {
                    const updatedItems = [...lessonsData.content];
                    updatedItems[index] = { ...updatedItems[index], ...updatedItem };

                    setLessonsData({
                        ...lessonsData,
                        content: updatedItems,
                    });
                }
                toast.success('Update lesson successfully!')
                onClose(updateItem.id)
            } else {
                const response = await lessonService.addLesson(form.getValues())
                setLessonsData({
                    ...lessonsData,
                    content: [...lessonsData.content, response],
                    totalElements: lessonsData.totalElements + 1
                })
                form.reset()
                setPreviewImage('')
                toast.success('Add new lesson successfully!')
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
                            {previewImage ? (
                                <PreviewUpload
                                    onDelete={() => {
                                        const newPreviewImage = '';
                                        setPreviewImage(newPreviewImage);
                                        form.setValue(`thumbnail`, '');
                                    }}
                                    currentLink={updateItem?.thumbnail}
                                    file={form.getValues('thumbnail')}
                                />
                            ) : (
                                <div className="mb-3">
                                    <DragDropField
                                        form={form}
                                        name={`thumbnail`}
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

export default LessonForm