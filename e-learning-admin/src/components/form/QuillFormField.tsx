import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

interface QuillFormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
}

const QuillFormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder
}: QuillFormFieldProps<T>) => {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ]
    };

    return (
        <div className="mb-3">
            <FormField
                control={control}
                name={name}
                rules={{
                    maxLength: {
                        value: 255,
                        message: `${label?.toUpperCase()} cannot be longer than 255 characters`
                    }
                }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <ReactQuill
                                theme="snow"
                                placeholder={placeholder}
                                value={field.value}
                                onChange={field.onChange}
                                modules={modules}
                                className="bg-white"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default QuillFormField