import OverviewCards from '@/sections/dashboard/OverviewCards'
import React from 'react'

const Dashboard: React.FC = () => {
    return (
        <div className='container'>
            <h1 className='font-extrabold text-2xl mb-5'>Dashboard</h1>

            <OverviewCards />
        </div>
    )
}

export default Dashboard