import React from 'react'

import 'antd/dist/antd.css'
import './App.css'
import DataForm from './components/DataForm/DataForm'
import TimelineCard from './components/TimelineCard/TimelineCard'
import { Row, Col } from 'antd'
import useFormAction from './hooks/useFormAction'
import { covidData } from './datatypes/formDatatypes'

const App = () => {
  const localData = localStorage.getItem('covid-generator') || 'null'
  const formData: covidData = JSON.parse(localData)

  const { form, generatedTimeline, submitData } = useFormAction(formData)

  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <DataForm form={form} onSubmit={submitData} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <TimelineCard timelineData={generatedTimeline} />
        </Col>
      </Row>
    </>
  )
}

export default App
