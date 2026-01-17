'use client'

import React, { useEffect, useState } from 'react'
import { signIn, signOut } from "next-auth/react"
import { toast,Bounce } from "react-toastify";



import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



/* Fonts */
const LinkSansR = localFont({ src: '../Fonts/LinikSans-Regular.ttf' })
const LinkSansM = localFont({ src: '../Fonts/LinikSans-Medium.ttf' })
const LinkSansE = localFont({ src: '../Fonts/LinikSans-ExtraBold.ttf' })

/* Providers */
const PROVIDERS = [
  { name: 'GitHub', icon: 'github', helper: 'Enter your GitHub profile URL.' },
  { name: 'Gmail', icon: 'gmail', helper: 'Enter your Gmail address or mailto link.' },
  { name: 'YouTube', icon: 'youtube', helper: 'Enter your YouTube channel or video URL.' },
  { name: 'Telegram', icon: 'telegram', helper: 'Enter your Telegram profile or channel URL.' },
  { name: 'LinkedIn', icon: 'linkedin', helper: 'Enter your LinkedIn profile URL.' },
  { name: 'Instagram', icon: 'instagram', helper: 'Enter your Instagram profile URL.' },
  { name: 'Twitter (X)', icon: 'Twitter', helper: 'Enter your Twitter (X) profile URL.' },
]

export default function AdminClient({ session }) {

  const router = useRouter()

  const name = session.user.name
  const avatar = session.user.image
  const email = session.user.email
  const username = session.user.email?.split('@')[0]



 //normalise url
  const normalizeUrl = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url
  }
  return url
}

  /* Link cards */
  const [links, setLinks] = useState([
    {
      _id: 1,
      title: '',
      url: '',
      active: true,
      helperText: 'Enter your YouTube URL, then set up your link.',
      icon: 'youtube',
    },
    {
      _id: 2,
      title: '',
      url: '',
      active: true,
      helperText:
        'Enter your Instagram URL or connect your account, then publish your link.',

      icon: 'instagram',
    },
  ])
  console.log(links)

  const [showModal, setShowModal] = useState(false)
  const [customApp, setCustomApp] = useState('')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // Get request to get links from backend
  useEffect(() => {

    const fetchLinks = async () => {
      const res = await fetch(`/api/add?email=${email}`);
      const data = await res.json();

      if (res.ok) {
        setLinks(data.links);
      }
    };

    fetchLinks();
  }, []);




  // Submit links to backend
  const saveLinks = async () => {
    await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links }),
    })
  }


  /* Update field */
  const updateLink = (id, key, value) => {
    setLinks(prev =>
      prev.map(l => (l._id === id ? { ...l, [key]: value } : l))
    )
  }
