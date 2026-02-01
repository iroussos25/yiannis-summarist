
import type { Metadata } from 'next';
import './global.css'
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarist (Dashboard Ready)",
  description: "A professional project showcasing full-stack skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode }) 
  
  {
    return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
<ClientLayoutWrapper>
          {children}
</ClientLayoutWrapper>
      </body>
    </html>
  );
}
