import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { VocabReq, VocabRes } from '@/models/vocabulary'
import vocabService from '@/services/vocabService'
import { handleError } from '@/utils/handleError'
import ComboBoxField from '@/components/form/ComboBoxField'
import { PageResponse } from '@/models/common/pageResponse'
import { LevelRes } from '@/models/level'
import useDebounce from '@/hooks/useDebounce'
import levelService from '@/services/levelService'
import DragDropField from '@/components/form/DragDropField'
import PreviewUpload from '@/components/common/PreviewUpload'
import { VocabStatus } from '@/enums/vocabStatus'

type VocabFormProps = {
    updateItem?: VocabRes;
}

const VocabForm: React.FC<VocabFormProps> = ({ updateItem }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [levelsData, setLevelsData] = useState<PageResponse<LevelRes>>({} as PageResponse<LevelRes>);
    const [searchKey, setSearchKey] = useState<string>('');
    const [previewImage, setPreviewImage] = useState<string>('');

    const debouncedSearchLevel = useDebounce(searchKey, 500);

    const form = useForm<VocabReq>({
        defaultValues: {
            word: '',
            ipa: '',
            meaning: '',
            synonym: '',
            definition: '',
            image: '',
            status: VocabStatus.ACTIVE,
            levelId: 0,
            example: '',
            collocation: ''
        },
    })

    useEffect(() => {
        if (updateItem && updateItem.id) {
            form.reset({
                word: updateItem.word,
                ipa: updateItem.ipa,
                image: updateItem.image,
                meaning: updateItem.meaning,
                synonym: updateItem.synonym,
                status: updateItem.status,
                levelId: updateItem.levelId,
                definition: updateItem.definition,
                example: updateItem.example,
                collocation: updateItem.collocation,
            })
            setPreviewImage(updateItem.image)
        }
    }, [updateItem, form])

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

    const handleSave = async (formData: VocabReq) => {
        try {
            setLoading(true)
            if (!(formData.image instanceof File)) {
                form.reset({
                    ...formData,
                    image: ''
                })
            }

            if (updateItem && updateItem.id) {
                await vocabService.updateVocab(updateItem.id, form.getValues())
                toast.success('Update vocab successfully!')
            } else {
                await vocabService.addVocab(form.getValues())
                form.reset()
                toast.success('Add new vocab successfully!')
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
                        <div className="flex flex-wrap-reverse gap-3">
                            <div className='flex-1'>
                                <div className="grid grid-cols-3 items-end gap-3 mb-3">
                                    <FormField
                                        control={form.control}
                                        name="word"
                                        rules={{
                                            required: 'Word is required'
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Word</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Word" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ipa"
                                        rules={{
                                            required: 'Ipa is required'
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ipa</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ipa" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <ComboBoxField
                                        form={form}
                                        name={'levelId'}
                                        isRequired={true}
                                        label={'Level'}
                                        data={levelsData.content}
                                        searchKey={searchKey}
                                        setSearchKey={setSearchKey}
                                    />
                                </div>
                                <div className="grid grid-cols-2 items-end gap-3 mb-3">
                                    <FormField
                                        control={form.control}
                                        name="meaning"
                                        rules={{
                                            maxLength: {
                                                value: 255,
                                                message: 'Meaning cannot be longer than 255 character'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meaning</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Meaning"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="definition"
                                        rules={{
                                            maxLength: {
                                                value: 255,
                                                message: 'Definition cannot be longer than 255 character'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Definition</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Definition"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='w-96'>
                                {previewImage ? (
                                    <PreviewUpload
                                        onDelete={() => {
                                            const newPreviewImage = '';
                                            setPreviewImage(newPreviewImage);
                                            form.setValue(`image`, '');
                                        }}
                                        currentLink={updateItem?.image}
                                        file={form.getValues('image')}
                                    />
                                ) : (
                                    <div className="mb-3">
                                        <DragDropField
                                            form={form}
                                            name={`image`}
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
                                name="synonym"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Synonym</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Synonym" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="collocation"
                                rules={{
                                    maxLength: {
                                        value: 255,
                                        message: 'Collocation cannot be longer than 255 character'
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Collocation</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Collocation"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name="example"
                                rules={{
                                    maxLength: {
                                        value: 255,
                                        message: 'Example cannot be longer than 255 character'
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Example</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Example"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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

export default VocabForm