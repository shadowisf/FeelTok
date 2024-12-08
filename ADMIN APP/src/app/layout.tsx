
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FeelTok Admin",
  description: "The Admin Dashborad Of The FeelTok Application",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang = "en">
      <body>{ children }</body>
    </html>
  );
}
