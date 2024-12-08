import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CourseForm from '@/sections/course/form/CourseForm'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const AddCourse: React.FC = () => {
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
                        <BreadcrumbPage>Add course</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3 mb-5">
                <Link to={'/courses'} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
                    <ArrowLeft size={18} />
                </Link>
                <h4 className='font-extrabold'>Add new course</h4>
            </div>
            <CourseForm />
        </div>
    )
}

export default AddCourse