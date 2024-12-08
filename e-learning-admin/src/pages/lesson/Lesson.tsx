import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { LessonRes } from '@/models/lesson'
import lessonService from '@/services/lessonService'
import { handleError } from '@/utils/handleError'
import LessonTableData from '@/sections/lesson/table/LessonTableData'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import { SortDirection } from '@/enums/sortDirection'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import LessonForm from '@/sections/lesson/form/LessonForm'

const Lesson: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    const [lessonsData, setLessonsData] = useState<PageResponse<LessonRes>>({} as PageResponse<LessonRes>);
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
            navigate('/lessons')
        }
    }, [page, navigate])

    useEffect(() => {
        const fetchData = async (id: number) => {
            try {
                setFetching(true)
                const response = await lessonService.getAllLessons({
                    pageNumber: currentPage - 1,
                    pageSize: Number(selectedPageSize),
                    name: debouncedSearchKey,
                    sortField: selectedSortField,
                    sortDirection: selectedSortDir,
                    courseId: id
                })
                setLessonsData(response)
            } catch (error) {
                handleError(error, 'Error!')
            } finally {
                setFetching(false)
            }
        }

        if (id) {
            fetchData(Number(id))
        }
    }, [id, currentPage, selectedPageSize, debouncedSearchKey, selectedSortField, selectedSortDir]);

    const handleSelectPageSize = (value: string) => {
        setSelectedPageSize(value)
        setCurrentPage(1)
        navigate('/lessons')
    }

    const handleSelectPage = (page: number) => {
        navigate(`/lessons?page=${page}`)
    }

    const handleNextPage = () => {
        const totalPages = lessonsData.totalPages;
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
                        <BreadcrumbLink to={`/courses`}>Courses</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Lessons</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between mb-5">
                <h1 className='font-extrabold text-2xl'>Lesson</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon size={16} className='me-1' />
                            Add lesson
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-xl pb-4'>
                        <DialogHeader>
                            <DialogTitle>Add new lesson</DialogTitle>
                            <DialogDescription></DialogDescription>
                            <LessonForm
                                lessonsData={lessonsData}
                                setLessonsData={setLessonsData}
                                courseId={Number(id)}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='relative shadow-full-sm rounded-xl p-4'>
                <LessonTableData
                    fetching={fetching}
                    courseId={Number(id)}
                    data={lessonsData}
                    setData={setLessonsData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setSelectedSortField={setSelectedSortField}
                    setSelectedSortDir={setSelectedSortDir}
                />
                {lessonsData.totalElements > 0 && (
                    <div className="pt-5">
                        <Pagination className="justify-between">
                            <div className="flex gap-3 items-center">
                                <SelectRowShow
                                    selectedItem={selectedPageSize}
                                    onSelect={handleSelectPageSize}
                                />
                                <p className="text-sm text-muted-foreground">Show {lessonsData.content?.length} / {lessonsData.totalElements} result</p>
                            </div>
                            <PagingContent
                                data={lessonsData}
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

export default Lesson