/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CategoryRes } from '@/models/category'
import { LevelRes } from '@/models/level'
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn, FieldValues, Path } from 'react-hook-form'

type ComboBoxFieldProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: string;
    isRequired: boolean;
    label?: string;
    data: CategoryRes[] | LevelRes[];
    searchKey: string;
    setSearchKey: (key: string) => void;
    align?: 'start' | 'end' | 'center';
    onChange?: (id: number) => void;
    setSelectedItem?: (item: CategoryRes | LevelRes) => void;
}

const ComboBoxField = <T extends FieldValues>({
    form,
    name,
    isRequired,
    label,
    data,
    searchKey,
    setSearchKey,
    align = 'start',
    onChange,
    setSelectedItem
}: ComboBoxFieldProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleSelect = (item: CategoryRes | LevelRes) => {
        form.setValue(name as Path<T>, item.id as any);
        setOpen(false);

        if (onChange) {
            onChange(item.id);
        }

        if (setSelectedItem) {
            setSelectedItem(item)
        }
    };

    return (
        <FormField
            control={form.control}
            name={name as Path<T>}
            rules={isRequired ? { required: `${label} là bắt buộc` } : undefined}
            render={({ field }) => (
                <FormItem className="flex flex-col space-y-4">
                    <FormLabel>{label}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between py-5",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? data?.find(
                                            (item) => item.id === field.value
                                        )?.name
                                        : `Chọn ${label?.toLowerCase()}`}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align={align}>
                            <Command className='border'>
                                <div className="flex items-center relative border-b" >
                                    <SearchIcon size={16} className="absolute left-2 opacity-50" />
                                    <Input
                                        placeholder={`Tìm kiếm ${label?.toLowerCase()}`}
                                        value={searchKey}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                        className="border-0 outline-0 py-0 ps-8"
                                    />
                                </div>
                                <CommandList>
                                    <CommandEmpty>{`Không tìm thấy ${label?.toLowerCase()}`}</CommandEmpty>
                                    <CommandGroup>
                                        {data?.map((item) => (
                                            <CommandItem
                                                value={item.id.toString()}
                                                key={item.id}
                                                onSelect={() => handleSelect(item)}
                                            >
                                                {item.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        item.id === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default ComboBoxField;
