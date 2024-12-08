import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { Button } from '@/components/ui/button'
import { PencilLineIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EmptyData from '@/components/common/EmptyData'
import { toast } from 'sonner'
import { LevelReq, LevelRes } from '@/models/level'
import levelService from '@/services/levelService'
import LevelForm from '../form/LevelForm'
import DeleteOneAlertDialog from '@/components/dialog/DeleteOneAlertDialog'
import DeleteManyDialog from '@/components/dialog/DeleteManyDialog'
import TableSkeleton from '@/components/table/TableSkeleton'
import { handleError } from '@/utils/handleError'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import UpdateStatusForm from '@/components/form/UpdateStatusForm'

type LevelTableDataProps = {
    fetching: boolean;
    data: PageResponse<LevelRes>;
    setData: (data: PageResponse<LevelRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const LevelTableData: React.FC<LevelTableDataProps> = ({
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
    const [selectedItem, setSelectedItem] = React.useState<LevelRes>({} as LevelRes);
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
            await levelService.deleteLevel(id)
            const newData: PageResponse<LevelRes> = {
                ...data,
                content: data.content.filter(item => item.id !== id),
                totalElements: data.totalElements - 1,
            }
            setData(newData)
            toast.success('Delete level successfully!')
        } catch (error) {
            handleError(error, 'Delete level failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleDeleteMany = async (ids: number[]) => {
        try {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            await levelService.deleteMultiLevels(ids)
            setSelectedIds([])
            const newData: PageResponse<LevelRes> = {
                ...data,
                content: data.content.filter(item => !ids.includes(item.id)),
                totalElements: data.totalElements - ids.length,
            }
            setData(newData)
            toast.success('Delete many levels successfully!')
        } catch (error) {
            handleError(error, 'Delete many level failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    const handleEditClick = (item: LevelRes) => {
        setSelectedItem(item)
        setOpenDialogs(prev => ({ ...prev, [item.id]: true }));
    };

    const handleCloseDialog = (id: number) => {
        setOpenDialogs(prev => ({ ...prev, [id]: false }));
    };

    const handleUpdateStatus = async (item: LevelRes, newStatus: boolean) => {
        try {
            setLoadingStatus(prev => ({ ...prev, [item.id]: true }))
            const req: LevelReq = {
                name: item.name,
                description: item.description,
                status: newStatus
            }

            await levelService.updateLevel(item.id, req)
            const updatedItem = req;
            const index = data.content.findIndex((updateItem) => updateItem.id === item.id);

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
                        title='Delete many levels'
                        description='Are you sure you want to delete these levels? This action cannot be undone.'
                        loading={loadingDelete[0]}
                        onDelete={() => handleDeleteMany(selectedIds)}
                    />
                    <p className='text-muted-foreground'>Delete {selectedIds.length} level</p>
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
                            <TableHead>Description</TableHead>
                            <TableHead className='text-end'
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
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className="text-end">
                                    <UpdateStatusForm
                                        status={item.status}
                                        onStatusUpdate={(newStatus: boolean) => handleUpdateStatus(item, newStatus)}
                                        loading={loadingStatus[item.id]}
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
                                                <DialogTitle>Update level</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <LevelForm
                                                    levelsData={data}
                                                    setLevelsData={setData}
                                                    updateItem={selectedItem}
                                                    onClose={() => handleCloseDialog(item.id)}
                                                />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <DeleteOneAlertDialog
                                        title='Delete level'
                                        description='Are you sure you want to delete this level? This action cannot be undone.'
                                        loading={loadingDelete[item.id]}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={10} className='text-center'>
                                    <EmptyData message='No levels found' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    )
}

export default LevelTableData