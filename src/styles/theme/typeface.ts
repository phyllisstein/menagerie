import { css } from '@emotion/react'

import {
  accent as plumberAccent,
  primary as plumberPrimary,
  PlumberProps,
} from './plumber'

export const accentFamily = css`
  font-family: 'Adobe Clean Serif', 'Georgia', 'Garamond', 'Times New Roman',
    'Times', serif !important;
`

export const accent = (plumberOpts: Partial<PlumberProps> = {}) => css`
  ${ accentFamily }
  ${ plumberAccent(plumberOpts) }
`

export const primaryFamily = css`
  font-family: 'Adobe Clean', -apple-system, BlinkMacSystemFont,
    'Helvetica Neue', 'Helvetica', sans-serif !important;
`

export const primary = (plumberOpts: Partial<PlumberProps> = {}) => css`
  ${ primaryFamily }
  ${ plumberPrimary(plumberOpts) }
`
