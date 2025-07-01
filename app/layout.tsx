import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarBackground from "@/components/StarBackground";
import CursorSparkleTrail from "@/components/CursorSparkleTrail";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Ria's Portfolio",
  description: "Portfolio of Ria Arora, a full stack developer and CS student",
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="en">
      <body className="relative">
        <CursorSparkleTrail />
        <StarBackground />
        {children}
      </body>
    </html>
  );
}
