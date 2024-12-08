"use client";

import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import CustomSearchBar from "@/components/CustomSearchBar";
import { defaultColors } from "@/constants/colors";
import Loader from "./Loader";

export default function PostTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listAllPosts("");
  }, []);

  async function listAllPosts(id: string) {
    setSearchQuery(id ? id : "");

    const response = await fetch("/api/listAllPosts", {
      method: "POST",
      body: JSON.stringify({ id: id ? id : null }),
    });
    const posts = await response.json();

    console.log(posts);

    if (response.ok) {
      setPosts(posts.data);
    }
  }

  async function handleDeletePost(id: string) {
    setIsLoading(true);

    const response = await fetch("/api/listAllPosts", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });

    const data = await response.json();

    console.log(data);

    listAllPosts("");

    setIsLoading(false);
  }

  return (
    <>
      <Loader isVisible={isLoading} />

      <div className="tableHeader">
        <h1>Posts</h1>

        <div className="searchContainer">
          <CustomSearchBar
            searchQuery={searchQuery}
            placeholder={"Post ID"}
            handleInputChange={(e) => setSearchQuery(e.target.value)}
          />

          <CustomButton
            label="Search"
            onClick={() => listAllPosts(searchQuery)}
            color={defaultColors.primary}
          />
        </div>

        <CustomButton
          label="Refresh"
          onClick={() => listAllPosts("")}
          color={defaultColors.primary}
        />
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Author</th>
              <th>Caption</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post.id}</td>
                <td>{post.author}</td>
                <td>{post.caption}</td>
                <td>{post.createdAt}</td>
                <td>
                  <CustomButton
                    label="Delete"
                    color="darkred"
                    onClick={() => handleDeletePost(post.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
