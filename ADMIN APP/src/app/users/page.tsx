"use client";

import "../../app/styles.css";
import UserReportTable from "@/components/UserReportTable";
import UserTable from "@/components/UserTable";

export default function Users() {
  return (
    <main>
      <UserReportTable />
      <UserTable />
    </main>
  );
}
