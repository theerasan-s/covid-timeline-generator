import React from 'react'

import 'antd/dist/antd.css'
import './App.css'
import DataForm from './components/DataForm/DataForm'
import TimelineCard from './components/TimelineCard/TimelineCard'
import RequestTimelineCard from './components/RequestTimelineCard/RequestTimelineCard'
import { Row, Col } from 'antd'
import useFormAction from './hooks/useFormAction'
import { covidData } from './datatypes/formDatatypes'
import {
  Container,
  Text,
  TitleContainer,
  FormContainer,
  TimelineContainer,
  YELLOW,
} from './styled'

const App = () => {
  const localData = localStorage.getItem('covid-generator') || 'null'
  const formData: covidData = JSON.parse(localData)

  const { form, generatedTimeline, submitData, onDelete } =
    useFormAction(formData)

  return (
    <Container>
      <Row justify="center">
        <Col
          xs={{ span: 24 }}
          md={{ span: 24, push: 1 }}
          lg={{ span: 24, push: 1 }}
        >
          <TitleContainer>
            <Text size={24} color={YELLOW}>
              COVID Timeline Generator
            </Text>
          </TitleContainer>
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 9 }} lg={{ span: 9 }}>
          <FormContainer>
            <DataForm form={form} onSubmit={submitData} />
          </FormContainer>
        </Col>

        {generatedTimeline ? (
          <Col xs={{ span: 24 }} md={{ span: 13 }} lg={{ span: 13 }}>
            <TimelineContainer>
              <TimelineCard
                timelineData={generatedTimeline}
                onDelete={onDelete}
              />
            </TimelineContainer>
          </Col>
        ) : (
          <Col xs={{ span: 24 }} md={{ span: 13 }} lg={{ span: 13 }}>
            <TimelineContainer>
              <RequestTimelineCard />
            </TimelineContainer>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default App
