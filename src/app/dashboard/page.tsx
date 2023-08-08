import CreateNote from '@/components/create-note'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'

async function getNotesForCurrentUser(id: string) {
  const notes = await db.post.findMany({
    where: {
      userId: id,
    },
  })

  return notes
}

export default async function NotePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const notes = await getNotesForCurrentUser(user.id)

  return (
    <>
      {notes.map((note) => (
        <Link key={note.id} href={`/notes/${note.id}`}>
          <div>
            <h2>{note.title}</h2>
          </div>
        </Link>
      ))}
      <CreateNote userId={user.id} />
    </>
  )
}
