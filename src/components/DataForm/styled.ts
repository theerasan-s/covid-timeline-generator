import styled from 'styled-components'

import { Button, Input, Select } from 'antd'

export const DARKBLUE = '#012d5e'
export const Yellow = '#ffc107'
export const GREY = '#bbc7d4'
export const DARKGREY = '#5f5e5e'
export const LIGHTBLUE = '#34577e'
export const MIDBLUE = ' #234973'
export const GREEN = '#27a74e'

export const Container = styled.div`
  background-color: ${MIDBLUE};
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 200px;

  width: 100%;
`

export const TimelineContainer = styled.div`
  margin-top: 8px;
  background-color: ${MIDBLUE};
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 200px;

  width: 100%;
`

export const FormTitle = styled.span`
  color: ${GREEN};
  font-weight: bold;
`

export const FormItemLabel = styled.span`
  color: ${GREY};
`

export const FormInput = styled(Input)`
  color: ${DARKGREY};
`

export const GenderSelect = styled(Select)`
  color: ${DARKGREY};
`

export const DescriptionArea = styled(Input.TextArea)`
  color: ${DARKGREY};
`

export const SubmitButton = styled(Button)`
  background-color: ${Yellow};

  :focus {
    background-color: ${Yellow};
    color: black;
    border: none;
  }
`
