import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { UserRes } from '@/models/user'
import userService from '@/services/userService'
import UserForm from '@/sections/user/form/UserAddForm'
import { handleError } from '@/utils/handleError'
import UserTableData from '@/sections/user/table/UserTableData'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import { SortDirection } from '@/enums/sortDirection'

const User: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    const [usersData, setUsersData] = useState<PageResponse<UserRes>>({} as PageResponse<UserRes>);
    const [fetching, setFetching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPageSize, setSelectedPageSize] = useState<string>('10');
    const [searchKey, setSearchKey] = useState('');
    const [selectedSortField, setSelectedSortField] = useState<CommonSortField>();
    const [selectedSortDir, setSelectedSortDir] = useState<SortDirection>();

    const debouncedSearchKey = useDebounce(searchKey, 500);

    useEffect(() => {
        if (page) {
            setCurrentPage(Number(page))
        }
    }, [page])

    useEffect(() => {
        if (page === '1') {
            navigate('/users')
        }
    }, [page, navigate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await userService.getAllUsers({
                    pageNumber: currentPage - 1,
                    pageSize: Number(selectedPageSize),
                    name: debouncedSearchKey,
                    sortField: selectedSortField,
                    sortDirection: selectedSortDir
                })
                setUsersData(response)
            } catch (error) {
                handleError(error, 'Error!')
            } finally {
                setFetching(false)
            }
        }

        fetchData()
    }, [currentPage, selectedPageSize, debouncedSearchKey, selectedSortField, selectedSortDir]);

    const handleSelectPageSize = (value: string) => {
        setSelectedPageSize(value)
        setCurrentPage(1)
        navigate('/users')
    }

    const handleSelectPage = (page: number) => {
        navigate(`/users?page=${page}`)
    }

    const handleNextPage = () => {
        const totalPages = usersData.totalPages;
        if (currentPage < totalPages) {
            handleSelectPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handleSelectPage(currentPage - 1);
        }
    };

    return (
        <div className="container ">
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between mb-5">
                <h1 className='font-extrabold text-2xl'>User</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon size={16} className='me-1' />
                            Add user
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-2xl pb-4'>
                        <DialogHeader>
                            <DialogTitle>Add new user</DialogTitle>
                            <DialogDescription></DialogDescription>
                            <UserForm
                                usersData={usersData}
                                setUsersData={setUsersData}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='relative shadow-full-sm rounded-xl p-4'>
                <UserTableData
                    fetching={fetching}
                    data={usersData}
                    setData={setUsersData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setSelectedSortField={setSelectedSortField}
                    setSelectedSortDir={setSelectedSortDir}
                />
                {usersData.totalElements > 0 && (
                    <div className="pt-5">
                        <Pagination className="justify-between">
                            <div className="flex gap-3 items-center">
                                <SelectRowShow
                                    selectedItem={selectedPageSize}
                                    onSelect={handleSelectPageSize}
                                />
                                <p className="text-sm text-muted-foreground">Show {usersData.content?.length} / {usersData.totalElements} result</p>
                            </div>
                            <PagingContent
                                data={usersData}
                                currentPage={currentPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handleSelectPage={handleSelectPage}
                            />
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    )
}

export default User