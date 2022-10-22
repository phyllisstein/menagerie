import styled from 'styled-components'

export const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;

  background-color: ${ props => props.theme.paletteVox.css.brandYellow };
  border-radius: 4px;
`

export const Avatar = styled.div`
  display: flex;
`
