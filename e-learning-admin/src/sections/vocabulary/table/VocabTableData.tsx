import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { buttonVariants } from '@/components/ui/button'
import { PencilLineIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyData from '@/components/common/EmptyData'
import { toast } from 'sonner'
import { VocabReq, VocabRes } from '@/models/vocabulary'
import vocabService from '@/services/vocabService'
import DeleteOneAlertDialog from '@/components/dialog/DeleteOneAlertDialog'
import DeleteManyDialog from '@/components/dialog/DeleteManyDialog'
import TableSkeleton from '@/components/table/TableSkeleton'
import { handleError } from '@/utils/handleError'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import { VocabStatus } from '@/enums/vocabStatus'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import Picture from '@/components/common/Picture'
import VocabStatusForm from '../form/VocabStatusForm'

type VocabTableDataProps = {
    fetching: boolean;
    data: PageResponse<VocabRes>;
    setData: (data: PageResponse<VocabRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const VocabTableData: React.FC<VocabTableDataProps> = ({
    fetching,
    data,
    setData,
    searchKey,
    setSearchKey,
    setSelectedSortField,
    setSelectedSortDir,
}) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loadingDelete, setLoadingDelete] = useState<{ [key: number]: boolean }>({});
    const [loadingStatus, setLoadingStatus] = useState<{ [key: number]: boolean }>({});
    const isAllSelected = selectedIds.length === data.content?.length;

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

    const handleDelete = async (id: number) => {
        try {
            setLoadingDelete(prev => ({ ...prev, [id]: true }))
            await vocabService.deleteVocab(id)
            const newData: PageResponse<VocabRes> = {
                ...data,
                content: data.content.filter(item => item.id !== id),
                totalElements: data.totalElements - 1,
            }
            setData(newData)
            toast.success('Delete vocab successfully!')
        } catch (error) {
            handleError(error, 'Delete vocab failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleDeleteMany = async (ids: number[]) => {
        try {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            await vocabService.deleteMultiVocabs(ids)
            setSelectedIds([])
            const newData: PageResponse<VocabRes> = {
                ...data,
                content: data.content.filter(item => !ids.includes(item.id)),
                totalElements: data.totalElements - ids.length,
            }
            setData(newData)
            toast.success('Delete many vocabs successfully!')
        } catch (error) {
            handleError(error, 'Delete many vocab failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    const handleUpdateStatus = async (item: VocabRes, newStatus: VocabStatus) => {
        try {
            setLoadingStatus(prev => ({ ...prev, [item.id]: true }))
            const req: VocabReq = {
                word: item.word,
                ipa: item.ipa,
                image: '',
                meaning: item.meaning,
                synonym: item.synonym,
                status: newStatus,
                levelId: item.levelId,
                definition: item.definition,
                example: item.example,
                collocation: item.collocation,
            }

            const response = await vocabService.updateVocab(item.id, req)
            const updatedItem = response;
            const index = data.content.findIndex((item) => item.id === item.id);

            if (index >= 0) {
                const updatedItems = [...data.content];
                updatedItems[index] = { ...updatedItems[index], ...updatedItem };

                setData({
                    ...data,
                    content: updatedItems,
                });
            }

            toast.success('Update status successfully')
        } catch (error) {
            handleError(error, 'Failed to update status')
        } finally {
            setLoadingStatus(prev => ({ ...prev, [item.id]: false }))
        }
    }

    return (
        <>
            {selectedIds.length > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                    <DeleteManyDialog
                        title='Delete many vocabs'
                        description='Are you sure you want to delete these vocabs? This action cannot be undone.'
                        loading={loadingDelete[0]}
                        onDelete={() => handleDeleteMany(selectedIds)}
                    />
                    <p className='text-muted-foreground'>Delete {selectedIds.length} vocab</p>
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
                            <TableHead>Image</TableHead>
                            <TableHead>IPA</TableHead>
                            <TableHead>Meaning</TableHead>
                            <TableHead>Definition</TableHead>
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
                                <TableCell>{item.meaning}</TableCell>
                                <TableCell>{item.definition}</TableCell>
                                <TableCell className="text-center">
                                    <VocabStatusForm
                                        status={item.status}
                                        loading={loadingStatus[item.id]}
                                        onStatusUpdate={(newStatus: VocabStatus) => handleUpdateStatus(item, newStatus)}
                                    />
                                </TableCell>
                                <TableCell className='space-x-1 text-end'>
                                    <Link to={`/vocabularies/${item.id}/update`} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
                                        <PencilLineIcon size={18} />
                                    </Link>
                                    <DeleteOneAlertDialog
                                        title='Delete vocab'
                                        description='Are you sure you want to delete this vocab? This action cannot be undone.'
                                        loading={loadingDelete[item.id]}
                                        onDelete={() => handleDelete(item.id)}
                                    />
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

export default VocabTableData
