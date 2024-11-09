import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { CategoryRes } from '@/models/category'
import categoryService from '@/services/categoryService'
import CategoryForm from '@/sections/category/form/CategoryForm'
import { handleError } from '@/utils/handleError'
import CategoryTableData from '@/sections/category/table/CategoryTableData'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'

const Category: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    const [categoriesData, setCategoriesData] = useState<PageResponse<CategoryRes>>({} as PageResponse<CategoryRes>);
    const [fetching, setFetching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPageSize, setSelectedPageSize] = useState<string>('10');
    const [searchKey, setSearchKey] = useState('');
    const [selectedSortField, setSelectedSortField] = useState<CommonSortField>();

    const debouncedSearchKey = useDebounce(searchKey, 500);

    useEffect(() => {
        if (page) {
            setCurrentPage(Number(page))
        }
    }, [page])

    useEffect(() => {
        if (page === '1') {
            navigate('/categories')
        }
    }, [page, navigate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await categoryService.getAllCategories({
                    pageNumber: currentPage,
                    pageSize: Number(selectedPageSize),
                    name: debouncedSearchKey,
                    sortField: selectedSortField
                })
                setCategoriesData(response)
                setFetching(false)
            } catch (error) {
                setFetching(false)
                handleError(error, 'Lỗi!')
            } finally {
                setFetching(false)
            }
        }

        fetchData()
    }, [currentPage, selectedPageSize, debouncedSearchKey, selectedSortField]);

    const handleSelectPageSize = (value: string) => {
        setSelectedPageSize(value)
        setCurrentPage(1)
        navigate('/categories')
    }

    const handleSelectPage = (page: number) => {
        navigate(`/categories?page=${page}`)
    }

    const handleNextPage = () => {
        const totalPages = categoriesData.totalPages;
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
            <div className="flex items-center justify-between mb-5">
                <h1 className='font-extrabold text-2xl'>Loại tưởng nhớ</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon size={16} className='me-1' />
                            Thêm loại tưởng nhớ
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-xl pb-4'>
                        <DialogHeader>
                            <DialogTitle>Thêm loại tưởng nhớ mới</DialogTitle>
                            <DialogDescription></DialogDescription>
                            <CategoryForm
                                categoriesData={categoriesData}
                                setCategoriesData={setCategoriesData}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='relative shadow-full-sm rounded-xl'>
                <CategoryTableData
                    fetching={fetching}
                    data={categoriesData}
                    setData={setCategoriesData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setSelectedSortField={setSelectedSortField}
                />
                {categoriesData.totalElements > 0 && (
                    <div className="pt-5">
                        <Pagination className="justify-between">
                            <div className="flex gap-3 items-center">
                                <SelectRowShow
                                    selectedItem={selectedPageSize}
                                    onSelect={handleSelectPageSize}
                                />
                                <p className="text-sm text-muted-foreground">Hiển thị {categoriesData.content?.length} / {categoriesData.totalElements} kết quả</p>
                            </div>
                            <PagingContent
                                data={categoriesData}
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

export default Category