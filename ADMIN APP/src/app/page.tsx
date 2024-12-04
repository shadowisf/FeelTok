"use client";

import "./styles.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div
        style={{
          width: "95dvw",
          height: "95dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          overflow: "hidden",
        }}
      >
        <Link href="/users">Users</Link>
        <Link href="/posts">Posts</Link>
      </div>
    </main>
  );
}
