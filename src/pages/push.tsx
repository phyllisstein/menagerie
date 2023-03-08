import { animated, config, to, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { gsap } from 'gsap'
import pWaitFor from 'p-wait-for'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import io, { type Socket } from 'socket.io-client'
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

interface Wisp {
  id: string
  position: [number, number, number]
}

interface WispsData {
  [key: string]: Wisp
}

function PushPage () {
  const [resetPending, setResetPending] = useState(false)

  const [props, api] = useSpring(() => ({
    config: config.molasses,
    rotateX: 0,
    rotateY: 0,
  }))

  const idRef = useRef<string>()
  const socketRef = useRef<Socket>()
  const [wisps, setWisps] = useState<WispsData>({})

  useEffect(() => {
    const createSocket = () => {
      let socket = socketRef.current
      let id = idRef.current

      if (!id) {
        id =
        typeof crypto === 'undefined'
          ? Math.random().toString(36).substring(7)
          : crypto.randomUUID()

        idRef.current = id
      }

      if (!socket) {
        // socket = io('wss://cloudflare-wisps-dev.daniel8056.workers.dev/')
        socket = io('http://localhost:3030')
        socketRef.current = socket

        socket.on('update', data => {
          const { state } = data

          const values = Object.values(state).sort((a, b) => a.timestamp - b.timestamp)
          values.forEach(wisp => {
            gsap.to(`#wisp-${ wisp.id }`, {
              x: `${ wisp.position[0] * window.innerWidth - 25 }px`,
              y: `${ wisp.position[1] * window.innerHeight - 75 }px`,
              z: `${ wisp.position[2] * window.innerHeight }px`,
            })
          })

          const last = values.pop()

          if (last) {
            const rotateY = ((last.position[0] * window.innerWidth) - window.innerWidth / 2) / window.innerWidth * 90
            const rotateX = ((last.position[1] * window.innerHeight) - window.innerHeight / 2) / window.innerHeight * -90

            api.start({
              rotateX,
              rotateY,
            })
          }

          setResetPending(true)
          setWisps(state)
        })
      }
    }

    void createSocket()
  }, [])

  useGesture(
    {
      onMove: ({ active, last, xy: [xPosition, yPosition] }) => {
        const pctX = xPosition / window.innerWidth
        const pctY = yPosition / window.innerHeight

        socketRef.current.emit('update', {
          id: idRef.current,
          position: [
            Math.round(pctX * 100) / 100,
            Math.round(pctY * 100) / 100,
            0,
          ],
          timestamp: performance.now(),
        })
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
    <>
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
      {
        Object.values(wisps).map(({ id, position }) => {
          return position && (
            <svg key={ id } id={ `wisp-${ id }` } style={{ width: '50px', height: '50px' }} viewBox='0 0 50 50'>
              <circle cx='50%' cy='50%' r='50%' fill='#000000' />
            </svg>
          )
        })
      }
    </>
  )
}

export default PushPage
