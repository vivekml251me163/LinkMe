import { connectDB } from "@/lib/mongodb";
import User from '@/models/User'
import Link from "next/link";

  //normalise url
  const normalizeUrl = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url
  }
  return url
}


export default async function PublicProfile({ params }) {
  let params1 = await params
  let rawUsername = params1.username
  
  // Handle both /@username and /username formats
  rawUsername = decodeURIComponent(rawUsername)
  const username = rawUsername.replace(/^@/, '')

  await connectDB()

  const user = await User.findOne({username: username})



  if (!user) {
    return <h1>User not found</h1>
  }

  return (
   <main className="min-h-screen bg-gradient-to-b from-purple-300  to-yellow-100 via-yellow-50 flex flex-col  items-center  px-4 py-5" role="main">
      <article className="w-full max-w-2xl flex flex-col items-center">
        <img
          src={user.avatar}
          alt={`${user.name}'s profile picture`}
          className="w-24 h-24 rounded-full mb-4 shadow-lg"
        />

        <h1 className="text-3xl md:text-4xl font-semibold text-center ">
          {user.name}
        </h1>
        <h2 className="text-sm md:text-lg mt-2 font-semibold text-center text-gray-600">
        @{user.username}
        </h2>

        <nav className="mt-12 w-full max-w-lg text-xl space-y-6" aria-label="User Links">
          {user.links
            .filter(l => l.active)
            .map(link => (
                <div key={link._id} className="flex gap-2 md:gap-7 items-center">
                <div className="min-w-13"><img src={`${link.icon}.svg`} alt={`${link.icon} icon`} className='h-8' /><div className='text-[11px]'>{link.icon}</div></div>
              
              <a
                key={link._id}
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-blue-700 rounded-full bg-gradient-to-r bg-blue-500 text-slate-50 font-medium  px-4 py-2 text-center text-2xl hover:border-2 transition-all duration-200 focus:outline-none focus:ring-2 hover:scale-110 focus:ring-green-600 focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                {link.title}
              </a></div>
            ))}
        </nav>
      </article>
    </main>
  )
}
