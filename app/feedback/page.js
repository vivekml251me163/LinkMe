"use client"

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

export default function FeedbackPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/add/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, rating }),
      })

      const body = await res.json()
      if (res.ok) {
        toast.success('Thanks for the feedback!')
        setName('')
        setEmail('')
        setMessage('')
        setRating(5)
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6 pt-32" role="main">
      <ToastContainer />
      <article className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Feedback</h1>
        <p className="text-xs md:text-sm text-slate-500 mb-6">We'd love to hear from you — feature requests, bugs, or general thoughts.</p>

        <form onSubmit={submit} className="space-y-4">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Feedback form</legend>
            <input
              className="border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-slate-300"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
              type="text"
            />
            <input
              className="border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-slate-300"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Your email"
              type="email"
            />
          </fieldset>

          <div>
            <label htmlFor="feedback-message" className="sr-only">Your message</label>
            <textarea
              id="feedback-message"
              className="w-full border border-slate-200 p-3 rounded-md min-h-[120px] transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-slate-300"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <label htmlFor="rating" className="text-xs md:text-sm text-slate-600">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border border-slate-200 p-2 rounded-md text-xs md:text-sm text-slate-700 cursor-pointer transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-slate-300"
                aria-label="Feedback rating"
              >
                <option value={5}>5 — Excellent</option>
                <option value={4}>4 — Good</option>
                <option value={3}>3 — Okay</option>
                <option value={2}>2 — Poor</option>
                <option value={1}>1 — Bad</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md font-medium transition duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        </form>
      </article>
    </main>
    </>
  )
    
}
