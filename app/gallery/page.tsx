import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { EditorHeader } from "@/components/editor/EditorHeader"
import { GalleryContent } from "./GalleryContent"

export default async function GalleryPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userName = user.firstName || user.username || "User"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <EditorHeader userName={userName} />
      <GalleryContent />
    </div>
  )
}
