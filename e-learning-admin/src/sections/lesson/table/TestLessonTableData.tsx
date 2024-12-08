import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyData from '@/components/common/EmptyData'
import { TestRes } from '@/models/test'
import TableSkeleton from '@/components/table/TableSkeleton'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import DeleteManyDialog from '@/components/dialog/DeleteManyDialog'
import DeleteOneAlertDialog from '@/components/dialog/DeleteOneAlertDialog'
import { PencilLineIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import testService from '@/services/testService'
import { toast } from 'sonner'
import { handleError } from '@/utils/handleError'
import { fTimeLimit } from '@/utils/formatTime'

type TestTestTableDataProps = {
    fetching: boolean;
    data: PageResponse<TestRes>;
    setData: (data: PageResponse<TestRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const TestTestTableData: React.FC<TestTestTableDataProps> = ({
    fetching,
    data,
    setData,
    searchKey,
    setSearchKey,
    setSelectedSortField,
    setSelectedSortDir,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({});
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

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setLoadingDelete(prev => ({ ...prev, [id]: true }))
            await testService.deleteTest(id)
            const newData: PageResponse<TestRes> = {
                ...data,
                content: data.content.filter(item => item.id !== id),
                totalElements: data.totalElements - 1,
            }
            setData(newData)
            toast.success('Delete test successfully!')
        } catch (error) {
            handleError(error, 'Delete test failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleDeleteMany = async (ids: string[]) => {
        try {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            await testService.deleteMultiTests(ids)
            setSelectedIds([])
            const newData: PageResponse<TestRes> = {
                ...data,
                content: data.content.filter(item => !ids.includes(item.id)),
                totalElements: data.totalElements - ids.length,
            }
            setData(newData)
            toast.success('Delete many tests successfully!')
        } catch (error) {
            handleError(error, 'Delete many test failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    return (
        <>
            {selectedIds.length > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                    <DeleteManyDialog
                        title='Delete many tests'
                        description='Are you sure you want to delete these tests? This action cannot be undone.'
                        loading={loadingDelete[0]}
                        onDelete={() => handleDeleteMany(selectedIds)}
                    />
                    <p className='text-muted-foreground'>Delete {selectedIds.length} test</p>
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
                                Title {getSortIndicator(CommonSortField.NAME, sortState)}
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className='text-center'>Time limit</TableHead>
                            <TableHead className='text-center'>Passing score</TableHead>
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
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className='text-center'>{fTimeLimit(item.timeLimit)}</TableCell>
                                <TableCell className='text-center'>{item.passingScore}</TableCell>
                                <TableCell className='space-x-1 text-end'>
                                    <Link to={`update/${item.id}`} className={cn(buttonVariants({ size: 'icon', variant: 'outline' }))}>
                                        <PencilLineIcon size={18} />
                                    </Link>
                                    <DeleteOneAlertDialog
                                        title='Delete test'
                                        description='Are you sure you want to delete this test? This action cannot be undone.'
                                        loading={loadingDelete[item.id]}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={10} className='text-center'>
                                    <EmptyData message='No tests found' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    )
}

export default TestTestTableData
