import { NextPage } from 'next'
import styled, { css } from 'styled-components'

const HaichOne = styled.h1`
  ${ ({ theme }) => theme.typeface.primary({ fontSize: 6, lineHeight: 8 }) }

  text-align: center;
`

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <HaichOne>
          You did the thing!
        </HaichOne>
      </main>
    </div>
  )
}

export default Home
