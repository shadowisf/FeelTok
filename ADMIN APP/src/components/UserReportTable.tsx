import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { defaultColors } from "@/constants/colors";
import Loader from "./Loader";
import "../app/styles.css";
import { UserReport } from "@/constants/types";

export default function UserReportTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [userReports, setUserReports] = useState<UserReport[]>([]);

  useEffect(() => {
    listAllUserReports();
  }, []);

  async function listAllUserReports() {
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
      body: JSON.stringify({ targetUID: targetUID, reportID: reportID }),
    });
    const data = await response.json();

    console.log(data);

    listAllUserReports();

    setIsLoading(false);
  }

  return (
    <>
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
          onClick={listAllUserReports}
        />
      </div>

      {userReports.length === 0 ? (
        <p>No current user reports.</p>
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
                      handleResolveUserReport(report.targetUID, report.reportID)
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
