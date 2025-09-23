import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arsip Progress KKP",
  description:
    "Sebuah aplikasi mirip Linktree yang berfungsi sebagai kumpulan tautan terkait data dan informasi Kementerian Kelautan dan Perikanan (KKP). Setiap tautan dapat ditambahkan, diperbarui, atau dihapus sesuai kebutuhan sehingga memudahkan pengelolaan dan akses data dalam satu tempat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#033d23] min-h-screen text-white`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

// 054d2c
