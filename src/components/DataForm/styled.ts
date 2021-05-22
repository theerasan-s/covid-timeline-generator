import styled from 'styled-components'

import { Button } from 'antd'

const DARKBLUE = '#012d5e'
const Yellow = '#ffc107'
const GREY = '#bbc7d4'
const LIGHTBLUE = '#34577e'
const MIDBLUE = ' #234973'
const GREEN = '#27a74e'

export const Container = styled.div`
  background-color: ${LIGHTBLUE};
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 8px;
  max-width: 380px;
`

export const FormTitle = styled.span`
  color: ${GREEN};
  font-weight: bold;
  margin: 8px 0;
`

export const FormItemLabel = styled.span`
  color: white;
`
export const SubmitButton = styled(Button)`
  background-color: ${Yellow};
  color: white;

  :focus {
    background-color: ${Yellow};
    color: white;
  }
`
