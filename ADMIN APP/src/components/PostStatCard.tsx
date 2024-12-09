"use client";

import { useEffect, useState } from "react";

export default function PostStatCard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    listAllPosts();
  }, []);

  async function listAllPosts() {
    const response = await fetch("/api/listAllPosts", {
      method: "POST",
      body: JSON.stringify({ id: null }),
    });
    const posts = await response.json();

    console.log(posts);

    if (response.ok) {
      setPosts(posts.data);
    }
  }

  return (
    <div className="stats">
      <p className="stats-name">Posts</p>
      <h1>{posts.length}</h1>

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
