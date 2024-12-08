import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { PencilLineIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyData from '@/components/common/EmptyData'
import { toast } from 'sonner'
import { LessonReq, LessonRes } from '@/models/lesson'
import lessonService from '@/services/lessonService'
import DeleteOneAlertDialog from '@/components/dialog/DeleteOneAlertDialog'
import DeleteManyDialog from '@/components/dialog/DeleteManyDialog'
import TableSkeleton from '@/components/table/TableSkeleton'
import { handleError } from '@/utils/handleError'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import { LessonStatus } from '@/enums/lessonStatus'
import Picture from '@/components/common/Picture'
import { Button } from '@/components/ui/button'
import LessonForm from '../form/LessonForm'
import LessonStatusForm from '../form/LessonStatusForm'
import { Link } from 'react-router-dom'

type LessonTableDataProps = {
    fetching: boolean;
    courseId: number;
    data: PageResponse<LessonRes>;
    setData: (data: PageResponse<LessonRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const LessonTableData: React.FC<LessonTableDataProps> = ({
    fetching,
    courseId,
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
    const [selectedItem, setSelectedItem] = React.useState<LessonRes>({} as LessonRes);
    const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({});

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
            await lessonService.deleteLesson(id)
            const newData: PageResponse<LessonRes> = {
                ...data,
                content: data.content.filter(item => item.id !== id),
                totalElements: data.totalElements - 1,
            }
            setData(newData)
            toast.success('Delete lesson successfully!')
        } catch (error) {
            handleError(error, 'Delete lesson failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleDeleteMany = async (ids: number[]) => {
        try {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            await lessonService.deleteMultiLessons(ids)
            setSelectedIds([])
            const newData: PageResponse<LessonRes> = {
                ...data,
                content: data.content.filter(item => !ids.includes(item.id)),
                totalElements: data.totalElements - ids.length,
            }
            setData(newData)
            toast.success('Delete many lessons successfully!')
        } catch (error) {
            handleError(error, 'Delete many lesson failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    const handleEditClick = (item: LessonRes) => {
        setSelectedItem(item)
        setOpenDialogs(prev => ({ ...prev, [item.id]: true }));
    };

    const handleCloseDialog = (id: number) => {
        setOpenDialogs(prev => ({ ...prev, [id]: false }));
    };

    const handleUpdateStatus = async (item: LessonRes, newStatus: LessonStatus) => {
        try {
            setLoadingStatus(prev => ({ ...prev, [item.id]: true }))
            const req: LessonReq = {
                name: item.name,
                thumbnail: '',
                description: item.description,
                status: newStatus,
                courseId: courseId,
            }

            const response = await lessonService.updateLesson(item.id, req)
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
                        title='Delete many lessons'
                        description='Are you sure you want to delete these lessons? This action cannot be undone.'
                        loading={loadingDelete[0]}
                        onDelete={() => handleDeleteMany(selectedIds)}
                    />
                    <p className='text-muted-foreground'>Delete {selectedIds.length} lesson</p>
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
                            <TableHead>Description</TableHead>
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
                                    <Link to={`/courses/${courseId}/lessons/${item.id}`}
                                        className='font-semibold hover:underline cursor-pointer'
                                    >
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Picture src={item.thumbnail} alt={item.name} className='w-44 h-24 object-contain border' />
                                </TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className="text-center">
                                    <LessonStatusForm
                                        status={item.status}
                                        loading={loadingStatus[item.id]}
                                        onStatusUpdate={(newStatus: LessonStatus) => handleUpdateStatus(item, newStatus)}
                                    />
                                </TableCell>
                                <TableCell className='space-x-1 text-end'>
                                    <Dialog open={openDialogs[item.id]} onOpenChange={(open) => setOpenDialogs(prev => ({ ...prev, [item.id]: open }))}>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant='outline'
                                                onClick={() => handleEditClick(item)}
                                                title='Update'
                                            >
                                                <PencilLineIcon size={18} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className='max-w-xl pb-4'>
                                            <DialogHeader>
                                                <DialogTitle>Update lesson</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <LessonForm
                                                    lessonsData={data}
                                                    setLessonsData={setData}
                                                    courseId={courseId}
                                                    updateItem={selectedItem}
                                                    onClose={() => handleCloseDialog(item.id)}
                                                />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <DeleteOneAlertDialog
                                        title='Delete lesson'
                                        description='Are you sure you want to delete this lesson? This action cannot be undone.'
                                        loading={loadingDelete[item.id]}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={10} className='text-center'>
                                    <EmptyData message='No lessons found' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    )
}

export default LessonTableData
