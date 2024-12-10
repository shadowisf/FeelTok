import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { defaultColors } from "@/constants/colors";
import Loader from "./Loader";
import { PostReport } from "@/constants/types";

export default function PostReportTable() {
  const [postReports, setPostReports] = useState<PostReport[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleListAllPostReports();
  }, []);

  async function handleListAllPostReports() {
    const response = await fetch("/api/listAllPostReports", {
      method: "GET",
    });
    const postReports = await response.json();

    if (response.ok) {
      setPostReports(postReports.data);
    }
  }

  async function handleResolvePostReport(
    targetPostID: string,
    reportID: string
  ) {
    setIsLoading(true);

    const response = await fetch("/api/resolvePostReport", {
      method: "POST",
      body: JSON.stringify({ targetPostID: targetPostID, id: reportID }),
    });
    const data = await response.json();

    console.log(data);

    handleListAllPostReports();

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
        <h1>Post Reports</h1>
        <CustomButton
          label="Refresh"
          color={defaultColors.primary}
          onClick={handleListAllPostReports}
        />
      </div>

      {postReports.length === 0 ? (
        <p>No current post reports.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Reported Post (ID)</th>
              <th>Author</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postReports?.map((report, index) => (
              <tr key={index}>
                <td>{report.targetPostID}</td>
                <td>{report.author}</td>
                <td>{report.reason}</td>
                <td>
                  <CustomButton
                    label="Resolve"
                    onClick={() =>
                      handleResolvePostReport(report.targetPostID, report.id)
                    }
                    color="darkgreen"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
