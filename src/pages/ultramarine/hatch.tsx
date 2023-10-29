import { useGesture } from '@use-gesture/react'
import * as BodyScrollLock from 'body-scroll-lock'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

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
  filter: url(#middle-video-wash);
`

const FrontVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 100vw;
  height: 100vh;

  transform: translate3d(-50%, -50%, 0);
  filter: url(#front-video-wash);
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

function HatchPage() {
  const containerRef = useRef(null)
  const [frontPurple, setFrontPurple] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('#front-peephole', { rotateX: 0, rotateY: 0, z: -25 })
      gsap.set('#mid-peephole', { rotateY: 0, z: 25 })
    }, containerRef)

    return () => ctx.revert()
  })

  useEffect(() => {
    BodyScrollLock.disableBodyScroll(document.querySelector('body'))

    return () => {
      BodyScrollLock.enableBodyScroll(document.querySelector('body'))
    }
  }, [])

  const handler = ({ last, xy: [x, y] }) => {
    const rotateX = gsap.utils.interpolate(-35, 35, y / window.innerHeight)
    const rotateY = gsap.utils.interpolate(-35, 35, x / window.innerWidth)

    const ctx = gsap.context(() => {
      gsap.to('#front-video-wash feColorMatrix', {
        duration: 5,
        attr: { values: frontPurple ? purpleMatrix : redMatrix },
      })
      gsap.to('#middle-video-wash feColorMatrix', {
        duration: 5,
        attr: { values: frontPurple ? redMatrix : purpleMatrix },
      })

      gsap
        .to('#front-peephole', {
          duration: 5,
          rotateX: `${ rotateX }deg`,
          rotateY: `${ rotateY }deg`,
        })

      gsap
        .to('#mid-peephole', {
          duration: 5,
          rotateY: `${ -rotateY }deg`,
        })

      if (last) {
        setFrontPurple(fp => !fp)
      }

      return () => ctx.revert()
    }, containerRef)
  }

  useGesture(
    {
      onDrag: handler,
      onMove: handler,
    },
    { target: typeof window !== 'undefined' ? window : null },
  )

  return (
    <Container ref={ containerRef }>
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
      <svg viewBox='0 0 10 10' width='0' height='0'>
        <defs>
          <filter id='front-video-wash'>
            <feColorMatrix type='matrix' values={ identityMatrix } />
          </filter>
          <filter id='middle-video-wash'>
            <feColorMatrix type='matrix' values={ identityMatrix } />
          </filter>
        </defs>
      </svg>
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
