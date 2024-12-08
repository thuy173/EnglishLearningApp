import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { TestRes } from '@/models/test'
import TestForm from '@/sections/test/form/TestForm'
import testService from '@/services/testService'
import { handleError } from '@/utils/handleError'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateTest: React.FC = () => {
    const { id, lessonId, testId } = useParams();
    const [test, setTest] = useState<TestRes>({} as TestRes);

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                const response = await testService.getTestById(id)
                setTest(response)
            } catch (error) {
                handleError(error, 'Failed to get detail test')
            }
        }

        if (testId) {
            fetchData(testId)
        }
    }, [testId])

    return (
        <div className="container pb-10">
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
                        <BreadcrumbLink to={`/courses/${id}/lessons/${lessonId}`}>Lesson detail</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Update test</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3 mb-5">
                <h4 className='font-extrabold'>Update test</h4>
            </div>
            <TestForm lessonId={1} updateItem={test} />
        </div>
    )
}

export default UpdateTest