import { Metadata } from "next";
import "@/app/styles.css";

export const metadata: Metadata = {
  title: "FeelTok Admin",
  description: "The Admin Dashborad Of The FeelTok Application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
