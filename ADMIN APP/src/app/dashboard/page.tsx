import LineGraph from "@/components/HomePageComponents/LineGraph";
import BarGraph from "@/components/HomePageComponents/BarGraoh";
import PieGraph from "@/components/HomePageComponents/PieGraph";
import AreaGraph from "@/components/HomePageComponents/AreaGraph";
import PostStatCard from "@/components/PostStatCard";
import UserStatCard from "@/components/UserStatCard";

export default function Home() {
  return (
    <div>
      <div className="stats-container">
        <PostStatCard />
        <UserStatCard />
      </div>
      {/* <div className="graphs-container">
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
      </div> */}

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
                    flex-wrap: wrap;
                }
                .graphs-container {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .subgraphs-container {
                    width: 70%;
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
                    flex-wrap: wrap;
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

                @media (max-width: 1024px) {
                    .stats-container {
                        flex-direction: column;
                        gap: 30px;
                    }

                    .graphs-container {
                        flex-direction: column;
                        gap: 30px;
                    }

                    .subgraphs-container {
                        width: 100%;
                    }

                    .line-bar-container {
                        flex-direction: column;
                        gap: 30px;
                    }

                    .pie-container {
                        width: 100%;
                        margin-right: 0;
                    }

                    .area-graph-container {
                        width: 100%;
                    }
                }

            `}</style>
    </div>
  );
}
