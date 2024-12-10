"use client";

import UserReportTable from "@/components/UserReportTable";
import UserTable from "@/components/UserTable";
import "@/app/styles.css";

export default function Users() {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <UserTable />
      <UserReportTable />
    </main>
  );
}
