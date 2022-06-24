import * as animation from './animation'
import * as ease from './ease'
import * as elevation from './elevation'
import * as paletteDark from './palette-spectrum-dark'
import * as paletteLight from './palette-spectrum-light'
import * as respondTo from './respond-to'
import * as scale from './scale'
import * as typeface from './typeface'

export const theme = {
  animation,
  ease,
  elevation,
  paletteDark,
  paletteLight,
  respondTo,
  scale,
  typeface,
}

type CustomTheme = typeof theme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
