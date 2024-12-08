import React, { useEffect, useState } from 'react'
import { Pagination } from '@/components/ui/pagination'
import PagingContent from '@/components/common/PagingContent'
import useDebounce from '@/hooks/useDebounce'
import { LessonVocabRes } from '@/models/lessonVocab'
import lessonVocabService from '@/services/lessonVocabService'
import { handleError } from '@/utils/handleError'
import SelectRowShow from '@/components/table/SelectRowShow'
import { PageResponse } from '@/models/common/pageResponse'
import { CommonSortField } from '@/enums/sort-field/commonSortField'
import { SortDirection } from '@/enums/sortDirection'
import { VocabRes } from '@/models/vocabulary'
import VocabLessonTableData from '@/sections/lesson/table/VocabLessonTableData'
import vocabService from '@/services/vocabService'
import VocabLessonCard from '@/sections/lesson/card/VocabLessonCard'

type Props = {
    lessonId: number;
}

const LessonVocab: React.FC<Props> = ({ lessonId }) => {
    const [vocabsData, setVocabsData] = useState<PageResponse<VocabRes>>({} as PageResponse<VocabRes>);
    const [lessonVocabsData, setLessonVocabsData] = useState<LessonVocabRes>({} as LessonVocabRes);
    const [fetching, setFetching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPageSize, setSelectedPageSize] = useState<string>('10');
    const [searchKey, setSearchKey] = useState('');
    const [selectedSortField, setSelectedSortField] = useState<CommonSortField>();
    const [selectedSortDir, setSelectedSortDir] = useState<SortDirection>();

    const debouncedSearchKey = useDebounce(searchKey, 500);

    useEffect(() => {
        const fetchData = async (id: number) => {
            try {
                setFetching(true)
                const response = await lessonVocabService.getLessonVocabs(id)
                setLessonVocabsData(response)
            } catch (error) {
                handleError(error, 'Error!')
            } finally {
                setFetching(false)
            }
        }

        if (lessonId) {
            fetchData(Number(lessonId))
        }
    }, [lessonId]);

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
    }

    const handleSelectPage = (page: number) => {
        setCurrentPage(page)
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
        <div className="w-full">
            <div className="flex items-center justify-between mb-5 pt-2">
                <h1 className='font-extrabold text-2xl'>Lesson Vocabularies</h1>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
                {lessonVocabsData.vocabularies?.map((vocab) => (
                    <VocabLessonCard key={vocab.id} vocab={vocab} />
                ))}
            </div>
            <div className='relative shadow-full-sm rounded-xl p-4'>
                <VocabLessonTableData
                    fetching={fetching}
                    lessonId={Number(lessonId)}
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

export default LessonVocab