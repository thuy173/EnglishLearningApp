import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { PageResponse } from '@/models/common/pageResponse'
import { Button } from '@/components/ui/button'
import { PencilLineIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EmptyData from '@/components/common/EmptyData'
import { toast } from 'sonner'
import { UserRes, UserUpdateReq } from '@/models/user'
import userService from '@/services/userService'
import DeleteOneAlertDialog from '@/components/dialog/DeleteOneAlertDialog'
import DeleteManyDialog from '@/components/dialog/DeleteManyDialog'
import TableSkeleton from '@/components/table/TableSkeleton'
import { handleError } from '@/utils/handleError'
import { createSortHandlers, SortState } from '@/utils/tableSortUtils'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import SearchField from '@/components/common/SearchField'
import { SortDirection } from '@/enums/sortDirection'
import UpdateStatusForm from '@/components/form/UpdateStatusForm'
import UserUpdateForm from '../form/UserUpdateForm'
import { getGenderStyles, getGenderText } from '@/enums/gender'
import { cn } from '@/lib/utils'

type UserTableDataProps = {
    fetching: boolean;
    data: PageResponse<UserRes>;
    setData: (data: PageResponse<UserRes>) => void;
    searchKey: string;
    setSearchKey: (key: string) => void;
    setSelectedSortField: (orderBy: CommonSortField) => void;
    setSelectedSortDir: (sortDir: SortDirection) => void;
}

const UserTableData: React.FC<UserTableDataProps> = ({
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
    const [selectedItem, setSelectedItem] = React.useState<UserRes>({} as UserRes);
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
            await userService.deleteUser(id)
            const newData: PageResponse<UserRes> = {
                ...data,
                content: data.content.filter(item => item.id !== id),
                totalElements: data.totalElements - 1,
            }
            setData(newData)
            toast.success('Delete user successfully!')
        } catch (error) {
            handleError(error, 'Delete user failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleDeleteMany = async (ids: number[]) => {
        try {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, true])), [0]: true }))
            await userService.deleteMultiUsers(ids)
            setSelectedIds([])
            const newData: PageResponse<UserRes> = {
                ...data,
                content: data.content.filter(item => !ids.includes(item.id)),
                totalElements: data.totalElements - ids.length,
            }
            setData(newData)
            toast.success('Delete many users successfully!')
        } catch (error) {
            handleError(error, 'Delete many user failed!')
        } finally {
            setLoadingDelete(prev => ({ ...prev, ...Object.fromEntries(ids.map(id => [id, false])), [0]: false }))
        }
    }

    const handleEditClick = (item: UserRes) => {
        setSelectedItem(item)
        setOpenDialogs(prev => ({ ...prev, [item.id]: true }));
    };

    const handleCloseDialog = (id: number) => {
        setOpenDialogs(prev => ({ ...prev, [id]: false }));
    };

    const handleUpdateStatus = async (item: UserRes, newStatus: boolean) => {
        try {
            setLoadingStatus(prev => ({ ...prev, [item.id]: true }))
            const req: UserUpdateReq = {
                fullName: item.fullName,
                phoneNumber: item.phone,
                gender: item.gender,
                dob: new Date(item.dob),
                status: newStatus
            }

            const response = await userService.updateUser(item.id, req)
            const index = data.content.findIndex((updateItem) => updateItem.id === item.id);

            if (index >= 0) {
                const updatedItems = [...data.content];
                updatedItems[index] = { ...updatedItems[index], ...response };

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
                        title='Delete many users'
                        description='Are you sure you want to delete these users? This action cannot be undone.'
                        loading={loadingDelete[0]}
                        onDelete={() => handleDeleteMany(selectedIds)}
                    />
                    <p className='text-muted-foreground'>Delete {selectedIds.length} user</p>
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
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className='text-center'>DOB</TableHead>
                            <TableHead className='text-center'>Gender</TableHead>
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
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell className='text-center'>{item.dob}</TableCell>
                                <TableCell className='text-center'>
                                    <span className={cn(getGenderStyles(item.gender), 'py-1 px-2 font-semibold rounded-md')}>
                                        {getGenderText(item.gender)}
                                    </span>
                                </TableCell>
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
                                                <DialogTitle>Update user</DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <UserUpdateForm
                                                    usersData={data}
                                                    setUsersData={setData}
                                                    updateItem={selectedItem}
                                                    onClose={() => handleCloseDialog(item.id)}
                                                />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <DeleteOneAlertDialog
                                        title='Delete user'
                                        description='Are you sure you want to delete this user? This action cannot be undone.'
                                        loading={loadingDelete[item.id]}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={10} className='text-center'>
                                    <EmptyData message='No users found' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    )
}

export default UserTableData
