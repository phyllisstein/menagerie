import { faDotCircle } from '@fortawesome/pro-duotone-svg-icons/faDotCircle'
import { HTMLAttributes, ReactNode } from 'react'

import { DotIcon, Root } from './entry-styles'

export enum DotPosition {
    Bottom,
    BottomLeft,
    BottomRight,
    Left,
    Right,
    Top,
    TopLeft,
    TopRight,
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    dot?: DotPosition
}

export function Entry ({ children, dot, ...rest }: Props) {
    return (
        <Root { ...rest } $position={ dot }>
            { dot != null && (
                <DotIcon icon={ faDotCircle } style={{ position: 'absolute' }} />
            ) }
            { children }
        </Root>
    )
}
