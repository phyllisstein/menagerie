import { useGesture } from '@use-gesture/react'
import * as BodyScrollLock from 'body-scroll-lock'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { gsap } from 'gsap'

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

const RearVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate3d(-50%, -50%, 20rem);
`

const MiddleVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate3d(-50%, -50%, -5rem);
  filter: url(#red-wash);

  mask-image: url('/assets/pixel.svg');
  mask-size: 100% 100%;
`

const FrontVideo = styled.video`;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate3d(-50%, -50%, 0);
  filter: url(#purple-wash);

  mask-image: url('/assets/pixel.svg');
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
`

function HatchPage () {
  const purpleMatrix = `
    1   1     0     0   0
    0     0.5   0       0 0
    1     0     1   0   0
    0     0     0     1   0
  `

  const redMatrix = `
    2   0.25     0.5     0   0
    0     0   0       0 0
    0     0     0   0   0
    0     0     0     1   0
  `

  useEffect(() => {
    BodyScrollLock.disableBodyScroll(document.querySelector('body'))

    return () => {
      BodyScrollLock.enableBodyScroll(document.querySelector('body'))
    }
  }, [])

  const handler = ({ active, last, xy: [x, y] }) => {
    const offsetX = (x / window.innerWidth - 0.5) * -100
    const offsetY = (y / window.innerHeight - 0.5) * -100

    if (active) {
      gsap.to('#front', {
        rotateY: `${ offsetX * 0.5 }deg`,
        z: `${ offsetY * 5 }px`,
      })

      gsap.to('#middle', {
        rotateZ: `${ offsetX * -0.5 }deg`,
      })
    }

    if (last) {
      gsap.to('#front', {
        rotateY: 0,
        z: 0,
      })

      gsap.to('#middle', {
        rotateZ: 0,
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

  const [frontPurple, setFrontPurple] = useState(false)

  return (
    <Container>
      <svg viewBox='0 0 500 100'>
        <defs>
          <filter id='filter-custom' />
        </defs>
      </svg>
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
      <MiddleVideo autoPlay loop muted playsInline id='middle' style={{ filter: frontPurple ? 'url(#red-wash)' : 'url(#purple-wash)' }}>
        <source src='/assets/hatch/coverr-jeronimos-monastery-in-lisbon-portugal-6360-original.mp4' type='video/mp4' />
      </MiddleVideo>
      <FrontVideo autoPlay loop muted playsInline id='front' style={{ filter: frontPurple ? 'url(#purple-wash)' : 'url(#red-wash)' }}>
        <source src='/assets/hatch/coverr-a-vinyl-disc-rotating-on-a-record-player-6767-original.mp4' type='video/mp4' />
      </FrontVideo>
    </Container>
  )
}

export default HatchPage
