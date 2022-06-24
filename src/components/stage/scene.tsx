import R from 'ramda'
import {
  Children,
  CSSProperties,
  FunctionComponent,
  memo,
  ReactNode,
  useContext,
  useEffect,
} from 'react'

import { Root } from './scene-styles'
import { StageTransform } from './stage'
import { Transform } from './transform'

const mergeTransforms = R.mergeWithKey(
  (key: string, lhs: number, rhs: number): number => {
    if (
      !key.includes('scale') &&
      !['x', 'y', 'z'].includes(key) &&
      !key.includes('rotate')
    ) {
      return rhs
    }

    return lhs + rhs
  },
)

const stringifyTransform = ([kind, amount]: [
  string,
  number | string,
]): string => {
  if (['x', 'y', 'z'].includes(kind)) {
    return `translate${ kind.toUpperCase() }(${ amount }px)`
  }

  if (kind.includes('rotate')) {
    return `${ kind }(${ amount }deg)`
  }

  return `${ kind }(${ amount })`
}

const createTransform = R.pipe(
  R.toPairs,
  R.filter(
    ([key]) =>
      key.includes('rotate') ||
      key.includes('scale') ||
      ['x', 'y', 'z'].includes(key),
  ),
  R.map(stringifyTransform),
  R.filter(Boolean),
  R.join(' '),
)
const createMirrorTransform = R.pipe(
  R.toPairs,
  R.filter(
    ([kind]) => kind.includes('rotate') || ['x', 'y', 'z'].includes(kind),
  ),
  R.map(([kind, amount]) => [kind, -amount]),
  R.fromPairs,
)

export interface Props {
  children?: ReactNode
  layout?: boolean
  style?: CSSProperties
}

export const Scene = memo(function Scene (props: Props) {
  const {
    children: allChildren,
    layout,
    style: styleProp = {},
    ...rest
  } = props

  const registerTransform = useContext(StageTransform)

  const { mirrorTransform, renderedChildren, scale, transform } =
    Children.toArray(allChildren).reduce(
      (acc, child) => {
        if (child.type === Transform && child.props.scale) {
          acc.scale = child.props.scale
        } else if (child.type === Transform) {
          acc.transform.push(createTransform(child.props))
          acc.mirrorTransform = mergeTransforms(
            acc.mirrorTransform,
            createMirrorTransform(child.props),
          )
        } else {
          acc.renderedChildren.push(child)
        }

        return acc
      },
      {
        mirrorTransform: {},
        renderedChildren: [],
        scale: 1,
        transform: ['translate(-50%, -50%)'],
      },
    )

  useEffect(() => {
    if (!registerTransform || layout) return

    registerTransform({
      scale: 1 / scale,
      translate: mirrorTransform,
    })
  }, [registerTransform, layout])

  return (
    <Root { ...rest } style={{ ...styleProp, transform: transform.join(' ') }}>
      { renderedChildren }
    </Root>
  )
})
