'use client';

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]

    const path = usePathname();

    return (
        <div className='h-screen p-10'>
            <Image
                src={'/logo.svg'}
                alt="Logo"
                width={160}
                height={100}
            />
            <div className='mt-5'>
                {menuList.map((menu, index) => (
                    <Link key={index} href={menu.path}>
                        <h2 key={menu.id} className={`flex gap-2 items-center
                        text-gray-500 font-medium 
                        p-5 cursor-pointer rounded-md 
                        hover:text-primary hover:bg-blue-100
                        ${path == menu.path && 'text-primary bg-blue-100'}
                        `}>
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-5 left-1 p-5 flex gap-2 items-center justify-start'>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav