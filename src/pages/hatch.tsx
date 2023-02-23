import { animated, config, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import * as BodyScrollLock from 'body-scroll-lock'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { gsap } from 'gsap'

const AnimatedFeColorMatrix = animated('feColorMatrix')

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 50vw;
  height: 50vh;

  transform: translate3d(-50%, -50%, 0);
  transform-style: preserve-3d;
  perspective: 1000px;

  touch-action: none;
`

const MiddleVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate3d(-50%, -50%, -5rem);
  filter: url(#red-wash);
`

const FrontVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 100vw;
  height: 100vh;

  transform: translate3d(-50%, -50%, 0);
  filter: url(#animated-wash);
`

const Peephole = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  transform-style: preserve-3d;
  perspective: 1000px;

  mask-image: url('/assets/hatch/mkpm.png');
  mask-position: 50% 50%;
  mask-repeat: no-repeat;
  mask-size: 50% 50%;
`

function HatchPage () {
  const [frontPurple, setFrontPurple] = useState(false)

  const identityMatrix = `
    1   0     0     0   0
    0     1   0       0 0
    0     0     1   0   0
    0     0     0     1   0
  `

  const purpleMatrix = `
    1   1     0     0   0
    0     0.5   0       0 0
    1     0     1   0   0
    0     0     0     1   0
  `

  const redMatrix = `
    1   1     0.5     0   0
    0     0   0       0 0
    0     0     0   0   0
    0     0     0     1   0
  `

  const [{ values }, api] = useSpring(() => ({
    config: config.molasses,
    from: {
      values: identityMatrix,
    },
  }))

  useEffect(() => {
    BodyScrollLock.disableBodyScroll(document.querySelector('body'))

    return () => {
      BodyScrollLock.enableBodyScroll(document.querySelector('body'))
    }
  }, [])

  const handler = ({ active, first, last, xy: [x, y] }) => {
    const offsetX = (window.innerWidth - x) / window.innerWidth * 100
    const offsetY = (window.innerHeight - y) / window.innerHeight * 100

    if (first) {
      api.start({
        values: frontPurple ? purpleMatrix : redMatrix,
      })
    }

    if (active) {
      gsap.to('#peephole', {
        maskPosition: `${ offsetX }% ${ offsetY }%`,
        maskSize: `${ 100 - offsetX }% ${ 100 - offsetY }%`,
      })
    }

    if (last) {
      gsap.to('#peephole', {
        maskPosition: '50% 50%',
        maskSize: '50% 50%',
      })

      api.start({
        values: identityMatrix,
      })

      setFrontPurple(!frontPurple)
    }
  }

  useGesture(
    {
      onDrag: handler,
      onMove: handler,
    },
    { target: typeof window !== 'undefined' ? window : null },
  )

  return (
    <div>
      <svg viewBox='0 0 10 10' width='0' height='0'>
        <defs>
          <filter id='purple-wash'>
            <feColorMatrix type='matrix' values={ purpleMatrix } />
          </filter>
          <filter id='red-wash'>
            <feColorMatrix type='matrix' values={ redMatrix } />
          </filter>
        </defs>
      </svg>
      <animated.svg viewBox='0 0 10 10' width='0' height='0'>
        <defs>
          <filter id='animated-wash'>
            <AnimatedFeColorMatrix type='matrix' values={ values } />
          </filter>
        </defs>
      </animated.svg>
      <Peephole id='peephole'>
        <FrontVideo autoPlay loop muted playsInline>
          <source src='/assets/hatch/coverr-a-vinyl-disc-rotating-on-a-record-player-6767-original.mp4' type='video/mp4' />
        </FrontVideo>
      </Peephole>
    </div>
  )
}

export default HatchPage
