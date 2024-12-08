import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { CourseReq, CourseRes } from '@/models/course'
import courseService from '@/services/courseService'
import { handleError } from '@/utils/handleError'
import ComboBoxField from '@/components/form/ComboBoxField'
import { PageResponse } from '@/models/common/pageResponse'
import { CategoryRes } from '@/models/category'
import { LevelRes } from '@/models/level'
import useDebounce from '@/hooks/useDebounce'
import categoryService from '@/services/categoryService'
import levelService from '@/services/levelService'
import DragDropField from '@/components/form/DragDropField'
import PreviewUpload from '@/components/common/PreviewUpload'
import { CourseStatus, courseStatusList, getCourseStatusText } from '@/enums/courseStatus'
import QuillFormField from '@/components/form/QuillFormField'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type CourseFormProps = {
    updateItem?: CourseRes;
}

type SearchKeys = 'category' | 'level'

const CourseForm: React.FC<CourseFormProps> = ({ updateItem }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [categoriesData, setCategoriesData] = useState<PageResponse<CategoryRes>>({} as PageResponse<CategoryRes>);
    const [levelsData, setLevelsData] = useState<PageResponse<LevelRes>>({} as PageResponse<LevelRes>);
    const [searchKey, setSearchKey] = useState<{ [K in SearchKeys]: string }>({ category: '', level: '' });
    const [previewImage, setPreviewImage] = useState<string>('');

    const debouncedSearchCat = useDebounce(searchKey['category'], 500);
    const debouncedSearchLevel = useDebounce(searchKey['level'], 500);

    const form = useForm<CourseReq>({
        defaultValues: {
            name: '',
            description: '',
            audience: '',
            target: '',
            content: '',
            thumbnail: '',
            price: 0,
            status: CourseStatus.DRAFT,
            categoryId: 0,
            levelId: 0
        },
    })

    useEffect(() => {
        if (updateItem && updateItem.id) {
            form.reset({
                name: updateItem.name,
                description: updateItem.description,
                thumbnail: updateItem.thumbnail,
                audience: updateItem.audience,
                target: updateItem.target,
                price: updateItem.price,
                status: updateItem.status as CourseStatus,
                categoryId: updateItem.categoryId,
                levelId: updateItem.levelId,
                content: updateItem.content,
            })
            setPreviewImage(updateItem.thumbnail)
        }
    }, [updateItem, form])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await categoryService.getAllCategories({ pageNumber: 0, pageSize: 10, name: debouncedSearchCat })
                setCategoriesData(response)
            } catch (error) {
                handleError(error, 'Failed to load categories')
            }
        }

        fetchData()
    }, [debouncedSearchCat])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await levelService.getAllLevels({ pageNumber: 0, pageSize: 10, name: debouncedSearchLevel })
                setLevelsData(response)
            } catch (error) {
                handleError(error, 'Failed to load levels')
            }
        }

        fetchData()
    }, [debouncedSearchLevel])

    const handleSave = async (formData: CourseReq) => {
        try {
            setLoading(true)
            if (!(formData.thumbnail instanceof File)) {
                form.reset({
                    ...formData,
                    thumbnail: ''
                })
            }
            setPreviewImage('')

            if (updateItem && updateItem.id) {
                await courseService.updateCourse(updateItem.id, form.getValues())
                toast.success('Update course successfully!')
            } else {
                await courseService.addCourse(form.getValues())
                form.reset()
                toast.success('Add new course successfully!')
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
        <div className="pt-3">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)}>
                        <div className="flex gap-3">
                            <div className='flex-1'>
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
                                <div className="grid grid-cols-3 items-end gap-3 mb-3">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        rules={{
                                            required: 'Price is required'
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input type='number'  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <ComboBoxField
                                        form={form}
                                        name={'categoryId'}
                                        isRequired={true}
                                        label={'Category'}
                                        data={categoriesData.content}
                                        searchKey={searchKey['category']}
                                        setSearchKey={(value) => setSearchKey((prev) => ({ ...prev, category: value }))}
                                    />
                                    <ComboBoxField
                                        form={form}
                                        name={'levelId'}
                                        isRequired={true}
                                        label={'Level'}
                                        data={levelsData.content}
                                        searchKey={searchKey['level']}
                                        setSearchKey={(value) => setSearchKey((prev) => ({ ...prev, level: value }))}
                                    />
                                </div>
                                {updateItem && (
                                    <div className="mb-3">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={updateItem.status as CourseStatus}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {courseStatusList.map((item) => (
                                                                <SelectItem key={item} value={item}>{getCourseStatusText(item)}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
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
                                            <Textarea placeholder="Description"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <QuillFormField
                            control={form.control}
                            name="audience"
                            label='Audience'
                            placeholder='Audience'
                        />
                        <QuillFormField
                            control={form.control}
                            name="target"
                            label='Target'
                            placeholder='Target'
                        />
                        <QuillFormField
                            control={form.control}
                            name="content"
                            label='Content'
                            placeholder='Content'
                        />
                        <div className="flex justify-end space-x-2">
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

export default CourseForm