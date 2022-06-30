import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface HeaderProps {
  accent?: boolean
  size: number
}

export const H = styled('h1', {
  shouldForwardProp: prop => !['accent', 'size'].includes(prop),
}) <HeaderProps>`
  ${ ({ accent = false, size, theme }) => {
    const themingFunction = !!accent ? theme.typeface.accent.bind(null) : theme.typeface.primary.bind(null)

    const typeStyles = themingFunction({
      fontSize: 16 - size,
      leadingBottom: 1,
      leadingTop: 1,
      lineHeight: 16 - size,
    })

    const fontWeight = accent ? 600 : 400

    return css`
      ${ typeStyles }

      font-weight: ${ fontWeight };
    `
  } }
`
