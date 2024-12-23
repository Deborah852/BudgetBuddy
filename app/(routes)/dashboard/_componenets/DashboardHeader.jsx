import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-smborder-b flex justify-between'>
      <div></div>
      <div className='flex gap-2 items-center justify-between'>
        <UserButton />
        <div className='text-gray-800'>Profile</div>
      </div>
    </div>
  )
}

export default DashboardHeader