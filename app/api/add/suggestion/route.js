import { connectDB } from '@/lib/mongodb'
import Suggestion from '@/models/Suggestion'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const data = await req.json()
    const { name, email, title, description } = data

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description required' }, { status: 400 })
    }

    await connectDB()

    const doc = new Suggestion({ name, email, title, description })
    await doc.save()

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
