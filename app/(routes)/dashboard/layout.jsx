'use client';
import React from 'react'
import SideNav from '@/app/(routes)/dashboard/_components/SideNav'
import DashBoardHeader from './_components/DashboardHeader'
import db from '../../../utils/dbConfig';
import { eq } from 'drizzle-orm';
import { Budgets } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        user&&checkUserBudgets();
    }, [user])

    const checkUserBudgets = async () => {
        const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
        
        console.log(result);
        
        if(result?.length == 0){
            router.replace('/dashboard/budgets')
        }
    }
    return (
        <div>
            <div className='fixed md:w-64 hidden md:block border shadow-sm'>
                <SideNav />
            </div>
            <div className='md:ml-64'>
                <DashBoardHeader />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout