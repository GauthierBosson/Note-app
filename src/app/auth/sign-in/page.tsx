import { getProviders } from 'next-auth/react'
import Container from '@/components/container'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function SignInPage() {
  const providers = await getProviders()

  return (
    <Container className='h-[100vh] grid place-content-center'>
      <div>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <h3>{provider.name}</h3>
              <Button asChild>
                <Link href={provider.signinUrl}>
                  Connect through {provider.name}
                </Link>
              </Button>
            </div>
          ))}
      </div>
    </Container>
  )
}
