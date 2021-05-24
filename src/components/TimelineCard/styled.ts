import styled from 'styled-components'
import { Timeline, TimelineProps } from 'antd'

export const YELLOW = '#ffc107'
const LIGHTBLUE = '#34577e'
const MIDBLUE = ' #234973'

interface TextProps {
  size?: number
  color?: string
  weight?: string
}

export const Container = styled.div`
  border: 1px solid ${YELLOW};
  text-align: center;
  margin: 8px 8px 0 8px;
  /* padding-right: 1000px; */
`

export const PatientContainer = styled.div`
  background-color: ${YELLOW};
  border-radius: 50px;
  height: 100px;
  width: 300px;
  margin: 0 auto 18px auto;
`

export const PatientInformation = styled.div`
  padding: 18px 0;
  text-align: center;
`

export const Text = styled.span<TextProps>`
  display: block;
  font-size: ${(props) => (props.size ? `${props.size}px` : '8px')};
  color: ${(props) => (props.color ? `${props.color}` : 'black')};
  font-weight: ${(props) => (props.weight ? `${props.weight}` : 'normal')};
  font-family: 'Prompt', sans-serif;
`

export const TimelineText = styled.span<TextProps>`
  font-size: ${(props) => (props.size ? `${props.size}px` : '8px')};
  color: ${(props) => (props.color ? `${props.color}` : 'black')};
  font-weight: ${(props) => (props.weight ? `${props.weight}` : 'normal')};
  font-family: 'Prompt', sans-serif;
`

export const EventBlock = styled.div`
  text-align: left;
  position: relative;
  background-color: ${LIGHTBLUE};
  min-height: 44px;

  padding-left: 20px;
  margin-top: 8px;

  border-radius: 10px;

  ::before {
    position: absolute;
    height: 1px;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid ${LIGHTBLUE};
    border-bottom: 8px solid transparent;
    content: '';
    left: -12px;
    top: 10px;
  }

  /* @media screen and (max-width: 1960px) {
    max-width: 800px;
  } 

  @media screen and (max-width: 1440px) {
    max-width: 600px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 400px;
  } */
  /* 
  @media screen and (max-width: 768px) {
    max-width: 300px;
  }

  @media screen and (max-width: 576px) {
    max-width: 260px;
  }

  @media screen and (max-width: 375px) {
    max-width: 220px;
  }
  @media screen and (max-width: 360px) {
    max-width: 200px;
  }

  @media screen and (max-width: 320px) {
    max-width: 180px;
  }  */
`

export const CovidTimeline = styled(Timeline)`
  width: auto;
`
