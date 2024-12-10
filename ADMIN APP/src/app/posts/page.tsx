"use client";

import PostReportTable from "@/components/PostReportTable";
import PostTable from "@/components/PostTable";
import "@/app/styles.css";

export default function Posts() {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <PostTable />
      <PostReportTable />
    </main>
  );
}
