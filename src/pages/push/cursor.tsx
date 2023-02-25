import { animated, config, to, useSpring, useTrail } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { useState } from 'react'
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

const trans = (x: number, y: number) =>
  `translate3d(${ x }px,${ y }px,0) translate3d(-50%,-50%,0) `

function Cursor ({ xy: [x, y] }: { xy: [number, number] }) {
  const [trails] = useTrail(3, i => ({
    config: i === 0 ? config.default : config.slow,
    xy: [x, y],
  }))

  console.log(x, y)

  return (
    <>
      <svg width='500' height='500' viewBox='0 0 500 500' preserveAspectRatio='none' style={{ background: 'none', cursor: 'default' }}>
        <defs>
          <linearGradient id='gradient'>
            <stop offset='0%' stopColor='#3236a8' />
            <stop offset='100%' stopColor='#27bb36' />
          </linearGradient>
        </defs>
        {
          trails.map((props, index) => (
            <animated.circle key={ index } style={{ fill: 'url(#gradient)', fillOpacity: 1 }} r='25' cx='500' cy='500' />
          ))
        }
      </svg>
    </>
  )
}

function PushPage () {
  const [xy, setXY] = useState<[number, number]>([0, 0])

  useGesture(
    {
      onMove: ({ active, last, xy: [xPosition, yPosition] }) => {
        const x = (xPosition - window.innerWidth / 2) / window.innerWidth * 180
        const y = (yPosition - window.innerHeight / 2) / window.innerHeight * -180

        if (active) {
          setXY([x, y])
        }

        if (last) {
          setXY([0, 0])
        }
      },
    },
    {
      target: typeof window !== 'undefined' ? window : undefined,
    },
  )

  return (
    <Container>
      <Cursor xy={ xy } />
    </Container>
  )
}

export default PushPage
