'use client'
import localFont from 'next/font/local'
import AutoScrollGallery from "@/components/AutoScrollGallery";
import Navbar from "@/components/Navbar";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

const LinkSansR = localFont({
  src: './Fonts/LinikSans-Regular.ttf'
})
const LinkSansM = localFont({
  src: './Fonts/LinikSans-Medium.ttf'
})
const LinkSansE = localFont({
  src: './Fonts/LinikSans-ExtraBold.ttf'
})

export default function Home() {
  
    const { data: session } = useSession()
  return (
    <>
    <Navbar/>
    <main role="main">
      <section className="bg-[#d2e823] h-screen pt-30  md:p-0" id="hero">
        <div className="flex flex-col md:flex-row gap-15  justify-center items-center">

          <div className="text-[#254f1a] flex flex-col gap-5 mx-4 sm:items-center md:items-start">
            <div>
              <h1 className={`${LinkSansE.className} text-5xl md:text-7xl font-semibold tracking-[-0.06em]  text-center md:text-left`}>
                A link in bio
              </h1>
              <h2 className={`${LinkSansE.className} text-5xl md:text-7xl font-semibold tracking-[-0.06em]  text-center md:text-left`}>
                built for you.
              </h2>
            </div>

            <p className="text-center md:text-left max-w-xl  leading-relaxed">
              Join 70M+ people using LinkMe for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>

            <div className="flex md:flex-row flex-col gap-2">
              <input
                type="text"
                className={`rounded-lg bg-gray-100 p-4 px-6 text-gray-900 tracking-tight transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-[#254f1a] hover:bg-gray-200 ${LinkSansM.className}`}
                placeholder="< LinkMe />"
                aria-label="Enter your username"
              />
              <Link href={session? '/admin' : '/login'} className="rounded-full bg-[#254f1a] p-4 px-6 text-white tracking-tight transition duration-200 hover:bg-[#1a3a13] hover:shadow-lg active:scale-95 cursor-pointer font-medium">
                Get started for free
              </Link>
            </div>
          </div>

          <AutoScrollGallery
            images={["img1.jpg", "img2.jpg", "img3.jpg"]}
            height="100vh"
          />
        </div>
      </section>

    </main>
</>
  );
}
