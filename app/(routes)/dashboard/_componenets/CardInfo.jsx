import { Coins, PiggyBank, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({ budgetList }) {

  const [totalBudget, setTotalBudget] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    if (budgetList) {
      calculateCardInfo()
    }
  }, [budgetList])

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpent_ = 0;
    budgetList.forEach(element => {
      totalBudget_ += Number(element.amount);
      totalSpent_ += element.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpent(totalSpent_);
  }


  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <div className='text-sm'>Total Budget</div>
              <div className='font-bold text-2xl'>${totalBudget}</div>
            </div>
            <PiggyBank className='bg-costumColors-orange p-3 w-12 h-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <div className='text-sm'>Total Spent</div>
              <div className='font-bold text-2xl'>${totalSpent}</div>
            </div>
            <Coins className='bg-costumColors-pink p-3 w-12 h-12 rounded-full text-white' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <div className='text-sm'>Number of Budget</div>
              <div className='font-bold text-2xl'>{budgetList?.length}</div>
            </div>
            <Wallet className='bg-primary p-3 w-12 h-12 rounded-full text-white' />
          </div>
        </div>
      ) : (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((item, index) => (
            <div key={index} className='h-[110px] w-full bg-slate-200 animate-pulse  rounded-lg'>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CardInfo