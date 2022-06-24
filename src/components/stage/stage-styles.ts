import styled from '@emotion/styled'
import { animated } from 'react-spring'

export const Root = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform-style: preserve-3d;

  will-change: perspective, transform;
`

export const StageRoot = styled(animated.div)`
  transform-style: preserve-3d;
  will-change: transform;
`
