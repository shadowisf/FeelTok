"use client";

import { useState } from "react";
import { defaultIcons, defaultImages } from "@/constants/icons";
import router from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="image-container">
          <img
            src={defaultImages.loginPageBackground}
            className="login-image"
          />
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>

          <div className="input-group">
            <img src={defaultIcons.email} className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <img src={defaultIcons.password} className="input-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <button className="signin-btn">Sign In</button>
        </form>
      </div>

      <style>{`
        html, body {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        .signin-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5;
        }

        .signin-box {
          display: flex;
          width: 1200px;
          height: 80%;
          background-color: white;
          border-radius: 72px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 2px solid black;
        }

        .image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: #e0e0e0;
          border-radius: 72px;
          border-right: 2px solid gray;
        }

        .login-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .signin-form {
          flex: 0.5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px;
        }

        h1 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 30px;
        }

        .input-group {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .input-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }

        input {
          flex: 1;
          padding: 10px 10px 10px 20px;
          font-size: 1rem;
          border: 2px solid black;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .signin-btn {
          width: 100%;
          padding: 10px;
          background-color: black;
          color: white;
          border: none;
          margin-top: 20px;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .signin-btn:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}
