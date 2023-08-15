'use client'

import { User } from 'next-auth'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Separator } from './ui/separator'

export default function UserStatus({
  user,
}: {
  user:
    | (User & {
        id: string
      })
    | undefined
}) {
  return (
    <div>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={user.image!} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className='flex flex-col items-start px-0'>
            <p className='px-2 pb-2'>{user.email}</p>
            <Separator />
            <Button asChild variant={'link'}>
              <Link href={'/dashboard'}>Dashboard</Link>
            </Button>
            <Button variant={'link'} onClick={() => signOut()}>
              Sign out
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button asChild>
          <Link href={'/auth/sign-in'}>Login</Link>
        </Button>
      )}
    </div>
  )
}
