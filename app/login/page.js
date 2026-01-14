'use client'

import React, { useEffect } from "react";
import Link from "next/link";
import localFont from "next/font/local";

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";


const LinkSansR = localFont({
  src: '../Fonts/LinikSans-Regular.ttf'
})
const LinkSansM = localFont({
  src: '../Fonts/LinikSans-Medium.ttf'
})
const LinkSansE = localFont({
  src: '../Fonts/LinikSans-ExtraBold.ttf'
})

const Login = () => {
  const { data: session, status } = useSession()

const router = useRouter()

  useEffect(() => {
  if (status === "authenticated") {
    router.push("/admin")
  }
}, [status, router])

  if (status === "loading") return null

    
  return (
    <div className="min-h-screen flex bg-[url('/sign-in.jpg')] bg-cover bg-center bg-no-repeat">
      <Navbar/>
      <main className="w-full md:w-1/2 bg-white px-10 md:px-20  flex flex-col pt-25 " role="main">

        <h1 className={`${LinkSansE.className} text-5xl md:text-7xl  tracking-tighter`}>Welcome back</h1>
        <p className="text-md text-gray-500 mt-2 leading-relaxed">Just one link to connect everywhere!</p>

        <form className="mt-8 space-y-5 ">
          <fieldset className="space-y-4">
            <legend className="sr-only">Login form</legend>
            <div>
              <label htmlFor="email" className="text-sm  text-gray-700">Email</label>
              <input 
                id="email"
                type="email" 
                placeholder="Enter your email address" 
                className={`rounded-lg mt-1 bg-gray-100 w-full p-4 px-6 text-gray-900 tracking-tight ${LinkSansM.className}`}
                aria-label="Email address" 
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm  text-gray-700">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder="Enter your password" 
                className={`rounded-lg mt-1 bg-gray-100 w-full p-4 px-6 text-gray-900 tracking-tight ${LinkSansM.className}`}
                aria-label="Password"
              />
            </div>
          </fieldset>

          <div className="flex items-center justify-between text-sm">
            <label htmlFor="remember" className="flex items-center gap-2 text-gray-600"><input id="remember" type="checkbox" className="rounded" aria-label="Remember me" />Remember me</label>
            <Link href="#" className="text-[#254f1a] hover:underline ">Forgot password?</Link>
          </div>

          <div className="w-full flex justify-center"><button type="submit" onClick={toast.error('Failed to submit. Try  using signing un by Google')} className="w-1/2 text-center rounded-full bg-[#254f1a] p-4 px-6 text-white  tracking-tight">Log in</button>
          </div>
        </form>

        <div className="my-6 flex items-center gap-4"><div className="h-px w-full bg-gray-200"></div><span className="text-xs text-gray-400">OR</span><div className="h-px w-full bg-gray-200"></div></div>

        <button type="button"  onClick={() => signIn("google")} className="text-white font-medium  justify-center-safe rounded-md bg-blue-500 hover:bg-blue-500/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 box-border border border-transparent leading-5   px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd" /></svg>
          Sign up with Google
        </button>

        <p className="mt-6 text-sm text-gray-600 text-center">Don’t have an account? <Link href="#" className="text-[#254f1a]  underline">Sign In</Link></p>
      </main>
    </div>
  );
};

export default Login;
