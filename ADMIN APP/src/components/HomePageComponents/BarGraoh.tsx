"use client";

import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function BarGraph() {
  const data = [
    { category: "Category A", sale: 500, profit: 120 },
    { category: "Category B", sale: 650, profit: 150 },
    { category: "Category C", sale: 900, profit: 200 },
    { category: "Category D", sale: 550, profit: 130 },
    { category: "Category E", sale: 750, profit: 180 },
  ];

  return (
    <div>
      <BarChart height={250} width={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
        <YAxis dataKey="sale" tick={{ fontSize: 10 }} />
        <Bar dataKey="sale" barSize={10} fill="blue" />
        <Bar dataKey="profit" barSize={10} fill="green" />
        <Tooltip contentStyle={{ fontSize: 10 }} />
        <Legend wrapperStyle={{ fontSize: 10 }} />
      </BarChart>
    </div>
  );
}
