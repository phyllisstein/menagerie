import { createGlobalStyle } from 'styled-components'

export const Body = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: inherit;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        text-rendering: optimizeLegibility;
    }

    html {
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        font-size: 16px;
        hyphens: manual;

        font-kerning: normal;
        font-variant-ligatures: common-ligatures;
        font-variant-numeric: oldstyle-nums proportional-nums;
    }

    body {
        ${ ({ theme }) => theme.typeface.primary() }
    }
`
