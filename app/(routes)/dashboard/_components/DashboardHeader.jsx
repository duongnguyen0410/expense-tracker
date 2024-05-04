import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
    return (
        <div className='p-10 shadow-sm border-b flex justify-between items-center'>
            <div>
              
            </div>
            <div>
                <UserButton showName={true} />
            </div>
        </div>
    )
}

export default DashboardHeader