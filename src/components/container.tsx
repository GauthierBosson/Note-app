import { ComponentPropsWithoutRef } from 'react'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {}

export default function Container({ children, ...props }: ContainerProps) {
  return (
    <div className='container' {...props}>
      {children}
    </div>
  )
}
