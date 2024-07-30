import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Toaster from "./toaster";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatHN – Chat with Hacker News using natural language",
  description:
    "Chat with Hacker News using natural language. Built with OpenAI Functions and Vercel AI SDK.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='max-w-5xl mx-auto'>
          <h1 className={"inline-block text-transparent bg-clip-text py-4 text-6xl font-bold bg-gradient-to-r from-[#009FFF] to-[#ec2F4B] font-squarePeg"}>ImaginAI</h1>
        </div>
        {children}
        <Toaster />
      </body>
      <Analytics />
    </html>
  );
}
