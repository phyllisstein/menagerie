import { animated, to, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import io, { type Socket } from 'socket.io-client'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform-style: preserve-3d;
  perspective: 750px;
`

const Face = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
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
    rotateX: 0,
    rotateY: 0,
  }))

  const idRef = useRef<string>()
  const socketRef = useRef<Socket>()
  const rotatesYRef = useRef<boolean>(Math.random() > 0.5)
  const [wisps, setWisps] = useState<WispsData>({})

  useEffect(() => {
    const createSocket = () => {
      let socket = socketRef.current
      let id = idRef.current
      const rotatesY = rotatesYRef.current

      if (!id) {
        id =
        typeof crypto === 'undefined'
          ? Math.random().toString(36).substring(7)
          : crypto.randomUUID()

        idRef.current = id
      }

      if (!socket) {
        // socket = io('wss://cloudflare-wisps-dev.daniel8056.workers.dev/')
        socket = io('http://localhost:3000')
        socketRef.current = socket

        socket.on('update', data => {
          const { state } = data

          const values = Object.values(state).sort((a, b) => a.timestamp - b.timestamp)
          values.forEach(wisp => {
            gsap.to(`#wisp-${ wisp.id }`, {
              x: `${ (wisp.position[0] - 0.5) * window.innerWidth }px`,
              xPercent: -50,
              y: `${ (wisp.position[1] - 0.5) * window.innerHeight }px`,
              yPercent: -50,
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
            pctX,
            pctY,
            rotatesYRef.current,
          ],
          timestamp: new Date().getTime(),
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
      }, 1500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [resetPending])

  return (
    <>
      <Container>
        <Viewer id='viewer' style={{ transform: rotatesYRef.current ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <Face color='blue400' style={{
            transform: to([props.rotateX, props.rotateY], (x, y) => `translate(-50%, -50%) rotateX(${ x }deg) rotateY(${ y }deg) translateZ(25vw)`),
          }}>
            <h1 style={{ fontSize: '1rem', color: '#FFF' }}>Front</h1>
          </Face>
          <Face color='red400' style={{
            transform: to([props.rotateX, props.rotateY], (x, y) => `translate(-50%, -50%) rotateX(${ x }deg) rotateY(${ y }deg) translateZ(-25vw) rotateY(180deg)`),
          }}>
            <h1 style={{ fontSize: '1rem', color: '#FFF' }}>Back</h1>
          </Face>
          {
            Object.values(wisps).map(({ id }) => {
              return id && (
                <svg key={ id } id={ `wisp-${ id }` } style={{ width: '50px', height: '50px', position: 'absolute' }} viewBox='0 0 50 50'>
                  <circle cx='50%' cy='50%' r='50%' fill='#000000' />
                </svg>
              )
            })
          }
        </Viewer>
      </Container>
    </>
  )
}

export default PushPage
