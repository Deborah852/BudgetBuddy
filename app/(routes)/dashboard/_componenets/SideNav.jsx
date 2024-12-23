"use client";

import React, { useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { Coins, LayoutGrid, PiggyBank } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
            icon: Coins,
            path: '/dashboard/expenses'
        }
    ]

    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={'/logo.png'}
                alt='logo'
                width={160}
                height={100}
            />
            <div className='mt-5'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={menu.id || index}>
                        <h2
                            className={`flex gap-2 items-center text-gray-700 font-medium p-5 cursor-pointer rounded-md
                                   mb-2 hover:text-black hover:bg-customPurple-light 
                                    ${path === menu.path ? 'text-customPurple-dark bg-customPurple-light' : ''}`}>
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav