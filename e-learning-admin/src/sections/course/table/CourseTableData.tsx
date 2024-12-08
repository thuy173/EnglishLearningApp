import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { buttonVariants } from '@/components/ui/button'
import { PencilLineIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyData from '@/components/common/EmptyData'
import { toast } from 'sonner'
import { CourseShortRes } from '@/models/course'
import courseService from '@/services/courseService'
import DeleteOneAlertDialog from '@/components/dialog/DeleteOneAlertDialog'
import DeleteManyDialog from '@/components/dialog/DeleteManyDialog'
import TableSkeleton from '@/components/table/TableSkeleton'
import { handleError } from '@/utils/handleError'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import { getCourseStatusStyles, getCourseStatusText } from '@/enums/courseStatus'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import Picture from '@/components/common/Picture'

type CourseTableDataProps = {
    fetching: boolean;
    data: PageResponse<CourseShortRes>;
    setData: (data: PageResponse<CourseShortRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const CourseTableData: React.FC<CourseTableDataProps> = ({
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
            await courseService.deleteCourse(id)
            const newData: PageResponse<CourseShortRes> = {
                ...data,
                content: data.content.filter(item => item.id !== id),
                totalElements: data.totalElements - 1,
            }
            setData(newData)
            toast.success('Delete course successfully!')
        } catch (error) {
            handleError(error, 'Delete course failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleDeleteMany = async (ids: number[]) => {
        try {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            await courseService.deleteMultiCourses(ids)
            setSelectedIds([])
            const newData: PageResponse<CourseShortRes> = {
                ...data,
                content: data.content.filter(item => !ids.includes(item.id)),
                totalElements: data.totalElements - ids.length,
            }
            setData(newData)
            toast.success('Delete many courses successfully!')
        } catch (error) {
            handleError(error, 'Delete many course failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    return (
        <>
            {selectedIds.length > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                    <DeleteManyDialog
                        title='Delete many courses'
                        description='Are you sure you want to delete these courses? This action cannot be undone.'
                        loading={loadingDelete[0]}
                        onDelete={() => handleDeleteMany(selectedIds)}
                    />
                    <p className='text-muted-foreground'>Delete {selectedIds.length} course</p>
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
                                <TableCell>
                                    <Link to={`/courses/${item.id}/lessons`} className='font-semibold hover:underline cursor-pointer'>{item.name}</Link>
                                </TableCell>
                                <TableCell>
                                    <Picture src={item.thumbnail} alt={item.name} className='w-44 h-24 object-contain border' />
                                </TableCell>
                                <TableCell>{item.categoryName}</TableCell>
                                <TableCell>{item.levelName}</TableCell>
                                <TableCell className="text-center">
                                    <span className={cn("font-semibold text-sm px-2 rounded",
                                        getCourseStatusStyles(item.status))}
                                    >
                                        {getCourseStatusText(item.status)}
                                    </span>
                                </TableCell>
                                <TableCell className='space-x-1 text-end'>
                                    <Link to={`/courses/${item.id}/update`} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
                                        <PencilLineIcon size={18} />
                                    </Link>
                                    <DeleteOneAlertDialog
                                        title='Delete course'
                                        description='Are you sure you want to delete this course? This action cannot be undone.'
                                        loading={loadingDelete[item.id]}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={10} className='text-center'>
                                    <EmptyData message='No courses found' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    )
}

export default CourseTableData
