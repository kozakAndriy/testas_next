import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "TestAS Vorbereitung",
  description: "App that helps prepare for TestAS",
  icons: "testas-logo.png"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable}`}
        id="body"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
