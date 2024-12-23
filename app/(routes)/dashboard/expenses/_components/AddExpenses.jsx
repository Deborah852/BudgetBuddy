import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpenses({ budgetId, user, refreshData }) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/yyyy')
        }).returning({ insertedId: Budgets.id });

        setAmount('')
        setName('')

        if (result) {
            setLoading(false)
            refreshData()
            toast("New Expense Added!")
        }
        setLoading(false)
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expenses</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input
                    value={name}
                    placeholder="e.g. Bedroom Decor"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    value={amount}
                    type="number"
                    placeholder="e.g. 1000$"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount && !isNaN(amount)) || loading}
                className="mt-3 w-full"
                onClick={() => addNewExpense()}>
                {loading ? <Loader className='animate-spin'/> : "Add New Expense"}
            </Button>
        </div>
    )
}

export default AddExpenses