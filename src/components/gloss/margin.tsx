import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export function Margin ({ children }: Props) {
  return <>{ children }</>
}
