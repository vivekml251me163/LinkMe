import { connectDB } from '@/lib/mongodb'
import Feedback from '@/models/Feedback'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const data = await req.json()
    const { name, email, message, rating } = data

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    await connectDB()

    const doc = new Feedback({ name, email, message, rating })
    await doc.save()

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
