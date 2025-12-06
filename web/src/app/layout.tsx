import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PedreirosFC - Official Team Hub",
  description: "Site oficial do time PedreirosFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pedreiro-dark text-white min-h-screen`}
      >
        <Sidebar />
        <main className="md:pl-20 pb-20 md:pb-0 min-h-screen relative overflow-hidden">
          {/* Background effects */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pedreiro-purple/20 rounded-full blur-[128px]" />
             <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-pedreiro-blue/10 rounded-full blur-[128px]" />
          </div>
          
          {children}
        </main>
      </body>
    </html>
  );
}
