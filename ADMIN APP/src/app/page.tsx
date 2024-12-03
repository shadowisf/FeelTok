"use client";

import UserReportTable from "@/components/UserReportTable";
import "./styles.css";
import UserTable from "@/components/UserTable";

export default function Home() {
  return (
    <main>
      <UserReportTable />
      <UserTable />
    </main>
  );
}
