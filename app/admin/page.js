import { getServerSession } from "next-auth"
import AdminClient from "./AdminClient"


export default async function AdminPage() {
  const session = await getServerSession()

  return <AdminClient session={session} />
}
