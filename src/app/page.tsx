'use client'

import { Button } from '@/components/ui/button'
import Hero from '@/components/hero'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Hero />
      <Button variant='secondary' onClick={() => signIn()}>
        Sign in
      </Button>
      <Button variant={'destructive'} onClick={() => signOut()}>
        Sign out
      </Button>
      <Button asChild variant={'link'}>
        <Link href='/dashboard'>Dashboard</Link>
      </Button>
    </>
  )
}
