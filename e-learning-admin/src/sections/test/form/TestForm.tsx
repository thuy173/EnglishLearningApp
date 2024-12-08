import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { TestReq, TestRes } from '@/models/test'
import testService from '@/services/testService'
import { handleError } from '@/utils/handleError'
import { QuestionType } from '@/enums/questionType'
import QuestionForm from './TestQuestionForm'
import ComboBoxField from '@/components/form/ComboBoxField'
import { PageResponse } from '@/models/common/pageResponse'
import { LevelRes } from '@/models/level'
import useDebounce from '@/hooks/useDebounce'
import levelService from '@/services/levelService'

type TestFormProps = {
    lessonId: number;
    updateItem?: TestRes;
}

const TestForm: React.FC<TestFormProps> = ({ lessonId, updateItem }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [levelsData, setLevelsData] = useState<PageResponse<LevelRes>>({} as PageResponse<LevelRes>);
    const [searchKey, setSearchKey] = useState<string>('');
    const debouncedSearchLevel = useDebounce(searchKey, 500);

    const form = useForm<TestReq>({
        defaultValues: {
            title: '',
            description: '',
            lessonId: lessonId,
            levelId: undefined,
            passingScore: 0,
            timeLimit: 0,
            questions: [{
                content: '',
                correctAnswers: [],
                explanation: '',
                options: [{
                    content: '',
                }],
                points: 0,
                type: QuestionType.MULTIPLE_CHOICE
            }]
        },
    })

    useEffect(() => {
        if (updateItem && updateItem.id) {
            form.reset({
                title: updateItem.title,
                description: updateItem.description,
                lessonId: lessonId,
                levelId: updateItem.levelId,
                passingScore: updateItem.passingScore,
                timeLimit: updateItem.timeLimit,
                questions: updateItem.questions
            })
        }
    }, [updateItem, form, lessonId])

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

    const handleSave = async () => {
        try {
            setLoading(true)
            if (updateItem && updateItem.id) {
                await testService.updateTest(updateItem.id, form.getValues())
                toast.success('Update test successfully!')
            } else {
                await testService.addTest(form.getValues())
                form.reset()
                toast.success('Add new test successfully!')
            }
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
                        <div className="flex gap-3">
                            <div className="flex-1 mb-3">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    rules={{
                                        required: 'Title is required'
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-end gap-3 mb-3">
                                <ComboBoxField
                                    form={form}
                                    name={'levelId'}
                                    isRequired={true}
                                    label={'Level'}
                                    data={levelsData.content}
                                    searchKey={searchKey}
                                    setSearchKey={setSearchKey}
                                />
                                <FormField
                                    control={form.control}
                                    name="timeLimit"
                                    rules={{
                                        required: 'Time limit is required'
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time limit</FormLabel>
                                            <FormControl>
                                                <Input type='number'  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="passingScore"
                                    rules={{
                                        required: 'Passing score is required'
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Passing score</FormLabel>
                                            <FormControl>
                                                <Input type='number'  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                        <QuestionForm />
                        <div className="flex justify-end space-x-2 mt-5">
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

export default TestForm