import { forwardRef, Ref, useCallback, useRef } from 'react'
import styled from 'styled-components'

import { useHyphenator } from 'hooks/ui'

const BaseP = styled.p<{ $indent?: boolean }>`
  ${ ({ theme }) =>
    theme.typeface.primary({
      fontSize: 7,
      leadingBottom: 0,
      leadingTop: 0,
      lineHeight: 9,
    }) }

  font-weight: 500;
  text-align: justify;
  text-indent: ${ ({ $indent, theme }) => $indent ? theme.scale.css(5) : '0' };
  hyphens: manual;

  & + & {
    text-indent: ${ ({ theme }) => theme.scale.css(5) };
  }
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
