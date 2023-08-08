import Editor from '@/components/editor'
import { db } from '../../../lib/db'

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
    <div className='flex'>
      <div className='inline-flex grow p-4'>
        <Editor post={post} />
      </div>
    </div>
  )
}
