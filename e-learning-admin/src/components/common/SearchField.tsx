import {  SearchIcon } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'

interface Props {
    searchKey: string;
    setSearchKey: (key: string) => void;
}

const SearchField: React.FC<Props> = ({searchKey, setSearchKey}) => {
   
    return (
        <div className="md:w-4/12 flex items-center relative mb-3">
            <SearchIcon size={18} className="absolute left-3" />
            <Input
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search..."
                className="w-full ps-10 pe-32"
            />
        </div>
    );
}

export default SearchField