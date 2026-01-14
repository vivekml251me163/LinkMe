"use client";
import Link from "next/link";
import localFont from "next/font/local";
import { useEffect, useState, useRef } from "react";


import { signIn, signOut, useSession } from "next-auth/react"

const LinkSansR = localFont({
  src: "../app/Fonts/LinikSans-Regular.ttf",
});
const LinkSansM = localFont({
  src: "../app/Fonts/LinikSans-Medium.ttf",
});
const LinkSansE = localFont({
  src: "../app/Fonts/LinikSans-ExtraBold.ttf",
});

export default function Navbar() {
  
    const { data: session } = useSession()
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 80) setShow(false);
      else setShow(true);
      setLastScrollY(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 
      w-[95%] md:w-[80vw]  md:max-w-7xl 
      -translate-x-1/2 rounded-full bg-white 
      transition-transform duration-300
      ${show ? "translate-y-0" : "-translate-y-96"}`}
    >
      <nav className="flex h-15 md:h-20 items-center justify-between px-4 md:px-6">
        
        {/* Left */}
        <div className={`flex items-center gap-6 ${LinkSansR.className}`}>
          <Link href='/'><img src="logo.png" alt="LinkMe Logo" className=" h-5 md:h-8 " /></Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-900">
            <Link href="/">Home</Link>
            <Link href="/suggestions">Suggestions</Link>
            <Link href="/ask">Ask doubt</Link>
            <Link href="/about">About us</Link>
            <Link href="/feedback">Feedback</Link>
          </div>
        </div>

        {/* Right */}
       {session ? (
         <div className="relative" ref={dropdownRef}>
                
           <button 
             onClick={() => setDropdownOpen(!dropdownOpen)}
             className="flex items-center gap-3 cursor-pointer p-2 px-6 justify-center border border-green-700 focus:ring-1 focus:ring-green-500 bg-green-400 rounded-full transition"
             aria-label="User menu"
             aria-expanded={dropdownOpen}
           >
             {session.user.image && (
               <img 
                 src={session.user.image} 
                 alt={`${session.user.name} avatar`}
                 className="w-8 h-8 rounded-full object-cover"
               />
             )}
             <div className="flex flex-col items-start">
               <span className={`t text-gray-900 ${LinkSansM.className}`}>
                 {session.user.name || session.user.email?.split('@')[0]}
               </span>
             </div>
          <img src="arrow down.svg" alt="" className={`cursor-pointer transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
           </button>

           {/* Dropdown Menu */}
           {dropdownOpen && (
             <aside className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50" role="menu">
               <div className="py-2">
                 <div className="px-4 py-2 border-b border-gray-100">
                   <p className={`text-sm font-semibold text-gray-900 ${LinkSansM.className}`}>
                     {session.user.name || session.user.email}
                   </p>
                   <p className="text-xs text-gray-500">@{session.user.email?.split('@')[0]}</p>
                 </div>
                 
                 <Link href="/">
                   <div className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition">
                     Home
                   </div>
                 </Link>
                 <Link href="/admin">
                   <div className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition">
                     Edit Links
                   </div>
                 </Link>
                 <Link href={`/@${session.user.email?.split('@')[0]}`} >
                   <div className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition">
                     LinkMe Page
                   </div>
                 </Link>
                 

                 <div className="border-t border-gray-100 mt-1 pt-1">
                   <button
                     onClick={() => {
                       signOut();
                       setDropdownOpen(false);
                     }}
                     className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition"
                   >
                     Logout
                   </button>
                 </div>
               </div>
             </aside>
           )}
         </div>
       ) : (
         <div className="flex items-center gap-3 text-sm md:text-md">
           <Link href={'/login'} className="cursor-pointer"><button
             className={`rounded-lg bg-gray-100 cursor-pointer px-5 py-2.5 text-gray-900 ${LinkSansM.className}`}
           >
             Log in
           </button></Link>
           <Link href={'/login'} className="cursor-pointer"><button className="rounded-full cursor-pointer bg-gray-900 px-5 py-2.5 text-white">
             Sign up free
           </button></Link>
         </div>
       )}
      </nav>
    </header>
  );
}
