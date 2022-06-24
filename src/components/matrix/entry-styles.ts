import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DotPosition } from './entry'
import { EntryText } from './entry-text'

interface RootProps {
  $position?: DotPosition
}

export const DotIcon = styled(FontAwesomeIcon)`
  color: ${ ({ theme }) => theme.palette.css.gray900 };
`

export const Root = styled.div<RootProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;

  ${ EntryText } {
    order: 0;
  }

  ${ ({ $position }) => {
    switch ($position) {
      case DotPosition.TopLeft:
        return css`
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;

          & > ${ DotIcon } {
            top: 0;
            left: 0;
          }
        `
      case DotPosition.TopRight:
        return css`
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;

          ${ EntryText } {
            text-align: left;
          }

          & > ${ DotIcon } {
            top: 0;
            right: 0;
          }
        `
      case DotPosition.BottomLeft:
        return css`
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;

          ${ EntryText } {
            order: 1;
            text-align: left;
          }

          & > ${ DotIcon } {
            bottom: 0;
            left: 0;
          }
        `
      case DotPosition.BottomRight:
        return css`
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;

          & > ${ DotIcon } {
            right: 0;
            bottom: 0;
          }

          ${ EntryText } {
            order: 1;
            text-align: right;
          }
        `
      case DotPosition.Left:
        return css`
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          & > ${ DotIcon } {
            top: 50%;
            left: -1rem;

            transform: translateY(-50%);
          }
        `
      case DotPosition.Right:
        return css`
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;

          & > ${ DotIcon } {
            top: 50%;
            right: -1rem;

            transform: translateY(-50%);
          }

          & > ${ EntryText } {
            order: 1;
          }
        `
      case DotPosition.Top:
        return css`
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          & > ${ DotIcon } {
            top: -1rem;
            left: 50%;

            transform: translateX(-50%);
          }
        `
      case DotPosition.Bottom:
        return css`
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;

          & > ${ DotIcon } {
            bottom: -1rem;
            left: 50%;

            transform: translateX(-50%);
          }

          & > ${ EntryText } {
            order: 1;
          }
        `
    }
  } };
`
