import Container from '@/components/container'
import { Button } from './ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className='h-[100vh]'>
      <Container>
        Materialize your thoughts
        <Button asChild>
          <Link href={'#'}>Try it</Link>
        </Button>
      </Container>
    </section>
  )
}
