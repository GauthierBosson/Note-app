'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Post } from '@prisma/client'

export default function CreateNote({ userId }: { userId: string }) {
  const router = useRouter()

  async function createNote() {
    try {
      fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New note',
          userId
        }),
      }).then(async (res) => {
        const data: Post = await res.json()
        // revalidate data for dashboard
        router.refresh()
        router.push(`/notes/${data.id}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return <Button onClick={() => createNote()}>New note</Button>
}
