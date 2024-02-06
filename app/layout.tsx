import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Tester",
  description: "Testing out my AI capabilities",
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