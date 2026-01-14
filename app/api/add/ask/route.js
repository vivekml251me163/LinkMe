import { connectDB } from '@/lib/mongodb'
import Ask from '@/models/Ask'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const data = await req.json()
    const { name, email, category, question } = data

    if (!question) {
      return NextResponse.json({ error: 'Question required' }, { status: 400 })
    }

    await connectDB()

    const doc = new Ask({ name, email, category, question })
    await doc.save()

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
