"use client"

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

export default function SuggestionsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/add/suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, title, description }),
      })

      const body = await res.json()
      if (res.ok) {
        toast.success('Thanks for the suggestion! We appreciate your input.')
        setName('')
        setEmail('')
        setTitle('')
        setDescription('')
      } else {
        toast.error(body.error || 'Failed to submit')
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6 pt-32" role="main">
      <ToastContainer />
      <article className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Suggestions</h1>
        <p className="text-xs md:text-sm text-slate-500 mb-6">Have an idea to improve our platform? Share it with us!</p>

        <form onSubmit={submit} className="space-y-4">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Suggestion form</legend>
            <input
              className="border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-green-300 hover:border-slate-300"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
              type="text"
            />
            <input
              className="border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-green-300 hover:border-slate-300"
              placeholder="Email (optional)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Your email"
            />
          </fieldset>

          <div>
            <label htmlFor="title" className="sr-only">Suggestion title</label>
            <input
              id="title"
              className="w-full border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-green-300 hover:border-slate-300"
              placeholder="Suggestion title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="sr-only">Description</label>
            <textarea
              id="description"
              className="w-full border border-slate-200 p-3 rounded-md min-h-[150px] transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-green-300 hover:border-slate-300"
              placeholder="Describe your suggestion in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-md transition duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 disabled:opacity-60 font-medium cursor-pointer"
          >
            {loading ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </form>
      </article>
    </main>
    </>
  )
}
