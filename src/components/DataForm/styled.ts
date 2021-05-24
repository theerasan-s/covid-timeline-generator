import styled from 'styled-components'

import { Button } from 'antd'

const DARKBLUE = '#012d5e'
const Yellow = '#ffc107'
const GREY = '#bbc7d4'
const LIGHTBLUE = '#34577e'
const MIDBLUE = ' #234973'
const GREEN = '#27a74e'

export const Container = styled.div`
  background-color: ${MIDBLUE};
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 8px;
  margin-right: 200px;

  width: 100%;
`

export const FormTitle = styled.span`
  color: ${GREEN};
  font-weight: bold;
`

export const FormItemLabel = styled.span`
  color: white;
`
export const SubmitButton = styled(Button)`
  background-color: ${Yellow};

  :focus {
    background-color: ${Yellow};
  }
`
