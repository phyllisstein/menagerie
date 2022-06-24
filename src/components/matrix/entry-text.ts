import styled from '@emotion/styled'

export const EntryText = styled.article`
  ${ ({ theme }) => theme.typeface.primary({ fontSize: 10 }) }

  padding: 2rem;
  text-align: center;

  &&& > strong {
    font-weight: 700;
  }
`
