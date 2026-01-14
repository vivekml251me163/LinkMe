import { getServerSession } from "next-auth"
import AdminClient from "./AdminClient"
import { handler } from "@/app/api/auth/[...nextauth]/route"


export default async function AdminPage() {
  const session = await getServerSession(handler)

  return <AdminClient session={session} />
}
