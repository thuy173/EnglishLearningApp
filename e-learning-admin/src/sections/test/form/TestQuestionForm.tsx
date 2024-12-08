import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { QuestionType } from '@/enums/questionType';
import { Checkbox } from '@/components/ui/checkbox';

const TestQuestionForm: React.FC = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const addNewQuestion = () => {
        append({
            content: '',
            correctAnswers: [],
            explanation: '',
            options: [{ content: '' }],
            points: 1,
            type: QuestionType.MULTIPLE_CHOICE,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h5 className='font-semibold'>Questions list</h5>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addNewQuestion}
                    className="flex items-center gap-2"
                >
                    <Plus size={16} />
                    Add Question
                </Button>
            </div>

            {fields.map((field, questionIndex) => (
                <Card key={field.id} className="p-4 relative">
                    <div className="absolute right-2 top-2 flex gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(questionIndex)}
                        >
                            <Trash2 className="text-destructive" size={16} />
                        </Button>
                    </div>

                    <div className="space-y-4 pt-6">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-9">
                                <FormField
                                    control={control}
                                    name={`questions.${questionIndex}.content`}
                                    rules={{ required: 'Question content is required' }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question {questionIndex + 1}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter your question here"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-3">
                                <FormField
                                    control={control}
                                    name={`questions.${questionIndex}.points`}
                                    rules={{ required: 'Points are required' }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Points</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    {...field}
                                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <OptionsForm questionIndex={questionIndex} />

                        <FormField
                            control={control}
                            name={`questions.${questionIndex}.explanation`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Explanation (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Explain the correct answer"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
};

const OptionsForm = ({ questionIndex }: { questionIndex: number }) => {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${questionIndex}.options`
    });

    // Watch the options to get their current content
    const options = watch(`questions.${questionIndex}.options`);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <FormLabel>Answer Options</FormLabel>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ content: '' })}
                    className="flex items-center gap-2"
                >
                    <Plus size={16} />
                    Add Option
                </Button>
            </div>

            <div className="space-y-2">
                {fields.map((field, optionIndex) => (
                    <div key={field.id} className="flex gap-2 items-start">
                        <FormField
                            control={control}
                            name={`questions.${questionIndex}.options.${optionIndex}.content`}
                            rules={{ required: 'Option content is required' }}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            placeholder={`Option ${optionIndex + 1}`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`questions.${questionIndex}.correctAnswers`}
                            render={({ field: correctAnswersField }) => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            className="size-4 mt-3"
                                            checked={correctAnswersField.value?.includes(options[optionIndex]?.content)}
                                            onCheckedChange={(checked) => {
                                                const optionContent = options[optionIndex]?.content;
                                                const newValue = [...(correctAnswersField.value || [])];
                                                if (checked) {
                                                    if (optionContent && !newValue.includes(optionContent)) {
                                                        newValue.push(optionContent);
                                                    }
                                                } else {
                                                    const index = newValue.indexOf(optionContent);
                                                    if (index > -1) newValue.splice(index, 1);
                                                }
                                                correctAnswersField.onChange(newValue);
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {fields.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(optionIndex)}
                            >
                                <Trash2 size={16} className="text-destructive" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestQuestionForm;