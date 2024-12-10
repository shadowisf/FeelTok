import Link from "next/link";
import { defaultImages } from "@/constants/icons";
import { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "FeelTok Admin",
  description: "The Admin Dashborad Of The FeelTok Application",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <div className="container">
          <div className="left">
            <div className="logo">
              <img src={defaultImages.logo} width={40} height={60} />
              <h1>FeelTok</h1>
            </div>
            <div className="links">
              <Link href="/">Home</Link>
              <Link href="/users">Users</Link>
              <Link href="/posts">Posts</Link>
            </div>

            <div></div>
          </div>
          <div className="right">{children}</div>
        </div>

        <style>
          {`
                    html, body {
                        height: 100%;
                        margin: 0;
                        overflow: hidden;
                        font-family: Arial, sans-serif;
                    }

                    .container {
                        display: flex;
                        height: 100vh;
                        padding: 0;
                    }

                    .left {
                        width: 10%;
                        min-width: 150px;
                        background-color: #D2DCF0;
                        padding: 50px 0 50px 0;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        text-align: center;
                    }

                    .logo {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 20px;
                        display: block;
                    }

                    .logo h1 {
                        font-size: 28px;
                        font-weight: bold;
                    }
                        
                    .links a {
                        display: block;
                        padding: 10px;
                        margin-bottom: 10px;
                        color: black;
                        text-decoration: none;
                        text-align: center;
                        border-radius: 5px;
                        transition: background-color color 0.3s ease;
                    }

                    .links a:hover {
                        background-color: black;
                        color: white;
                    }

                    .links a:active {
                        background-color: black;
                        color: white;
                    }

                    .right {
                        flex: 1;
                        flex-grow: 1;
                        overflow-y: auto;
                        background-color: #EDF2F9;
                        padding: 20px;
                        box-sizing: border-box;
                    }
                `}
        </style>
      </body>
    </html>
  );
}