console.log(links)
  /* Delete */
  const deleteLink = id => {
    setLinks(prev => prev.filter(l => l._id !== id))
  }

  /* Add new link */
  const addLink = (title, icon, helperText) => {
    setLinks(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        url: '',
        active: true,
        helperText,
        icon,
      },
    ])
    setShowModal(false)
    setCustomApp('')
    console.log(links);
  }

  // share urls (clipboard copy)
  const shareUrl = () => {

    const profileLink = `${process.env.NEXT_PUBLIC_HOST}/@${username}`
    navigator.clipboard.writeText(profileLink)
    toast.success('Copied to clipboard!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  }


  return (
    <>
      <div className=" h-screen bg-gray-50 grid md:grid-cols-[15%_minmax(0,1fr)_25%] gap-12 md:px-6">


        {/* LEFT */}
        <div className="hidden md:flex flex-col text-sm text-gray-600 sticky top-0 h-screen">
          <div className="space-y-6 py-8 flex flex-col h-full">
            {/* Profile Section - Top */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-400 hover:shadow-md hover:border-gray-500 transition duration-200 cursor-pointer active:scale-95"
              >
                <img src="arrow down.svg" alt="down" className={`absolute top-5 right-2 cursor-pointer transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`} />
                <div className="flex items-center gap-3">
                  <img src={avatar} alt="profile" width={30} className='rounded-full' />
                  <div className="text-left">
                    <p className={`${LinkSansM.className} text-sm text-[#0f1724]`}>
                      {name}
                    </p>
                    <p className="text-xs text-gray-400">@{username}</p>
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">

                  <Link href='/ask' className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition duration-150 cursor-pointer flex items-center gap-2 text-gray-700 border-b border-gray-100 active:bg-gray-100">
                    <span><img src="question.svg" alt="question" /></span>
                    <span>Ask Doubt</span>
                  </Link>

                  <Link href='/feedback' className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition duration-150 cursor-pointer flex items-center gap-2 text-gray-700 border-b border-gray-100 active:bg-gray-100">
                    <span><img src="feedback.svg" alt="feedback" /></span>
                    <span>Feedback</span>
                  </Link>

                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/login" })

                      showProfileDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 transition duration-150 cursor-pointer flex items-center gap-2 text-red-600 active:bg-red-100">
                    <span><img src="logout.svg" alt="logout" /></span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Logo/Brand Section */}
            <div className="mb-4">
              <h3 className={` text-lg text-[#0f1724]`}>
                LinkMe
              </h3>
              <p className="text-xs text-gray-400 mt-1">Create & Share</p>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-3 w-fit flex flex-col">
              <div className="px-1 py-2.5 rounded-2xl border border-purple-300 cursor-pointer hover:shadow-md hover:border-purple-400 transition duration-200 active:scale-95">
                <div className="flex items-center gap-3">
                  <span className="text-lg"><img src="link.svg" alt="link" /></span>
                  <span className={`${LinkSansM.className} text-gray-900 font-medium`}>
                    Links
                  </span>
                </div>
              </div>

              <Link href={`/@${username}`} className="px-1 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200 active:scale-95">
                <div className="flex items-center gap-3">
                  <span className="text-lg"><img src="@.svg" alt="home" /></span>
                  <span className="text-gray-600 hover:text-gray-900 transition duration-150">LinkMe Page</span>
                </div>
              </Link>

              <Link href='/' className="px-1 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200 active:scale-95">
                <div className="flex items-center gap-3">
                  <span className="text-lg"><img src="home.svg" alt="home" /></span>
                  <span className="text-gray-600 hover:text-gray-900 transition duration-150">Home</span>
                </div>
              </Link>

              <Link href='/about' className="px-1 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200 active:scale-95">
                <div className="flex items-center gap-3">
                  <span className="text-lg"><img src="about.svg" alt="about" /></span>
                  <span className="text-gray-600 hover:text-gray-900 transition duration-150">About</span>
                </div>
              </Link>

              <Link href='/feedback' className="px-1 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200 active:scale-95">
                <div className="flex items-center gap-3">
                  <span className="text-lg"><img src="feedback.svg " alt="feedback" /></span>
                  <span className="text-gray-600 hover:text-gray-900 transition duration-150">Feedback</span>
                </div>
              </Link>
            </nav>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>


          </div>
        </div>

        {/* CENTER */}
        <div className=" border border-gray-200 h-screen ">
          <h2 className={`text-xl  px-4 py-2 text-[#0f1724] flex relative`}>
            Links

            <button onClick={saveLinks} className='absolute right-6 flex text-[15px] items-center text-slate-600 gap-1 px-3 bg-purple-700 text-white ring-purple-600 font-medium shadow-md ring py-1 rounded-2xl transition duration-200 hover:bg-purple-800 hover:shadow-lg active:scale-95 cursor-pointer'>
              Save Changes</button>

          </h2>
          <div className='border border-gray-200'></div>

          {/* PROFILE HEADER */}
          <div className='overflow-y-auto h-11/12 pb-10'>
            <div className=" mb-6 px-6 ">
              <div className="flex items-center gap-6 py-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#0d9488] flex items-center justify-center text-4xl text-white shadow-sm">
                  <img src={avatar} alt="profile" className='rounded-full' />
                </div>
                <div>
                  <h1 className={`${LinkSansE.className} text-3xl text-[#0f1724]`}>
                    {name}
                  </h1>
                  <p className="text-gray-600 text-sm">@{username}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {process.env.NEXT_PUBLIC_HOST}/{username}
                  </p>
                </div>
              </div>
              {/* ADD LINK BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className={`w-full bg-gradient-to-r font-medium from-purple-600 via-violet-700 to-purple-700 text-white py-2 rounded-full flex items-center justify-center gap-2 mb-6 transition duration-200 hover:shadow-lg active:scale-95 cursor-pointer ${LinkSansM.className}`}
              >
                <span><img src="plus sign.svg" alt="+" className='invert' width={22} /></span> Add
              </button>
            </div>



            {/* LINK CARDS */}
            <div className="space-y-3 px-6">
              {links.map((link, index) => (
                <div
                  key={link._id}
                  className={`rounded-2xl overflow-hidden ${link.active ? 'border border-yellow-400' : ''}`}>
                  <div className="p-5">
                    <div className="grid grid-cols-[20px_1fr_auto] gap-4">

                      <div className="text-gray-400">{index + 1}</div>

                      <div className="space-y-2">
                        <input
                          value={link.title}
                          onChange={e =>
                            updateLink(link._id, 'title', e.target.value)
                          }
                          placeholder="Title"
                          className="w-full font-medium outline-none transition duration-150 cursor-text focus:ring-1 focus:ring-purple-300 focus:rounded hover:bg-gray-50 px-2 py-1 rounded"
                        />
                        <input
                          value={link.url}
                          onChange={e =>
                            updateLink(link._id, 'url', e.target.value)
                          }
                          placeholder="URL"
                          className="w-full text-gray-500 outline-none transition duration-150 cursor-text focus:ring-1 focus:ring-purple-300 focus:rounded hover:bg-gray-50 px-2 py-1 rounded"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        {link.icon && <img src={`${link.icon}.svg`} alt={link.name} />}

                        <button
                          onClick={() =>
                            updateLink(link._id, 'active', !link.active)
                          }
                          className={`w-10 h-5 rounded-full relative transition duration-200 cursor-pointer hover:opacity-80 ${link.active ? 'bg-green-400' : 'bg-gray-300'}
                            `}
                        >
                          <span
                            className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${link.active ? 'left-5' : 'left-0.5'
                              }`}
                          />
                        </button>
                      </div>
                    </div>


                  </div>

                  <div className={`${link.active ? 'bg-yellow-100' : ''} px-5 py-3 text-sm font-medium`}>
                    {link.helperText}
                  </div>
                </div>
              ))}
              <div><button onClick={shareUrl} className='block md:hidden rounded-full border border-slate-400 text-center flex px-6 py-2 mx-auto transition duration-200 hover:bg-gray-100 hover:border-slate-500 active:scale-95 cursor-pointer'> @{username} <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" strokeWidth="1.5" className="!size-5 h-5 w-5 ml-1 text-foreground-primary hover:text-foreground-secondary transition-colors"><path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path></svg></button></div>

            </div>
          </div>
        </div>

        {/* RIGHT – PHONE PREVIEW */}
        <div className="md:block  space-y-8 hidden py-4 mx-auto ">
          <div><button onClick={shareUrl} className='rounded-full bg-slate-50 border border-slate-400 text-center flex px-6 py-2 transition duration-200 hover:bg-white hover:border-slate-500 active:scale-95 cursor-pointer'> @{username} <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" strokeWidth="1.5" className="!size-5 h-5 w-5 ml-1 text-foreground-primary hover:text-foreground-secondary transition-colors"><path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path></svg></button></div>
          {/* <div className="relative w-60  h-[500px]   bg-gradient-to-b from-blue-200 via-cyan-400 to-blue-500  rounded-3xl border-[1.5px] border-violet-800 overflow-y-auto" > */}


            <div className="h-[500px] w-60 mx-auto bg-gradient-to-b rounded-2xl ring ring-violet-600 from-purple-300  to-yellow-100 via-yellow-50 flex flex-col  items-center  px-4 py-3">
            <div className="text-center mt-0 m-4  text-[11px]  shadow-md mx-auto p-0.15 px-2 w-fit text-slate-700 font-sans border border-slate-400 rounded-md  " >@{username}</div>
      <div className="w-full max-w-2xl flex flex-col items-center ">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mb-2 shadow-lg"
        />

        <h1 className="text-xl md:text-2xl font-semibold text-center ">
          {name}
        </h1>
        <h2 className="text-sm md:text-md mt-1 font-semibold text-center text-gray-600">
        @{username}
        </h2>

        <div className="mt-6 w-full max-w-lg text-xl space-y-3">
          {links
            .filter(l => l.active)
            .map(link => (
                <div key={link._id} className="flex gap-1 md:gap-3 items-center">
                <div className="min-w-7"><img src={`${link.icon}.svg`} alt="icon" className='h-4' /><div className='text-[8px]'>{link.icon}</div></div>
              
              <a
                key={link._id}
                href={normalizeUrl(link.url)}
                target="_blank"
                className="block w-full border-blue-700 rounded-full bg-gradient-to-r bg-blue-500 text-slate-50 font-medium px-1.5 py-1 text-center text-lg transition duration-200 hover:border hover:scale-105 hover:shadow-md active:scale-95 focus:outline-none focus:ring-1 focus:ring-green-600 focus:ring-offset-1 shadow-sm cursor-pointer"
              >
                {link.title}
              </a></div>
            ))}
        </div>
      </div>
    </div>
          </div>
        {/* </div> */}

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
              <button className='top-6 right-6 absolute text-lg border rounded-full cursor-pointer px-2 transition duration-200 hover:bg-gray-100 hover:border-gray-400 active:scale-90' onClick={() => setShowModal(false)} > X </button>

              <h3 className={`${LinkSansE.className} text-xl mb-4`}>
                Choose a platform
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {PROVIDERS.map(p => (
                  <button
                    key={p.name}
                    onClick={() => addLink(p.name, p.icon, p.helper)}
                    className="border border-gray-400 rounded-xl p-3 flex items-center gap-3 hover:bg-gray-50 transition duration-200 cursor-pointer active:scale-95 hover:border-gray-500"
                  >
                    <span className="text-2xl"><img src={`${p.icon}.svg`} alt={`${p.name} `} /></span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <input
                  value={customApp}
                  onChange={e => setCustomApp(e.target.value)}
                  placeholder="Other app name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 outline-none transition duration-200 cursor-text focus:ring-2 focus:ring-purple-300 hover:border-gray-400"
                />
                <button
                  onClick={() =>
                    customApp &&
                    addLink(customApp, '🔗', `Enter your ${customApp} link.`)
                  }
                  className={`w-full bg-gradient-to-r font-medium from-purple-600 via-violet-700 to-purple-700 text-white py-2 rounded-full flex items-center justify-center gap-2 mb-6 transition duration-200 hover:shadow-lg active:scale-95 cursor-pointer ${LinkSansM.className}`}
                >
                  Add Other
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  )
}
