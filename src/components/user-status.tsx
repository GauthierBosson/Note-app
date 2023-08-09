'use client'

import { User } from 'next-auth'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

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
              <AvatarImage src='' />
              <AvatarFallback>GB</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
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
