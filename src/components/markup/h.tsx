import styled, { css } from 'styled-components'

interface HeaderProps {
    $accent?: boolean
    $size?: number
}

export const H = styled.h1<HeaderProps>`
    ${ ({ $accent = false, $size = 1, theme }) => {
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
