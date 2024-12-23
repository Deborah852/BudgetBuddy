import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {

    if (!budgetList || budgetList.length === 0) {
        return <div>No data available to display.</div>;
    }

    return (
        <div className='border rounded-lg p-5'>
            <div className='font-bold text-lg'>Activity</div>
            <ResponsiveContainer width={'80%'} height={300}>
                <BarChart data={budgetList} margin={{ top: 7 }}>
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='totalSpend' stackId='a' fill='#A888B5' />
                    <Bar dataKey='amount' stackId='a' fill='#EFB6C8' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartDashboard