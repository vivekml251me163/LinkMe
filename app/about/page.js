import React from 'react'
import Navbar from '../components/Navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6 pt-32" role="main">
      <article className="w-full max-w-3xl bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">About Me</h1>
        <p className="text-sm md:text-base text-slate-700 mb-4 leading-relaxed">Hi — I'm Vivek M L, a product-focused developer building small, useful web apps and utilities. I enjoy crafting polished UI, simple APIs, and delightful UX.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="transition duration-200 hover:translate-y-[-2px]">
            <h2 className="text-base md:text-lg font-semibold mb-2 text-slate-800">Skills</h2>
            <ul className="list-disc ml-5 text-sm md:text-base text-slate-600 space-y-1">
              <li className="transition duration-150 hover:text-slate-800">Next.js & React</li>
              <li className="transition duration-150 hover:text-slate-800">Node.js & Express</li>
              <li className="transition duration-150 hover:text-slate-800">MongoDB & Mongoose</li>
              <li className="transition duration-150 hover:text-slate-800">Tailwind CSS</li>
            </ul>
          </section>

          <section className="transition duration-200 hover:translate-y-[-2px]">
            <h2 className="text-base md:text-lg font-semibold mb-2 text-slate-800">Contact</h2>
            <address className="not-italic text-sm md:text-base text-slate-600 hover:text-slate-800 transition duration-150">
              
              <div className="flex gap-4 mt-3">
               <a href="" className='text-blue-600 cursor-pointer'> My LinkMe Page ♥ </a>
                </div>
            </address>
          </section>
        </div>

        <section className="mt-6 transition duration-200 hover:translate-y-[-2px]">
          <h2 className="text-base md:text-lg font-semibold mb-2 text-slate-800"></h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">This is a clone of LinkTree app that help creators and teams publish content quickly. I developed e simple, maintainable code and fast iteration. This Linkme starter project showcases a minimal profile and link management flow.</p>
        </section>
      </article>
    </main>
    </>
  )
}
