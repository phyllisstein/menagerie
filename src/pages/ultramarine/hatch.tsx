import { animated, config, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import * as BodyScrollLock from 'body-scroll-lock'
import { interpolate } from 'd3-interpolate'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const interpolateRotation = interpolate(-45, 45)

const AnimatedFeColorMatrix = animated('feColorMatrix')

const Container = styled.div`
  position: absolute;

  transform: translate3d(-50%, -50%, 0);
  transform-style: preserve-3d;
  perspective: 1000px;

  touch-action: none;
`

const MiddleVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 100vw;
  height: 100vh;

  transform: translate3d(-50%, -50%, 0);
  filter: url(#animated-wash-2);
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

const MidPeephole = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  transform-style: preserve-3d;
  perspective: 1000px;

  -webkit-mask-image: url('/assets/hatch/cdm.png');
  mask-image: url('/assets/hatch/cdm.png');
  -webkit-mask-position: 50% 50%;
  mask-position: 50% 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
`

const FrontPeephole = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  transform-style: preserve-3d;
  perspective: 1000px;

  -webkit-mask-image: url('/assets/hatch/nsm.png');
  mask-image: url('/assets/hatch/nsm.png');
  -webkit-mask-position: 50% 50%;
  mask-position: 50% 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
`

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
    0.5   0     0     0   0
    0     0   0       0 0
    0     0     0   0   0
    1     0     0     1   0
  `

function HatchPage () {
  const containerRef = useRef(null)
  const [frontPurple, setFrontPurple] = useState(false)

  const [values, api] = useSpring(() => ({
    config: config.molasses,
    from: {
      washOne: identityMatrix,
      washTwo: identityMatrix,
    },
  }))

  useEffect(() => {
    BodyScrollLock.disableBodyScroll(document.querySelector('body'))

    return () => {
      BodyScrollLock.enableBodyScroll(document.querySelector('body'))
    }
  }, [])

  const handler = ({ active, first, last, xy: [x, y] }) => {
    const offsetX = (x - window.innerWidth) / window.innerWidth * 100 + 50
    const offsetY = (window.innerHeight - y) / window.innerHeight * 100 - 50

    if (first) {
      api.start({
        washOne: frontPurple ? purpleMatrix : redMatrix,
        washTwo: frontPurple ? redMatrix : purpleMatrix,
      })
    }

    const tl = gsap.timeline()

    if (active) {
      tl
        .to('#front-peephole', {
          rotateX: `${ offsetY }deg`,
          rotateY: `${ offsetX }deg`,
        }, 0)
        .to('#mid-peephole', {
          // perspective: (x + window.innerWidth) * 2,
          z: `${ offsetY / 4 }rem`,
        }, 0)
        .to('#mid-peephole', {
          rotateY: `${ -offsetX }deg`,
        })
    }

    if (last) {
      tl
        .to('#front-peephole', {
          rotateX: 0,
          rotateY: 0,
        }, 0)
        .to('#mid-peephole', {
          // perspective: 1000,
          z: 0,
          // rotateY: 0,
        }, 0)
        .to('#mid-peephole', {
          rotateY: 0,
        })

      api.start({
        washOne: identityMatrix,
        washTwo: identityMatrix,
      })

      setFrontPurple(fp => !fp)
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
    <Container>
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
            <AnimatedFeColorMatrix type='matrix' values={ values.washOne } />
          </filter>
          <filter id='animated-wash-2'>
            <AnimatedFeColorMatrix type='matrix' values={ values.washTwo } />
          </filter>
        </defs>
      </animated.svg>
      <MidPeephole id='mid-peephole'>
        <MiddleVideo autoPlay loop muted playsInline>
          <source src='/assets/hatch/coverr-jeronimos-monastery-in-lisbon-portugal-6360-original.mp4' type='video/mp4' />
        </MiddleVideo>
      </MidPeephole>
      <FrontPeephole id='front-peephole'>
        <FrontVideo autoPlay loop muted playsInline>
          <source src='/assets/hatch/coverr-a-vinyl-disc-rotating-on-a-record-player-6767-original.mp4' type='video/mp4' />
        </FrontVideo>
      </FrontPeephole>
    </Container>
  )
}

export default HatchPage
