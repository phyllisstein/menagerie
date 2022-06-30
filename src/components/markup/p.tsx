import styled from '@emotion/styled'
import { forwardRef, Ref, useCallback, useRef } from 'react'

import { useHyphenator } from 'hooks/ui'

const BaseP = styled.p<{ $indent?: boolean }>`
  ${ ({ theme }) =>
    theme.typeface.primary({
      fontSize: 9,
      leadingBottom: 2,
      leadingTop: 2,
      lineHeight: 11,
    }) }

  hyphens: manual;
`

type Graf = JSX.IntrinsicElements['p']

interface GrafProps extends Graf {
  indent?: boolean
}

export const P = forwardRef(function P (
  { children, indent, ...props }: GrafProps,
  ref: Ref<HTMLParagraphElement>,
) {
  const grafRef = useRef<HTMLParagraphElement>()

  const setGrafRef = useCallback(
    r => {
      if (!r) return

      if (ref) {
        (ref as any).current = r
      }

      grafRef.current = r
    },
    [ref],
  )

  useHyphenator(grafRef)

  return (
    <BaseP { ...props } ref={ setGrafRef } $indent={ indent }>
      { children }
    </BaseP>
  )
})
