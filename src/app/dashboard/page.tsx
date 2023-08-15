import CreateNote from '@/components/create-note'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import Container from '@/components/container'
import { Card, CardHeader } from '@/components/ui/card'

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
    <Container>
      <div className='grid grid-cols-4 gap-6 py-8'>
        {notes.map((note) => (
          <Card key={note.id}>
            <Link href={`/notes/${note.id}`}>
              <CardHeader>
                <h2 className='text-2xl'>{note.title}</h2>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
      <CreateNote userId={user.id} />
    </Container>
  )
}
