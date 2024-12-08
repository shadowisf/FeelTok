"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AreaGraph() {
  const data = [
    { date: "2020", sale: 350, profit: 100 },
    { date: "2021", sale: 420, profit: 150 },
    { date: "2022", sale: 380, profit: 170 },
    { date: "2023", sale: 500, profit: 220 },
    { date: "2024", sale: 450, profit: 190 },
    { date: "2025", sale: 600, profit: 250 },
  ];

  return (
    <div>
      <AreaChart width={800} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Area
          type="monotone"
          dataKey="sale"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.4}
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.4}
        />
        <Tooltip contentStyle={{ fontSize: 10 }} />
        <Legend wrapperStyle={{ fontSize: 10 }} />
      </AreaChart>
    </div>
  );
}
