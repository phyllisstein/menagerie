import styled, { css } from 'styled-components'

interface StyledProps {
  $accent?: boolean
  $size?: 1 | 2 | 3 | 4 | 5 | 6
}

interface HeaderProps {
  accent?: boolean
  size?: 1 | 2 | 3 | 4 | 5 | 6
}

const Aich = styled.h1<StyledProps>`
  ${ ({ $accent = false, $size, theme }) => {
    const themingFunction = $accent ? theme.typeface.accent.bind(null) : theme.typeface.primary.bind(null)

    const typeStyles = themingFunction({
      fontSize: 16 - $size,
      leadingBottom: 1,
      leadingTop: 1,
      lineHeight: 16 - $size,
    })

    const fontWeight = $accent ? 600 : 400

    return css`
      ${ typeStyles }

      font-weight: ${ fontWeight };
    `
  } }
`

export function H ({ accent = false, children, size = 1 }: HeaderProps) {
  return (
    <Aich $accent={ accent } $size={ size }>
      { children }
    </Aich>
  )
}
