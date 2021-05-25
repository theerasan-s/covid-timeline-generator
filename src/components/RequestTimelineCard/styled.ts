import styled from 'styled-components'
import { Timeline, Button } from 'antd'

export const YELLOW = '#ffc107'
export const LIGHTBLUE = '#34577e'
export const MIDBLUE = ' #234973'
export const GREY = '#bbc7d4'

interface TextProps {
  size?: number
  color?: string
  weight?: string
}

export const Container = styled.div`
  border: 1px solid ${YELLOW};
  height: 100%;
  text-align: center;
  margin-bottom: 8px;
`

export const Text = styled.span<TextProps>`
  display: block;
  font-size: ${(props) => (props.size ? `${props.size}px` : '8px')};
  color: ${(props) => (props.color ? `${props.color}` : 'black')};
  font-weight: ${(props) => (props.weight ? `${props.weight}` : 'normal')};
  font-family: 'Prompt', sans-serif;
`

export const GuidingText = styled(Text)`
  padding: 16px;
`

export const GuideContainer = styled.div`
  background-color: ${YELLOW};
  width: 50%;
  margin: 0 auto;
`
