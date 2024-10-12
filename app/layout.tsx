import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import RegisterModal from "./components/modals/Modal/RegisterModal";
import LoginModal from "./components/modals/Modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import LoanModal from "./components/modals/Modal/LoanModal";
import SearchModal from "./components/modals/Modal/SearchModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ranjan Books",
  description: "A library for your fav books",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser(); 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>
          <ToasterProvider />
          <LoanModal />
          <SearchModal /> 
          <RegisterModal /> 
          <LoginModal /> 
          <Navbar currentUser={currentUser} /> 
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
