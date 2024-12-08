import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CourseRes } from '@/models/course'
import CourseForm from '@/sections/course/form/CourseForm'
import courseService from '@/services/courseService'
import { handleError } from '@/utils/handleError'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UpdateCourse: React.FC = () => {
    const { id } = useParams()
    const [courseDetail, setCourseDetail] = useState<CourseRes>({} as CourseRes);

    useEffect(() => {
        const fetchData = async (id: number) => {
            try {
                const response = await courseService.getCourseById(id)
                setCourseDetail(response)
            } catch (error) {
                handleError(error, 'Failed to load course detail')
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
                        <BreadcrumbLink to="/courses">Courses</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Update course</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3 mb-5">
                <Link to={'/courses'} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}><ArrowLeft size={18} /></Link>
                <h4 className='font-extrabold'>Update course</h4>
            </div>
            <CourseForm updateItem={courseDetail} />
        </div>
    )
}

export default UpdateCourse