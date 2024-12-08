import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { PageResponse } from '@/models/common/pageResponse'
import { LevelReq, LevelRes } from '@/models/level'
import levelService from '@/services/levelService'
import { handleError } from '@/utils/handleError'

type LevelFormProps = {
    levelsData: PageResponse<LevelRes>;
    setLevelsData: (data: PageResponse<LevelRes>) => void;
} & (
        | {
            updateItem: LevelRes;
            onClose: (id: number) => void;
        }
        | {
            updateItem?: undefined;
            onClose?: undefined;
        }
    );

const LevelForm: React.FC<LevelFormProps> = ({ levelsData, setLevelsData, updateItem, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<LevelReq>({
        defaultValues: {
            name: '',
            description: '',
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

    const handleSave = async () => {
        try {
            setLoading(true)
            if (updateItem && updateItem.id) {
                await levelService.updateLevel(updateItem.id, form.getValues())
                const updatedItem = form.getValues();
                const index = levelsData.content.findIndex((item) => item.id === updateItem.id);

                if (index >= 0) {
                    const updatedItems = [...levelsData.content];
                    updatedItems[index] = { ...updatedItems[index], ...updatedItem };

                    setLevelsData({
                        ...levelsData,
                        content: updatedItems,
                    });
                }
                toast.success('Update level successfully!')
                onClose(updateItem.id)
            } else {
                const response = await levelService.addLevel(form.getValues())
                setLevelsData({
                    ...levelsData,
                    content: [...levelsData.content, response],
                    totalElements: levelsData.totalElements + 1
                })
                form.reset()
                toast.success('Add new level successfully!')
            }
        } catch (error) {
            handleError(error, 'Error!')
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

export default LevelForm