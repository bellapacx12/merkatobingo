"use client";

import "../styles/globals.css";
import { Noto_Sans_Ethiopic } from "next/font/google";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import { BottomNavProvider } from "@/context/BottomNavContext";

const noto = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="am">
      <body className={noto.className}>
        <BottomNavProvider>
          <div className="min-h-screen flex justify-center bg-gradient-to-b from-[#1a1a3c] to-[#2d1b69] text-white">
            {/* Center container */}
            <div className="w-full max-w-[480px] relative">
              {/* TopBar fixed */}
              <TopBar />

              {/* Page content */}
              <main className="pt-16 pb-20 px-4">{children}</main>

              {/* BottomNav fixed */}
              <BottomNav />
            </div>
          </div>
        </BottomNavProvider>
      </body>
    </html>
  );
}
