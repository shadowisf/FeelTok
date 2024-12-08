'use client'

import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

export default function PieGraph() {

    const data = [
        { name: 'Sales', value: 400 },
        { name: 'Profit', value: 300 },
        { name: 'Expenses', value: 200 },
        { name: 'Others', value: 100 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <PieChart width = {400} height = {400}>
                <Pie
                    data = {data}
                    dataKey = 'value'
                    nameKey = 'name'
                    cx = '50%'
                    cy = '50%'
                    outerRadius = {150}
                    fill = '#8884d8'
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key = {`cell-${index}`} fill = {COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip contentStyle = {{ fontSize: 10 }} />
                <Legend wrapperStyle = {{ fontSize: 10 }} />
            </PieChart>
        </div>
    );
}
