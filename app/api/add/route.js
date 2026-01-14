
import { connectDB } from "@/lib/mongodb"

import { NextResponse } from "next/server"
import User from '@/models/page'
import { getServerSession } from "next-auth"



export async function POST(req) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({}, { status: 401 })

  const { links } = await req.json()

  await connectDB()

  await User.findOneAndUpdate(
    { email: session.user.email },
    {
      email: session.user.email,
      username: session.user.email.split("@")[0],
      name: session.user.name,
      avatar: session.user.image,
      links,
    },
    { upsert: true, new: true }
  )

  return NextResponse.json({ success: true })
}


export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ links: user.links });
}