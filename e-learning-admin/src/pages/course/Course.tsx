import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { buttonVariants } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { CourseShortRes } from '@/models/course'
import courseService from '@/services/courseService'
import { handleError } from '@/utils/handleError'
import CourseTableData from '@/sections/course/table/CourseTableData'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import { SortDirection } from '@/enums/sortDirection'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'

const Course: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    const [coursesData, setCoursesData] = useState<PageResponse<CourseShortRes>>({} as PageResponse<CourseShortRes>);
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
            navigate('/courses')
        }
    }, [page, navigate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await courseService.getAllCourses({
                    pageNumber: currentPage - 1,
                    pageSize: Number(selectedPageSize),
                    name: debouncedSearchKey,
                    sortField: selectedSortField,
                    sortDirection: selectedSortDir
                })
                setCoursesData(response)
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
        navigate('/courses')
    }

    const handleSelectPage = (page: number) => {
        navigate(`/courses?page=${page}`)
    }

    const handleNextPage = () => {
        const totalPages = coursesData.totalPages;
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
                        <BreadcrumbPage>Courses</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between mb-5">
                <h1 className='font-extrabold text-2xl'>Course</h1>
                <Link to={'/courses/add'} className={cn(buttonVariants())}>
                    <PlusIcon size={16} className='me-1' />
                    Add course
                </Link>
            </div>
            <div className='relative shadow-full-sm rounded-xl p-4'>
                <CourseTableData
                    fetching={fetching}
                    data={coursesData}
                    setData={setCoursesData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setSelectedSortField={setSelectedSortField}
                    setSelectedSortDir={setSelectedSortDir}
                />
                {coursesData.totalElements > 0 && (
                    <div className="pt-5">
                        <Pagination className="justify-between">
                            <div className="flex gap-3 items-center">
                                <SelectRowShow
                                    selectedItem={selectedPageSize}
                                    onSelect={handleSelectPageSize}
                                />
                                <p className="text-sm text-muted-foreground">Show {coursesData.content?.length} / {coursesData.totalElements} result</p>
                            </div>
                            <PagingContent
                                data={coursesData}
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

export default Course