import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from 'lucide-react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type DragDropFieldProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    isRequired: boolean;
    label?: string;
    description?: string;
    accept?: string;
    handleFileChange: (file: File) => void;
};

const DragDropField = <T extends FieldValues>({
    form,
    name,
    isRequired,
    label,
    description,
    accept,
    handleFileChange
}: DragDropFieldProps<T>) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleFile = useCallback((file: File) => {
        handleFileChange(file);
        form.setValue(name, file as unknown as PathValue<T, Path<T>>, { shouldValidate: true, shouldDirty: true });
    }, [form, handleFileChange, name]);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    return (
        <FormField
            control={form.control}
            name={name}
            rules={isRequired ? { required: `${label} là bắt buộc` } : undefined}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div
                            id="dropzone"
                            className={`w-full border-2 rounded-lg p-6 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed'
                                }`}
                            onDragOver={onDragOver}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadIcon size={32} className="mx-auto text-muted-foreground" />
                            <p className="mt-2 text-gray-500">
                                {description} <br />
                                hoặc{' '}
                                <Label className="text-blue-500 font-medium">
                                    nhấp vào đây để tải lên
                                </Label>
                            </p>
                            <p className="mt-2 text-sm text-gray-400">{description}</p>
                            <Input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleFile(file);
                                    }
                                }}
                                accept={accept}
                                className="hidden"
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DragDropField;
