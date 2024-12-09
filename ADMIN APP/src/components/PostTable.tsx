"use client";

import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import CustomSearchBar from "@/components/CustomSearchBar";
import { defaultColors } from "@/constants/colors";
import Loader from "./Loader";
import { giveThemeFromEmotion } from "@/utils/postColors";
import Avatar from "./Avatar";
import "../app/styles.css";

export default function PostTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post[]>([]);
  const [selectedPostUser, setSelectedPostUser] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listAllPosts();
  }, []);

  async function listAllPosts() {
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
      setSelectedPostUser(user.data);
    }
  }

  async function handleDeletePost(id: string) {
    setIsLoading(true);

    const response = await fetch("/api/deletePost", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();

    console.log(data);

    listAllPosts();

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
            onClick={() => handleSearchPost(searchQuery)}
            color={defaultColors.primary}
          />
        </div>

        <CustomButton
          label="Refresh"
          onClick={() => listAllPosts()}
          color={defaultColors.primary}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Caption</th>
            <th>Image</th>
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
              <td>
                <Avatar image={post.image} alt="user's profile picture" />
              </td>
              <td>{post.date + ", " + post.time}</td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
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

      {isModalOpen && (
        <div className="modal-overlay">
          {selectedPost.map((post, index) => {
            const user = selectedPostUser[0];
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
                  <img className="user-image" src={user.profilePicture} />
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

                <img
                  style={{ width: "500px" }}
                  className="post-image"
                  src={post.image}
                />

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

      <style>
        {`
        .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Modal Content */
.modal-content {
    border-radius: 12px;
    padding: 20px;
    max-width: 500px;
    max-height: auto;
    overflow-y: auto;
    position: relative;
}

/* Close Button */
.close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
}

.user-image {
    width: 75px;
    height: 75px;
    border-radius: 50%;
}

.user-card {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
}

.post-created-at {
    opacity: 0.5;
    text-align: end;
}

.post-created-container {
    display: flex;
    flex-direction: column;
}`}
      </style>
    </>
  );
}
