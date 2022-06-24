import { css, SerializedStyles } from '@emotion/react'
import { rem } from 'polished'

const breakpoints = {
  lg: rem('1056px'),
  max: rem('1584px'),
  md: rem('672px'),
  sm: rem('320px'),
  xlg: rem('1312px'),
}

type Breakpoint = keyof typeof breakpoints

export const between = (
  start: Breakpoint,
  end: Breakpoint,
  style: SerializedStyles,
) =>
  // prettier-ignore
  css`
    @media (min-width: ${ breakpoints[start] }) and (max-width: ${ breakpoints[end] }) {
      ${ style }
    }
`

export const above = (breakpoint: Breakpoint, style: SerializedStyles) => css`
  @media (min-width: ${ breakpoints[breakpoint] }) {
    ${ style }
  }
`

export const below = (breakpoint: Breakpoint, style: SerializedStyles) => css`
  @media (max-width: ${ breakpoints[breakpoint] }) {
    ${ style }
  }
`
