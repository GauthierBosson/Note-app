import Editor from '@/components/editor'
import { db } from '../../../lib/db'
import Container from '@/components/container'

async function getData(id: string) {
  try {
    const post = await db.post.findFirst({
      where: {
        id: parseInt(id),
      },
    })

    return post
  } catch {
    return undefined
  }
}

export default async function NotesPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getData(params.id)

  if (!post) {
    return <h1>Post not found</h1>
  }

  return (
    <Container className='flex justify-center grow'>
        <Editor post={post} />
    </Container>
  )
}
