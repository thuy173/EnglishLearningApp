import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardRes } from '@/models/dashboard'
import dashboardService from '@/services/dashboardService'
import { handleError } from '@/utils/handleError'
import { BookOpenCheck, Shapes, Users, WholeWord } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const OverviewCards: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardRes>({} as DashboardRes)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardService.getDashboard()
                setDashboardData(response)
            } catch (error) {
                handleError(error, 'Failed to fetch dashboard data')
            }
        }
        fetchData()
    }, [])

    return (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold'>
                        Total Courses
                    </CardTitle>
                    <Shapes size={18} className='text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.totalCourses}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold'>
                        Total Lessons
                    </CardTitle>
                    <BookOpenCheck size={18} className='text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.totalLessons}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold'>Total Users</CardTitle>
                    <Users size={18} className='text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.totalUsers}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold'>Total Vocabularies</CardTitle>
                    <WholeWord size={18} className='text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{dashboardData.totalVocabularies}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OverviewCards