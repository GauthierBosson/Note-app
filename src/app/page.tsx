import Hero from '@/components/hero'
import { signIn, signOut } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
