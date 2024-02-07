import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Schedulebot",
  description: "Schedule meetings and tasks easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-svh flex p-2">{children}</body>
    </html>
  );
}