import PreviewUpload from '@/components/common/PreviewUpload'
import ComboBoxField from '@/components/form/ComboBoxField'
import DragDropField from '@/components/form/DragDropField'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { VocabStatus } from '@/enums/vocabStatus'
import useDebounce from '@/hooks/useDebounce'
import { PageResponse } from '@/models/common/pageResponse'
import { LevelRes } from '@/models/level'
import { VocabAiReq, VocabReq } from '@/models/vocabulary'
import levelService from '@/services/levelService'
import uploadService from '@/services/uploadService'
import vocabService from '@/services/vocabService'
import { handleError } from '@/utils/handleError'
import { Sparkle, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type LoadingKeys = 'generating' | 'submitting' | 'uploading'

const GenerateVocab: React.FC = () => {
    const [loading, setLoading] = useState<{ [K in LoadingKeys]: boolean }>({
        submitting: false,
        generating: false,
        uploading: false
    })
    const [levelsData, setLevelsData] = useState<PageResponse<LevelRes>>({} as PageResponse<LevelRes>);
    const [selectedLevel, setSelectedLevel] = useState<LevelRes>({} as LevelRes);
    const [searchKey, setSearchKey] = useState<string>('');
    const debouncedSearchLevel = useDebounce(searchKey, 500);
    const [uploadFile, setUploadFile] = useState<{ [key: number]: File | null }>({});

    const form = useForm<VocabAiReq>({
        defaultValues: {
            count: 3,
            levelId: undefined,
            levelName: '',
            topic: ''
        },
    })

    const formVocabs = useForm<{ vocabs: VocabReq[] }>({
        defaultValues: {
            vocabs: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: formVocabs.control,
        name: "vocabs"
    });

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

    const handleGenerate = async (formData: VocabAiReq) => {
        try {
            setLoading(prev => ({ ...prev, generating: true }))
            form.reset({
                ...formData,
                levelName: selectedLevel.name
            })
            const response = await vocabService.generateVocabs(form.getValues())

            formVocabs.setValue('vocabs', []);

            const vocabFormDefaults = response.map(vocab => ({
                word: vocab.word,
                ipa: vocab.ipa,
                meaning: vocab.meaning,
                synonym: vocab.synonym || '',
                definition: vocab.definition || '',
                image: vocab.image || '',
                status: VocabStatus.ACTIVE,
                levelId: selectedLevel.id,
                example: vocab.example || '',
                collocation: vocab.collocation || ''
            }))

            vocabFormDefaults.forEach(vocab => append(vocab))

            toast.success(`Generated ${response.length} vocabularies`)
        } catch (error) {
            handleError(error, 'Failed to generate vocabularies')
        } finally {
            setLoading(prev => ({ ...prev, generating: false }))
        }
    }

    const handleAddVocabs = async (data: { vocabs: VocabReq[] }) => {
        try {
            setLoading(prev => ({ ...prev, submitting: true }))
            await vocabService.addManyVocabs(data.vocabs)
            toast.success('Created vocabularies successfully')

            formVocabs.setValue('vocabs', [])
        } catch (error) {
            handleError(error, 'Failed to create vocabularies')
        } finally {
            setLoading(prev => ({ ...prev, submitting: false }))
        }
    }

    const handleImageChange = async (file: File, index: number) => {
        if (file) {
            try {
                setLoading(prev => ({ ...prev, uploading: true }))
                setUploadFile(prev => ({ ...prev, [index]: file }))

                const uploadUrl = await uploadService.uploadFile(file);

                formVocabs.setValue(`vocabs.${index}.image`, uploadUrl);
            } catch (error) {
                handleError(error, 'Failed to upload image');
                formVocabs.setValue(`vocabs.${index}.image`, '');
            } finally {
                setLoading(prev => ({ ...prev, uploading: false }))
            }
        };
    }


    return (
        <div className="container pb-10">
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/vocabularies">Vocabularies</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create with AI</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3 mb-5">
                <h4 className='font-extrabold'>Create with AI</h4>
            </div>
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleGenerate)}>
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="count"
                                rules={{
                                    required: 'Count is required'
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Count</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Count" {...field} />
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
                                setSelectedItem={setSelectedLevel}
                            />
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    rules={{
                                        required: 'Topic is required'
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Topic</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Topic" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="pt-8">
                                <Button type='submit' size='lg' className='px-5' loading={loading.generating}>
                                    <Sparkle size={18} className='me-1' />
                                    Generate
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </FormProvider>
            {loading.generating && (
                <div className="space-y-2 mt-5">
                    <Skeleton className="h-4 w-1/3" />
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-full" />
                    ))}
                </div>
            )}
            {(fields.length > 0 && !loading.generating) && (
                <FormProvider {...formVocabs}>
                    <Form {...formVocabs}>
                        <form onSubmit={formVocabs.handleSubmit(handleAddVocabs)} className="mt-6">
                            <h5 className="text-lg font-semibold mb-4">Generated Vocabularies</h5>
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="border p-4 rounded-lg bg-white">
                                        <div className="flex flex-wrap-reverse gap-3">
                                            <div className='flex-1'>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <FormField
                                                        control={formVocabs.control}
                                                        name={`vocabs.${index}.word`}
                                                        rules={{ required: 'Word is required' }}
                                                        render={({ field: inputField }) => (
                                                            <FormItem>
                                                                <FormLabel>Word</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Word" {...inputField} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={formVocabs.control}
                                                        name={`vocabs.${index}.ipa`}
                                                        rules={{ required: 'IPA is required' }}
                                                        render={({ field: inputField }) => (
                                                            <FormItem>
                                                                <FormLabel>IPA</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Pronunciation" {...inputField} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <FormField
                                                        control={formVocabs.control}
                                                        name={`vocabs.${index}.meaning`}
                                                        rules={{ required: 'Meaning is required' }}
                                                        render={({ field: inputField }) => (
                                                            <FormItem>
                                                                <FormLabel>Meaning</FormLabel>
                                                                <FormControl>
                                                                    <Textarea placeholder="Meaning" {...inputField} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={formVocabs.control}
                                                        rules={{ required: 'Definition is required' }}
                                                        name={`vocabs.${index}.definition`}
                                                        render={({ field: inputField }) => (
                                                            <FormItem>
                                                                <FormLabel>Definition</FormLabel>
                                                                <FormControl>
                                                                    <Textarea placeholder="Definition" {...inputField} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <FormField
                                                    control={formVocabs.control}
                                                    name={`vocabs.${index}.synonym`}
                                                    render={({ field: inputField }) => (
                                                        <FormItem>
                                                            <FormLabel>Synonym</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Synonym" {...inputField} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={formVocabs.control}
                                                    name={`vocabs.${index}.collocation`}
                                                    render={({ field: inputField }) => (
                                                        <FormItem>
                                                            <FormLabel>Collocation</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Collocation" {...inputField} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={formVocabs.control}
                                                    name={`vocabs.${index}.example`}
                                                    rules={{ required: 'Example is required' }}
                                                    render={({ field: inputField }) => (
                                                        <FormItem>
                                                            <FormLabel>Example</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Example" {...inputField} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className='w-96'>
                                                {uploadFile[index] ? (
                                                    <PreviewUpload
                                                        onDelete={() => {
                                                            setUploadFile(prev => ({ ...prev, [index]: null }));
                                                            formVocabs.setValue(`vocabs.${index}.image`, '');
                                                        }}
                                                        file={uploadFile[index]}
                                                    />
                                                ) : (
                                                    <div className="mb-3">
                                                        <DragDropField
                                                            form={formVocabs}
                                                            name={`vocabs.${index}.image`}
                                                            isRequired={false}
                                                            label={'Image'}
                                                            description={'PNG, JPG, WEBP,...'}
                                                            accept='image/*'
                                                            handleFileChange={(file) => handleImageChange(file, index)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={16} className="mr-2" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {fields.length > 0 && (
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        type='submit'
                                        size='lg'
                                        className='px-5'
                                        loading={loading.submitting}
                                        disabled={loading.uploading}
                                    >
                                        {loading.uploading ? 'Uploading images' : 'Add Vocabularies'}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </Form>
                </FormProvider>
            )}
        </div>
    )
}

export default GenerateVocab