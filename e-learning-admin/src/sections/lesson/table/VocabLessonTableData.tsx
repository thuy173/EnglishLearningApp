import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyData from '@/components/common/EmptyData'
import { toast } from 'sonner'
import { VocabRes } from '@/models/vocabulary'
import TableSkeleton from '@/components/table/TableSkeleton'
import { handleError } from '@/utils/handleError'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import { getVocabStatusStyles, getVocabStatusText } from '@/enums/vocabStatus'
import { cn } from '@/lib/utils'
import Picture from '@/components/common/Picture'
import lessonVocabService from '@/services/lessonVocabService'
import { LessonVocabReq } from '@/models/lessonVocab'
import { Button } from '@/components/ui/button'

type VocabLessonTableDataProps = {
    fetching: boolean;
    lessonId: number;
    data: PageResponse<VocabRes>;
    setData: (data: PageResponse<VocabRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const VocabLessonTableData: React.FC<VocabLessonTableDataProps> = ({
    fetching,
    lessonId,
    data,
    setData,
    searchKey,
    setSearchKey,
    setSelectedSortField,
    setSelectedSortDir,
}) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const isAllSelected = selectedIds.length === data.content?.length;
    const [loadingAddVocab, setLoadingAddVocab] = useState<{ [key: number]: boolean }>({});

    const [sortState, setSortState] = useState<SortState<CommonSortField>>({
        column: null,
        direction: null,
    });

    const { handleSort, getSortIndicator } = createSortHandlers<CommonSortField>(
        setSortState,
        setSelectedSortField,
        setSelectedSortDir
    );

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(data.content?.map(item => item.id) || []);
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleAddVocab = async (ids: number[]) => {
        try {
            setLoadingAddVocab(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            const req: LessonVocabReq = {
                lessonId: lessonId,
                vocabIds: ids
            }
            await lessonVocabService.addLessonVocab(req)
            setSelectedIds([])
            // const newData: PageResponse<LessonRes> = {
            //     ...data,
            //     content: data.content.filter(item => !ids.includes(item.id)),
            //     totalElements: data.totalElements - ids.length,
            // }
            // setData(newData)
            toast.success('Add vocabularies to lesson successfully!')
        } catch (error) {
            handleError(error, 'Add vocabularies to lesson failed!')
        } finally {
            setLoadingAddVocab(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    return (
        <>
            {selectedIds.length > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                    <Button
                        title='Add vocabularies'
                        loading={loadingAddVocab[0]}
                        onClick={() => handleAddVocab(selectedIds)}
                    >Add vocabularies</Button>
                    <p className='text-muted-foreground'>AddVocab {selectedIds.length} vocab</p>
                </div>
            ) : <SearchField searchKey={searchKey} setSearchKey={setSearchKey} />}
            <div className="rounded-lg overflow-hidden border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-8">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label='Select all'
                                />
                            </TableHead>
                            <TableHead onClick={() => handleSort(CommonSortField.NAME)}>
                                Name {getSortIndicator(CommonSortField.NAME, sortState)}
                            </TableHead>
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead className='text-center'
                                onClick={() => handleSort(CommonSortField.STATUS)}
                            >
                                Status {getSortIndicator(CommonSortField.STATUS, sortState)}
                            </TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fetching ? <TableSkeleton columns={5} rows={5} /> : data.totalElements > 0 ? data.content?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium text-center dark:text-white">
                                    <Checkbox
                                        checked={selectedIds.includes(item.id)}
                                        onCheckedChange={() => toggleSelect(item.id)}
                                        aria-label='Select one'
                                    />
                                </TableCell>
                                <TableCell>{item.word}</TableCell>
                                <TableCell>
                                    <Picture src={item.image} alt={item.word} className='w-44 h-24 object-contain border' />
                                </TableCell>
                                <TableCell>{item.ipa}</TableCell>
                                <TableCell>{item.definition}</TableCell>
                                <TableCell className="text-center">
                                    <span className={cn("font-semibold text-sm px-2 rounded",
                                        getVocabStatusStyles(item.status))}
                                    >
                                        {getVocabStatusText(item.status)}
                                    </span>
                                </TableCell>
                                <TableCell className='space-x-1 text-end'>
                                    <Button
                                        loading={loadingAddVocab[item.id]}
                                        onClick={() => handleAddVocab([item.id])}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={10} className='text-center'>
                                    <EmptyData message='No vocabs found' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    )
}

export default VocabLessonTableData
