import styled from 'styled-components'

const FilterImage = styled.img`
  filter: url(#filter-custom);
`

const FilterHed = styled.h1`
  position: relative;

  font-weight: 700;
  font-size: 3rem;
  line-height: 2;

  filter: url(#filtered-1);
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

  transform: translate3d(-50%, -50%, 10rem);
  filter: url(#red-wash);

  mask-image: url('/assets/hatch/circle-dot.png');
  mask-size: 100% 100%;
`

const FrontVideo = styled.video`;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate3d(-50%, -50%, 1rem);
  filter: url(#purple-wash);

  mask-image: url('/assets/hatch/triangle.png');
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

  return (
    <div style={{ height: '100vh', perspective: '1000px', width: '100vw' }}>
      <svg viewBox='0 0 500 100'>
        <defs>
          <filter id='filter-custom' />
        </defs>
      </svg>
      <svg viewBox='0 0 10 10' width='0' height='0'>
        <defs>
          <mask id='filtered-1'>
            <rect x='0' y='0' width='10' height='10' fill='#000000' />
            <rect x='1' y='1' width='8' height='8' fill='#ffffff' />
          </mask>
          <filter id='purple-wash'>
            <feTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' result='turbulence' />
            <feDisplacementMap in='SourceGraphic' in2='turbulence' scale='20' />
            <feColorMatrix type='matrix' values={ purpleMatrix } />
          </filter>
          <filter id='red-wash'>
            <feColorMatrix type='matrix' values={ redMatrix } />
          </filter>
        </defs>
      </svg>
      <MiddleVideo autoPlay loop muted playsInline>
        <source src='/assets/hatch/coverr-jeronimos-monastery-in-lisbon-portugal-6360-original.mp4' type='video/mp4' />
      </MiddleVideo>
      <FrontVideo autoPlay loop muted playsInline>
        <source src='/assets/hatch/coverr-a-vinyl-disc-rotating-on-a-record-player-6767-original.mp4' type='video/mp4' />
      </FrontVideo>
    </div>
  )
}

export default HatchPage
