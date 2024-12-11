"use client";

import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import CustomSearchBar from "@/components/CustomSearchBar";
import { defaultColors } from "@/constants/colors";
import Loader from "./Loader";
import { giveThemeFromEmotion } from "@/utils/postColors";
import { Post, User } from "@/constants/types";
import { defaultImages } from "@/constants/icons";

export default function PostTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleListAllPosts();
  }, []);

  async function handleListAllPosts() {
    setSearchQuery("");

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

  async function handleSearchPost(id: string) {
    const response = await fetch("/api/listAllPosts", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const post = await response.json();

    console.log(post);

    if (response.ok) {
      setPosts(post.data);
    }
  }

  async function handleViewPost(postID: string, uid: string) {
    setIsLoading(true);

    const postResponse = await fetch("/api/listAllPosts", {
      method: "POST",
      body: JSON.stringify({ id: postID }),
    });
    const userResponse = await fetch("/api/listAllUsers", {
      method: "POST",
      body: JSON.stringify({ uid: uid }),
    });
    const user = await userResponse.json();
    const post = await postResponse.json();

    console.log(user);
    console.log(post);

    if (postResponse.ok || userResponse.ok) {
      setIsModalOpen(true);
      setSelectedPost(post.data);
      setSelectedUser(user.data);
    }

    setIsLoading(false);
  }

  async function handleDeletePost(id: string) {
    setIsLoading(true);

    const response = await fetch("/api/deletePost", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();

    console.log(data);

    handleListAllPosts();

    setIsLoading(false);
  }

  return (
    <div>
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
            onClick={() => handleSearchPost(searchQuery)}
            color={defaultColors.primary}
          />
        </div>

        <CustomButton
          label="Refresh"
          onClick={() => handleListAllPosts()}
          color={defaultColors.primary}
        />
      </div>

      {posts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Author</th>
              <th>Feeling</th>
              <th>Caption</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td style={{ fontWeight: "bold" }}>{post.id}</td>
                <td>{post.author}</td>
                <td>{post.feeling}</td>
                <td>{post.caption}</td>
                <td>
                  {post.image ? (
                    <img
                      className="postTableImage"
                      src={post.image}
                      alt={"post's picture"}
                    />
                  ) : (
                    <p>N/A</p>
                  )}
                </td>
                <td>{post.date + ", " + post.time}</td>
                <td className="tableActions">
                  <CustomButton
                    label="Delete"
                    color="darkred"
                    onClick={() => handleDeletePost(post.id)}
                  />

                  <CustomButton
                    label="View"
                    color={defaultColors.primary}
                    onClick={() => handleViewPost(post.id, post.author)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No posts found.</p>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          {selectedPost.map((post, index) => {
            const user = selectedUser[0];
            const theme = giveThemeFromEmotion(post.feeling);
            const backgroundColor = theme.backgroundColor;
            const textColor = theme.textColor;
            const emotion = theme.emotion;

            return (
              <div
                key={index}
                style={{ backgroundColor, color: textColor }}
                className="modal-content"
              >
                <button
                  className="close-modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>

                <div className="user-card">
                  <img
                    className="user-image"
                    src={
                      user.profilePicture === "default"
                        ? defaultImages.defaultProfile
                        : user.profilePicture
                    }
                  />
                  <div className="user-info">
                    <span
                      style={{ fontWeight: "bold" }}
                      className="user-fullName"
                    >
                      {user.fullName}
                    </span>

                    <span style={{ opacity: 0.5 }} className="user-username">
                      @{user.username}
                    </span>
                  </div>
                </div>

                <div className="post-content">
                  <p style={{ opacity: "0.5" }}>
                    {user.fullName} is feeling {emotion}
                  </p>
                  <p className="post-caption">{post.caption}</p>
                </div>

                {post.image ? (
                  <img
                    style={{ width: "500px", borderRadius: 8 }}
                    className="post-image"
                    src={post.image}
                  />
                ) : null}

                <div className="post-created-container">
                  <p style={{ marginBottom: 0 }} className="post-created-at">
                    {post.date}
                  </p>
                  <p style={{ margin: 0 }} className="post-created-at">
                    {post.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
