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

      <style>
        {`
            .stats {       
                background-color: white;
                width: 350px;
                height: 140px;
                padding: 20px 20px 20px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
            .stats-name {
                font-size: 16px;
                margin-bottom: -8px;
            }
            .stats-options {
                font-weight: bold;
                font-size: 14px;
                color: #00C49F;
                margin-top: -8px;
                cursor: pointer;
                }
            .stats-options:hover {
                text-decoration: underline;
            }
        `}
      </style>
    </div>
  );
}
