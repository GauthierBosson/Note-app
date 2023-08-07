import { db } from '../../../../lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    })
    return new Response(JSON.stringify(post))
  } catch {
    return new Response('Something went wrong', { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const post = await db.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
    return new Response(JSON.stringify(post))
  } catch {
    return new Response('Something went wrong', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()

    const post = await db.post.delete({
      where: {
        id: body.id,
      },
    })
    return new Response(JSON.stringify(post))
  } catch {
    return new Response('Something went wrong', { status: 500 })
  }
}
