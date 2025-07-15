'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideMenu from "./components/navigation/SideMenu";
import "@fortawesome/fontawesome-svg-core/styles.css"
import {config} from "@fortawesome/fontawesome-svg-core";
import { ApolloProvider } from "@apollo/client";
import ApolloWrapper from "./lib/ApolloWrapper";
import { usePathname } from "next/navigation";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "LightFin",
//   description: "SDP",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  const pathName = usePathname();

  const hideSideMenu = pathName === '/login' || pathName === '/register';

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${!hideSideMenu && `grid grid-cols-[0.1fr_0.9fr]`} antialiased w-screen h-screen m-0 p-0 bg-[#F8F9FA] overflow-x-hidden`}
      >
        {!hideSideMenu && <SideMenu/>}
        <main className="overflow-x-hidden overflow-y-auto w-full h-full p-0 m-0">
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>          
      </body>
    </html>
  );
}
