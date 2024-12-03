import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { defaultColors } from "@/constants/colors";

export default function UserReportTable() {
  const [userReports, setUserReports] = useState<UserReport[]>([]);

  useEffect(() => {
    listAllUserReports();
  }, []);

  async function listAllUserReports() {
    const response = await fetch("/api/listAllUserReports", {
      method: "GET",
    });
    const userReports = await response.json();

    setUserReports(userReports);
  }

  async function handleDeleteUserReport(targetUID: string, reportID: string) {
    const response = await fetch("/api/deleteUserReport", {
      method: "POST",
      body: JSON.stringify({ targetUID: targetUID, reportID: reportID }),
    });

    if (response.ok) {
      alert("User report resolved successfully");
      listAllUserReports();
    }
  }

  return (
    <>
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
          onClick={listAllUserReports}
        />
      </div>

      {userReports.length === 0 ? (
        <p>No current user reports</p>
      ) : (
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
            {userReports?.map((report) => (
              <tr key={report.reportID}>
                <td>{report.targetUID}</td>
                <td>{report.author}</td>
                <td>{report.reason}</td>
                <td>
                  <CustomButton
                    label="Resolve"
                    onClick={() =>
                      handleDeleteUserReport(report.targetUID, report.reportID)
                    }
                    color="darkgreen"
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
