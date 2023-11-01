import { useGesture } from '@use-gesture/react'
import * as BodyScrollLock from 'body-scroll-lock'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  transform-style: preserve-3d;
  perspective: 1000px;
  perspective-origin: top;

  touch-action: none;
`

const FrontVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 50vw;
  height: 50vh;

  transform: translate3d(-50%, -50%, 0);
  mix-blend-mode: difference;
`

const FrontPeephole = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 50vw;
  height: 50vh;

  background: #97EE86;
  mix-blend-mode: difference;

  -webkit-mask-image: url('/assets/hatch/nsm.png');
  mask-image: url('/assets/hatch/nsm.png');
  -webkit-mask-position: 50% 50%;
  mask-position: 50% 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
`

const MiddleVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 50vw;
  height: 50vh;

  transform: translate3d(-50%, -50%, 0);
  mix-blend-mode: difference;
`

const MiddlePeephole = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 50vw;
  height: 50vh;

  background: #FFCCDF;
  mix-blend-mode: difference;

  -webkit-mask-image: url('/assets/hatch/cdm.png');
  mask-image: url('/assets/hatch/cdm.png');
  -webkit-mask-position: 50% 50%;
  mask-position: 50% 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
`

function HatchPage() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('#front-peephole', { xPercent: -50, yPercent: -50, rotateX: 0, rotateY: 0, z: 25 })
      gsap.set('#mid-peephole', { xPercent: -50, yPercent: -50, rotateY: 0, z: -25 })
    }, containerRef)

    return () => ctx.revert()
  })

  useEffect(() => {
    BodyScrollLock.disableBodyScroll(document.querySelector('body'))

    return () => {
      BodyScrollLock.enableBodyScroll(document.querySelector('body'))
    }
  }, [])

  const handler = ({ xy: [x, y] }) => {
    const yPercent = y / window.innerHeight
    const xPercent = x / window.innerWidth
    const rotateX = gsap.utils.interpolate(90, -90, yPercent)
    const rotateY = gsap.utils.interpolate(-90, 90, xPercent)
    const translateZ = gsap.utils.interpolate(-50, 50, yPercent)

    const ctx = gsap.context(() => {
      gsap
        .to('#front-peephole', {
          duration: 1,
          ease: 'slow',
          transform: `translate3d(-50%, -50%, 0) translateZ(${ translateZ }vh)`,
        })

      gsap
        .to('#mid-peephole', {
          duration: 1,
          ease: 'slow',
          transform: `translate3d(-50%, -50%, 0) translateZ(${ -translateZ }vh)`,
        })

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
      <FrontPeephole id='front-peephole'>
        <FrontVideo autoPlay loop muted playsInline>
          <source src='/assets/hatch/coverr-a-vinyl-disc-rotating-on-a-record-player-6767-original.mp4' type='video/mp4' />
        </FrontVideo>
      </FrontPeephole>
      <MiddlePeephole id='mid-peephole'>
        <MiddleVideo autoPlay loop muted playsInline>
          <source src='/assets/hatch/coverr-jeronimos-monastery-in-lisbon-portugal-6360-original.mp4' type='video/mp4' />
        </MiddleVideo>
      </MiddlePeephole>
    </Container>
  )
}

export default HatchPage
