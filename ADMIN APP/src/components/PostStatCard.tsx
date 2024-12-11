"use client";

import { Post } from "@/constants/types";
import { useEffect, useState } from "react";

export default function PostStatCard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    handleListAllPosts();
  }, []);

  async function handleListAllPosts() {
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
    </div>
  );
}
