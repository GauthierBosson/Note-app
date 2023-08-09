import Container from '@/components/container'
import { Button } from './ui/button'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { getCurrentUser } from '@/lib/auth'

export default async function Hero() {
  const user = await getCurrentUser()

  return (
    <section>
      <Container>
        <nav className='flex justify-between items-center py-4'>
          <div>Note app</div>
          <div>
            {user ? (
              <Link href={'/dashboard'}>
                <Avatar>
                  <AvatarImage src='' />
                  <AvatarFallback>GB</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button asChild>
                <Link href={'/login'}>Login</Link>
              </Button>
            )}
          </div>
        </nav>
        <div className='py-40'>
          <h1 className='text-7xl font-bold'>
            <span className='bg-gradient-to-r from-violet-400 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient'>
              Materialize
            </span>
            <br />
            your thoughts
          </h1>
          <Button asChild className='mt-8'>
            <Link href={'/dashboard'}>Try it</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
