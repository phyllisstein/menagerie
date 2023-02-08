import { partition } from 'ramda'
import { Children, isValidElement, ReactNode } from 'react'

import { Note } from './note'
import { VariorumContainer } from './variorum-styles'

interface VariorumProps {
  children: ReactNode | ReactNode[]
}

export function Variorum ({ children }: VariorumProps): ReactNode {
  const [bodyChildren, noteChildren] =
    partition((child: ReactNode) => isValidElement(child) && child?.type !== Note, Children.toArray(children))

  return (
    <>
      <VariorumContainer>{ bodyChildren }</VariorumContainer>
      { noteChildren }
    </>
  )
}
