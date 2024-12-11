"use client";

import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { defaultColors } from "@/constants/colors";
import Loader from "./Loader";
import { UserReport } from "@/constants/types";

export default function UserReportTable() {
  const [userReports, setUserReports] = useState<UserReport[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleListAllUserReports();
  }, []);

  async function handleListAllUserReports() {
    const response = await fetch("/api/listAllUserReports", {
      method: "GET",
    });
    const userReports = await response.json();

    if (response.ok) {
      setUserReports(userReports.data);
    }
  }

  async function handleResolveUserReport(targetUID: string, reportID: string) {
    setIsLoading(true);

    const response = await fetch("/api/resolveUserReport", {
      method: "POST",
      body: JSON.stringify({ targetUID, reportID }),
    });
    const data = await response.json();

    console.log(data);

    await handleListAllUserReports();

    setIsLoading(false);
  }

  return (
    <div>
      <Loader isVisible={isLoading} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>User Reports</h1>

        <CustomButton
          label="Refresh"
          color={defaultColors.primary}
          onClick={handleListAllUserReports}
        />
      </div>

      {userReports.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Reported User (UID)</th>
              <th>Author</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {userReports.map((report) => (
              <tr key={report.reportID}>
                <td style={{ fontWeight: "bold" }}>{report.targetUID}</td>
                <td>{report.author}</td>
                <td>{report.reason}</td>
                <td>
                  <CustomButton
                    label="Resolve"
                    onClick={() =>
                      handleResolveUserReport(report.targetUID, report.reportID)
                    }
                    color="darkgreen"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No current user reports.</p>
      )}
    </div>
  );
}
