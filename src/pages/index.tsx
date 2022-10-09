import { css } from '@emotion/react'
import { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [count, setCount] = useState(0)

  console.log('render', count)

  return (
    <div>
      <main>
        <h1
          css={ theme => css`
            ${ theme.typeface.primary({ fontSize: 6, lineHeight: 8 }) }

            text-align: center;
          ` }>
          You did the thing!
        </h1>
      </main>
    </div>
  )
}

export default Home
