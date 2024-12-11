import LineGraph from "@/components/LineGraph";
import PostStatCard from "@/components/PostStatCard";
import UserStatCard from "@/components/UserStatCard";
import "@/app/styles.css";

export default function Home() {
  return (
    <>
      <div className="stats-container">
        <PostStatCard />
        <UserStatCard />
      </div>

      <div className="graphs-container">
        <LineGraph />
      </div>
    </>
  );
}
