import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SelectRowShowProps = {
    selectedItem: string;
    onSelect: (value: string) => void;
};

const SelectRowShow: React.FC<SelectRowShowProps> = ({ selectedItem, onSelect }) => {
    const handleSelect = (value: string) => {
        onSelect(value);
    };

    return (
        <Select value={selectedItem} onValueChange={handleSelect}>
            <SelectTrigger className="w-[80px]" aria-label='Select page size'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {["5", "10", "20", "50", "100"].map((value) => (
                        <SelectItem key={value} className="pl-8" value={value}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectRowShow;
