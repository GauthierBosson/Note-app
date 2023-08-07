'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import EditorJS from '@editorjs/editorjs'
import TextareaAutoSize from 'react-textarea-autosize'
import { Post } from '@prisma/client'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

export default function Editor({ post }: { post: Post }) {
  const { register, handleSubmit } = useForm<Omit<Post, 'id'>>()
  const [isMounted, setIsMounted] = useState<boolean>()
  const router = useRouter()
  const ref = useRef<EditorJS>()
  const { toast } = useToast()

  const initEditor = useCallback(async () => {
    const Header = (await import('@editorjs/header')).default
    const EditorJS = (await import('@editorjs/editorjs')).default
    const DragDrop = (await import('editorjs-drag-drop')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        inlineToolbar: true,
        onReady: () => {
          new DragDrop(editor)
          ref.current = editor
        },
        data: post.content as any,
        tools: {
          Header: Header,
        },
      })
    }
  }, [post])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initEditor])

  async function updateNote(data: Omit<Post, 'id'>) {
    const blocks = await ref.current?.save()
    const res = await fetch('/api/notes', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: post.id,
        title: data.title,
        content: blocks,
      }),
    })

    if (!res.ok) {
      return toast({
        title: 'Error',
        description: 'Something went wrong',
      })
    }

    return toast({
      title: 'Success',
      description: 'Note updated',
    })
  }

  async function deleteNote() {
    const res = await fetch('/api/notes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: post.id,
      }),
    })

    if (!res.ok) {
      return toast({
        title: 'Error',
        description: 'Something went wrong',
      })
    }

    toast({
      title: 'Success',
      description: 'Note deleted',
    })

    router.push('/dashboard')
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(updateNote)}>
      <TextareaAutoSize
        placeholder='Choose a title'
        defaultValue={post.title}
        {...register('title', { required: true })}
      />
      <div id='editor' className='w-full h-[500px]' />
      <Button type='submit'>Save</Button>
      <Button onClick={() => deleteNote()} variant='destructive'>
        Delete note
      </Button>
    </form>
  )
}
