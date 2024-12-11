import Link from "next/link";
import { defaultImages } from "@/constants/icons";
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
          </div>
          <div className="right">{children}</div>
        </div>
      </body>
    </html>
  );
}
