import type { Metadata } from "next";
import { Exo } from "next/font/google";
import AnnouncementBar from "./_components/AnnouncementBar/AnnouncementBar";
import Features from "./_components/Features/Features";
import Footer from "./_components/Footer/Footer";
import Navbar from "./_components/Navbar/Navbar";
import "./globals.css";
import { cn } from "@/lib/utils";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Fresh groceries and everyday essentials delivered to your door",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("font-sans", exo.variable)}>
      <body className="min-h-screen bg-white font-sans font-medium text-gray-700 antialiased">
        <AnnouncementBar />
        <Navbar />
        {children}
        <Features />
        <Footer />
      </body>
    </html>
  );
}
