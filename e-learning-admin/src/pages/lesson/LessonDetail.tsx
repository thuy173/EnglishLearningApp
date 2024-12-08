import Picture from '@/components/common/Picture';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLessonStatusStyles, getLessonStatusText } from '@/enums/lessonStatus';
import { cn } from '@/lib/utils';
import { LessonRes } from '@/models/lesson';
import lessonService from '@/services/lessonService';
import { handleError } from '@/utils/handleError';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LessonVocab from './LessonVocab';
import LessonTest from './LessonTest';

const LessonDetail: React.FC = () => {
    const { id, lessonId } = useParams();
    const [lessonDetail, setLessonDetail] = useState<LessonRes>({} as LessonRes)

    useEffect(() => {
        const fetchData = async (id: number) => {
            try {
                const response = await lessonService.getLessonById(id)
                setLessonDetail(response)
            } catch (error) {
                handleError(error, 'Error!')
            }
        }

        if (lessonId) {
            fetchData(Number(lessonId))
        }
    }, [lessonId])


    return (
        <div className="container">
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/courses">Courses</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink to={`/courses/${id}/lessons`}>Lessons</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Lesson detail</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-5">
                <div className="grid items-center gap-3 mb-5 pt-2">
                    <h1 className='font-extrabold text-2xl'>Lesson "{lessonDetail.name}"</h1>
                    <p>Status:
                        <span className={cn('p-2 font-semibold ms-1', getLessonStatusStyles(lessonDetail.status))}>
                            {getLessonStatusText(lessonDetail.status)}
                        </span>
                    </p>
                    <p>Description: {lessonDetail.description}</p>
                </div>
                <Picture src={lessonDetail.thumbnail} alt={lessonDetail.name} className='border rounded-xl object-cover w-96 h-48' />
            </div>
            <Tabs defaultValue='vocabs' className="w-full">
                <TabsList>
                    <TabsTrigger value="vocabs">Lesson vocabularies</TabsTrigger>
                    <TabsTrigger value="tests">Lesson tests</TabsTrigger>
                </TabsList>
                <TabsContent value='vocabs'>
                    <LessonVocab lessonId={lessonDetail.id} />
                </TabsContent>
                <TabsContent value='tests'>
                    <LessonTest lessonId={lessonDetail.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default LessonDetail