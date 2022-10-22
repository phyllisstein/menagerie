import * as animation from './animation'
import * as ease from './ease'
import * as elevation from './elevation'
import * as paletteDark from './palette-spectrum-dark'
import * as paletteLight from './palette-spectrum-light'
import * as plumber from './plumber'
import * as respondTo from './respond-to'
import * as scale from './scale'
import * as typeface from './typeface'

export const theme = {
    animation,
    ease,
    elevation,
    palette: paletteLight,
    paletteDark,
    paletteLight,
    plumber,
    respondTo,
    scale,
    typeface,
}

type CustomTheme = typeof theme

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends CustomTheme {}
}
