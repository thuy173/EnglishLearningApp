import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import { Link } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { handleError } from '@/utils/handleError'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import { SortDirection } from '@/enums/sortDirection'
import { TestRes } from '@/models/test'
import TestLessonTableData from '@/sections/lesson/table/TestLessonTableData'
import testService from '@/services/testService'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

type Props = {
    lessonId: number;
}

const LessonTest: React.FC<Props> = ({ lessonId }) => {
    const [testsData, setTestsData] = useState<PageResponse<TestRes>>({} as PageResponse<TestRes>);
    const [fetching, setFetching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPageSize, setSelectedPageSize] = useState<string>('10');
    const [searchKey, setSearchKey] = useState('');
    const [selectedSortField, setSelectedSortField] = useState<CommonSortField>();
    const [selectedSortDir, setSelectedSortDir] = useState<SortDirection>();

    const debouncedSearchKey = useDebounce(searchKey, 500);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await testService.getAllTests({
                    pageNumber: currentPage - 1,
                    pageSize: Number(selectedPageSize),
                    name: debouncedSearchKey,
                    lessonId: Number(lessonId),
                    sortField: selectedSortField,
                    sortDirection: selectedSortDir
                })
                setTestsData(response)
            } catch (error) {
                handleError(error, 'Error!')
            } finally {
                setFetching(false)
            }
        }

        fetchData()
    }, [currentPage, selectedPageSize, debouncedSearchKey, selectedSortField, selectedSortDir, lessonId]);

    const handleSelectPageSize = (value: string) => {
        setSelectedPageSize(value)
        setCurrentPage(1)
        setCurrentPage(1)
    }

    const handleSelectPage = (page: number) => {
        setCurrentPage(page)
    }

    const handleNextPage = () => {
        const totalPages = testsData.totalPages;
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
        <div className="w-full">
            <div className="flex items-center justify-between mb-5 pt-2">
                <h1 className='font-extrabold text-2xl'>Lesson Test</h1>
                <Link to={'add-test'} className={cn(buttonVariants())}>
                    <PlusIcon size={16} className='me-1' />
                    Add test
                </Link>
            </div>
            <div className='relative shadow-full-sm rounded-xl p-4'>
                <TestLessonTableData
                    fetching={fetching}
                    data={testsData}
                    setData={setTestsData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setSelectedSortField={setSelectedSortField}
                    setSelectedSortDir={setSelectedSortDir}
                />
                {testsData.totalElements > 0 && (
                    <div className="pt-5">
                        <Pagination className="justify-between">
                            <div className="flex gap-3 items-center">
                                <SelectRowShow
                                    selectedItem={selectedPageSize}
                                    onSelect={handleSelectPageSize}
                                />
                                <p className="text-sm text-muted-foreground">Show {testsData.content?.length} / {testsData.totalElements} result</p>
                            </div>
                            <PagingContent
                                data={testsData}
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

export default LessonTest