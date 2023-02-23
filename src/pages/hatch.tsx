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
  filter: url(#purple-wash);
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
    const offsetX = (window.innerWidth - x) / window.innerWidth * 100
    const offsetY = (window.innerHeight - y) / window.innerHeight * 100

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
    <div>
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
      <Peephole id='peephole'>
        <FrontVideo autoPlay loop muted playsInline style={{ filter: frontPurple ? 'url(#purple-wash)' : 'url(#red-wash)' }}>
          <source src='/assets/hatch/coverr-a-vinyl-disc-rotating-on-a-record-player-6767-original.mp4' type='video/mp4' />
        </FrontVideo>
      </Peephole>
    </div>
  )
}

export default HatchPage
