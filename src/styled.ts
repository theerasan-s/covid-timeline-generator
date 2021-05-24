import styled from 'styled-components'

interface TextProps {
  size?: number
  color?: string
  weight?: string
}

export const YELLOW = '#ffc107'
export const DARKBLUE = '#012d5e'

export const Container = styled.div`
  background-color: ${DARKBLUE};
`

export const TitleContainer = styled.div`
  margin: 8px 0;

  @media screen and (max-width: 576px) {
    margin-left: 8px;
  }
`

export const Text = styled.span<TextProps>`
  display: block;
  font-size: ${(props) => (props.size ? `${props.size}px` : '8px')};
  color: ${(props) => (props.color ? `${props.color}` : 'black')};
  font-weight: ${(props) => (props.weight ? `${props.weight}` : 'normal')};
  font-family: 'Prompt', sans-serif;
`

export const FormContainer = styled.div`
  margin-right: 32px;

  @media screen and (max-width: 576px) {
    margin: 0 8px;
  }
`

export const TimelineContainer = styled.div`
  @media screen and (max-width: 576px) {
    margin: 0 8px;
  }
`
