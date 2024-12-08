import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { buttonVariants } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { VocabRes } from '@/models/vocabulary'
import vocabService from '@/services/vocabService'
import { handleError } from '@/utils/handleError'
import VocabTableData from '@/sections/vocabulary/table/VocabTableData'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import { SortDirection } from '@/enums/sortDirection'
import { cn } from '@/lib/utils'
import { PlusIcon, Sparkles } from 'lucide-react'

const Vocabulary: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    const [vocabsData, setVocabsData] = useState<PageResponse<VocabRes>>({} as PageResponse<VocabRes>);
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
            navigate('/vocabularies')
        }
    }, [page, navigate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await vocabService.getAllVocabs({
                    pageNumber: currentPage - 1,
                    pageSize: Number(selectedPageSize),
                    word: debouncedSearchKey,
                    sortField: selectedSortField,
                    sortDirection: selectedSortDir
                })
                setVocabsData(response)
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
        navigate('/vocabularies')
    }

    const handleSelectPage = (page: number) => {
        navigate(`/vocabularies?page=${page}`)
    }

    const handleNextPage = () => {
        const totalPages = vocabsData.totalPages;
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
                        <BreadcrumbPage>Vocabularies</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between mb-5">
                <h1 className='font-extrabold text-2xl'>Vocabulary</h1>
                <div className="flex gap-2">
                    <Link to={'/vocabularies/create-with-ai'} className={cn(buttonVariants(), 'bg-purple-500 hover:bg-purple-500/80')}>
                        <Sparkles size={16} className='me-1' />
                        Create with AI
                    </Link>
                    <Link to={'/vocabularies/add'} className={cn(buttonVariants())}>
                        <PlusIcon size={16} className='me-1' />
                        Add vocabulary
                    </Link>
                </div>
            </div>
            <div className='relative shadow-full-sm rounded-xl p-4'>
                <VocabTableData
                    fetching={fetching}
                    data={vocabsData}
                    setData={setVocabsData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setSelectedSortField={setSelectedSortField}
                    setSelectedSortDir={setSelectedSortDir}
                />
                {vocabsData.totalElements > 0 && (
                    <div className="pt-5">
                        <Pagination className="justify-between">
                            <div className="flex gap-3 items-center">
                                <SelectRowShow
                                    selectedItem={selectedPageSize}
                                    onSelect={handleSelectPageSize}
                                />
                                <p className="text-sm text-muted-foreground">Show {vocabsData.content?.length} / {vocabsData.totalElements} result</p>
                            </div>
                            <PagingContent
                                data={vocabsData}
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

export default Vocabulary