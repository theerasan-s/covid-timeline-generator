import React from 'react'

import { Row, Col, Timeline } from 'antd'
import { covidData } from '../../datatypes/formDatatypes'

import {
  Container,
  Text,
  PatientContainer,
  PatientInformation,
  EventBlock,
  YELLOW,
  CovidTimeline,
  TimelineText,
} from './styled'

type Props = {
  timelineData: covidData
}

const TimelineCard = ({ timelineData }: Props) => {
  return (
    <Container>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Text size={32} color={YELLOW} weight="bold">
            Timeline
          </Text>
        </Col>
        <Col span={24}>
          <PatientContainer>
            <PatientInformation>
              <Text
                size={24}
              >{`ผู้ป่วย${timelineData.gender} อายุ ${timelineData.age} ปี`}</Text>
              <Text size={16}>{`อาชีพ ${timelineData.job}`}</Text>
            </PatientInformation>
          </PatientContainer>
        </Col>
      </Row>
      <Row justify="start">
        <Col span={23}>
          <div>
            <CovidTimeline mode="left">
              {timelineData.timeline.map((timeline) => (
                <Timeline.Item label={timeline.date} key={timeline.date}>
                  {timeline.action.map((action) => (
                    <EventBlock>
                      <TimelineText color={YELLOW} size={14}>
                        {`${action.time} `}
                      </TimelineText>

                      {action.event.length > 0 ? (
                        action.event.map((actionEvent, index) =>
                          index == action.event.length - 1 ? (
                            <TimelineText
                              size={14}
                            >{`${actionEvent}`}</TimelineText>
                          ) : (
                            <TimelineText
                              size={14}
                            >{`${actionEvent} และ `}</TimelineText>
                          )
                        )
                      ) : (
                        <TimelineText
                          size={14}
                        >{`${action.event[0]}`}</TimelineText>
                      )}
                    </EventBlock>
                  ))}
                </Timeline.Item>
              ))}
            </CovidTimeline>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default TimelineCard
