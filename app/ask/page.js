"use client"

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

export default function AskPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('general')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/add/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, category, question }),
      })

      const body = await res.json()
      if (res.ok) {
        toast.success('Question submitted! We\'ll get back to you soon.')
        setName('')
        setEmail('')
        setCategory('general')
        setQuestion('')
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 pt-32" role="main">
      <ToastContainer />
      <article className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Ask Your Doubts</h1>
        <p className="text-xs md:text-sm text-slate-500 mb-6">Have a question? Ask away and we'll help you out.</p>

        <form onSubmit={submit} className="space-y-4">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Question form</legend>
            <input
              className="border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-slate-300"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
              type="text"
            />
            <input
              className="border border-slate-200 p-3 rounded-md transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-slate-300"
              placeholder="Email (optional)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Your email"
            />
          </fieldset>

          <div>
            <label htmlFor="category" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 p-3 rounded-md transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-slate-300"
              aria-label="Question category"
            >
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="question" className="sr-only">Your question</label>
            <textarea
              id="question"
              className="w-full border border-slate-200 p-3 rounded-md min-h-[150px] transition duration-200 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-slate-300"
              placeholder="Ask your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-fit bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-60 font-medium cursor-pointer"
          >
            {loading ? 'Submitting...' : 'Submit Question'}
          </button>
        </form>
      </article>
    </main>
    </>
  )
  
}
