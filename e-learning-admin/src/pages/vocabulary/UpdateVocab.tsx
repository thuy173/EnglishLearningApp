import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { VocabRes } from '@/models/vocabulary'
import VocabForm from '@/sections/vocabulary/form/VocabForm'
import vocabService from '@/services/vocabService'
import { handleError } from '@/utils/handleError'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateVocab: React.FC = () => {
    const { id } = useParams()
    const [vocabDetail, setVocabDetail] = useState<VocabRes>({} as VocabRes);

    useEffect(() => {
        const fetchData = async (id: number) => {
            try {
                const response = await vocabService.getVocabById(id)
                setVocabDetail(response)
            } catch (error) {
                handleError(error, 'Failed to load vocabulary detail')
            }
        }

        if (id) {
            fetchData(Number(id))
        }
    }, [id])

    return (
        <div className="container pb-10">
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/vocabularies">Vocabularies</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Update vocabulary</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3 mb-5">
                <h4 className='font-extrabold'>Update vocabulary</h4>
            </div>
            <VocabForm updateItem={vocabDetail} />
        </div>
    )
}

export default UpdateVocab