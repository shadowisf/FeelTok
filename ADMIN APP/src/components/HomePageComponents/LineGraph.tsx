'use client'

import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function LineGraph() {

    const data = [
        { date: '2016', sale: 450, profit: 120 },
        { date: '2017', sale: 700, profit: 200 },
        { date: '2018', sale: 600, profit: 180 },
        { date: '2019', sale: 850, profit: 250 },
        { date: '2020', sale: 920, profit: 300 },
        { date: '2021', sale: 1100, profit: 350 },
        { date: '2022', sale: 1150, profit: 400 },
        { date: '2023', sale: 900, profit: 280 },
        { date: '2024', sale: 750, profit: 220 },
        { date: '2025', sale: 1050, profit: 320 },
    ];

    return (
        <div>
            <LineChart height = {250} width = {500} data = {data} >
                <CartesianGrid strokeDasharray = '3 3' />
                <XAxis dataKey = 'date' tick = {{ fontSize: 10 }} />
                <YAxis dataKey = 'sale' tick = {{ fontSize: 10 }} />
                <Line dataKey = 'sale' type = 'monotone' stroke = 'blue' />
                <Line dataKey = 'profit' type = 'monotone' stroke = 'green' />
                <Tooltip contentStyle = {{ fontSize: 10 }} />
                <Legend wrapperStyle = {{ fontSize: 10 }} />
            </LineChart>
        </div>
    )
}
