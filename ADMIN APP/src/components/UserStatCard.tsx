"use client";

import { User } from "@/constants/types";
import { useEffect, useState } from "react";

export default function UserStatCard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    handleListAllUsers();
  }, []);

  async function handleListAllUsers() {
    const response = await fetch("/api/listAllUsers", {
      method: "POST",
      body: JSON.stringify({ uid: null }),
    });
    const users = await response.json();

    console.log(users);

    if (response.ok) {
      setUsers(users.data);
    }
  }

  return (
    <div className="stats">
      <p className="stats-name">Users</p>
      <h1>{users.length}</h1>
    </div>
  );
}
