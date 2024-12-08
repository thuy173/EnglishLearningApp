import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import OverviewCards from '@/sections/dashboard/OverviewCards'
import React from 'react'

const Dashboard: React.FC = () => {
    return (
        <div className='container'>
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='font-extrabold text-2xl mb-5'>Dashboard</h1>

            <OverviewCards />
        </div>
    )
}

export default Dashboard