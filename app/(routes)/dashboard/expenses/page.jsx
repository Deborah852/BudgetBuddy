"use client"

import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { asc, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';


function page() {

    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        if (user) {
            getBudgetList();
        }
    }, [user])

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(asc(Budgets.name))
        setBudgetList(result);
        getAllExpenses();
    }

    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(Expenses.id))
        setExpensesList(result)
    }

    return (
        <div className='p-10'>
            <div className='font-bold text-3xl'>My Expenses</div>
            <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList} />
        </div>
    )
}

export default page