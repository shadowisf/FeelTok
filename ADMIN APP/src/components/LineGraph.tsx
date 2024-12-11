"use client";

import { Post, User } from "@/constants/types";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function LineGraph() {
  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [data, setData] = useState<
    { date: string; users: number; posts: number }[]
  >([]);

  useEffect(() => {
    setIsClient(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0 && posts.length > 0) {
      processData();
    }
  }, [users, posts]);

  async function fetchData() {
    const userResponse = await fetch("/api/listAllUsers", {
      method: "POST",
      body: JSON.stringify({ uid: null }),
    });
    const userData = await userResponse.json();

    const postResponse = await fetch("/api/listAllPosts", {
      method: "POST",
      body: JSON.stringify({ id: null }),
    });
    const postData = await postResponse.json();

    if (userResponse.ok && postResponse.ok) {
      setUsers(userData.data);
      setPosts(postData.data);
    }
  }

  function processData() {
    const years = ["2023", "2024", "2025"];

    const result = years.map((year) => {
      const userCount = users.filter((user) => user.year === year).length;
      const postCount = posts.filter((post) => post.year === year).length;

      return {
        date: year,
        users: userCount,
        posts: postCount,
      };
    });

    setData(result);
  }

  return (
    <div>
      {isClient && (
        <LineChart height={250} width={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Line dataKey="users" type="monotone" stroke="blue" name="Users" />
          <Line dataKey="posts" type="monotone" stroke="green" name="Posts" />
          <Tooltip contentStyle={{ fontSize: 10 }} />
          <Legend wrapperStyle={{ fontSize: 10 }} />
        </LineChart>
      )}
    </div>
  );
}
