import { NextPage } from 'next'
import styled from 'styled-components'

const AichOne = styled.h1`
    ${ ({ theme }) => theme.typeface.primary({ fontSize: 12, lineHeight: 12 }) }

    text-align: center;
`

const Home: NextPage = () => {
    return (
        <div>
            <main>
                <AichOne>
                    You did the thing!
                </AichOne>
            </main>
        </div>
    )
}

export default Home
