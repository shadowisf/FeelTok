import Link from "next/link";
import { defaultIcons, defaultImages } from "@/constants/icons";
import "@/app/styles.css";

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
              <Link href="/dashboard/home">Home</Link>
              <Link href="/dashboard/users">Users</Link>
              <Link href="/dashboard/posts">Posts</Link>
            </div>

            <div className="logout">
              <Link href="/">
                <div className="logout-content">
                  <img src={defaultIcons.logout} width={18} height={18} />
                  <span>Log Out</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="right">{children}</div>
        </div>
      </body>
    </html>
  );
}
