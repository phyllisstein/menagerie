import { animated, config, to, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform-style: preserve-3d;
  perspective: 1000px;
`

const Face = styled(animated.div)`
  position: absolute;

  width: 25vw;
  height: 25vh;

  background-color: ${ ({ color, theme }) => theme.paletteLight.css[color] };
  backface-visibility: visible;
  opacity: 0.8;
`

const Viewer = styled.div`
  transform-style: preserve-3d;
`

function PushPage () {
  const [resetPending, setResetPending] = useState(false)

  const [props, api] = useSpring(() => ({
    config: config.molasses,
    rotateX: 0,
    rotateY: 0,
  }))

  useGesture(
    {
      onMove: ({ active, last, xy: [xPosition, yPosition] }) => {
        const x = (xPosition - window.innerWidth / 2) / window.innerWidth * 90
        const y = (yPosition - window.innerHeight / 2) / window.innerHeight * -90

        if (active) {
          api.start({
            rotateX: y,
            rotateY: x,
          })
        }

        if (last && !resetPending) {
          setResetPending(true)
        }
      },
    },
    {
      target: typeof window !== 'undefined' ? window : undefined,
    },
  )

  useEffect(() => {
    let timeout: NodeJS.Timer

    if (resetPending) {
      timeout = setInterval(() => {
        api.start({
          rotateX: 0,
          rotateY: 0,
        })

        setResetPending(false)
      }, 500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [resetPending])

  return (
    <Container>
      <Viewer style={{ transform: 'rotateY(0deg)' }}>
        <Face color='blue400' style={{
          transform: to([props.rotateX, props.rotateY], (x, y) => `translate3d(-50%, -50%, 2rem) rotateX(${ x }deg) rotateY(${ y }deg)`),
        }}>
          <h1 style={{ fontSize: '2.5rem' }}>1</h1>
        </Face>
        <Face color='red400' style={{
          transform: to([props.rotateX, props.rotateY], (x, y) => `translate3d(-50%, -50%, 0) rotateX(${ x }deg) rotateY(${ y }deg) rotateY(180deg)`),
        }}>
          <h1 style={{ fontSize: '2.5rem' }}>2</h1>
        </Face>
      </Viewer>
    </Container>
  )
}

export default PushPage
