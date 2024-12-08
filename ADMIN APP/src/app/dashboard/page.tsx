import StatsCard from "@/components/HomePageComponents/StatsCard";
import LineGraph from "@/components/HomePageComponents/LineGraph";
import BarGraph from "@/components/HomePageComponents/BarGraoh";
import PieGraph from "@/components/HomePageComponents/PieGraph";
import AreaGraph from "@/components/HomePageComponents/AreaGraph";

export default function Home() {
  return (
    <div>
      <div className="stats-container">
        <StatsCard name="Users" value="58.39 K" option="See all" />
        <StatsCard name="Posts" value="24.43 K" option="All posts" />
        <StatsCard name="Revenue" value="$ 43,594.00" option="Statistics" />
      </div>
      <div className="graphs-container">
        <div className="subgraphs-container">
          <div className="line-bar-container">
            <LineGraph />
            <BarGraph />
          </div>
          <div className="area-graph-container">
            <AreaGraph />
          </div>
        </div>
        <div className="pie-container">
          <PieGraph />
        </div>
      </div>

      <style>{`
                .stats-container {
                    justify-content: center;
                    align-items: center;
                    gap: 50px;
                    display: flex;
                    flex-direction: row;
                    box-sizing: border-box;
                    padding: 20px;
                    width: 100%
                }
                .graphs-container {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .subgraphs-container {
                    width: 75%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                    margin-top: 50px;
                }
                .line-bar-container {
                    display: flex;
                    gap: 20px;
                    flex: 1;
                }
                .pie-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 0 0 300px;
                    margin-right: 50px;
                }
                .area-graph-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 75%;
                }
            `}</style>
    </div>
  );
}
