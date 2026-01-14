import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from 'next/font/local'
import SessionWrapper from "@/components/SessionWrapper";

import { ToastContainer,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const LinkSansR = localFont({
  src: './Fonts/LinikSans-Regular.ttf'
})
const LinkSansM = localFont({
  src: './Fonts/LinikSans-Medium.ttf'
})
const LinkSansE = localFont({
  src: './Fonts/LinikSans-ExtraBold.ttf'
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinkMe",
  description: "Clone of LinkTree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${LinkSansR.className} font-semibold  `}>
        <SessionWrapper>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
        
        <main>
          {children}
        </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
