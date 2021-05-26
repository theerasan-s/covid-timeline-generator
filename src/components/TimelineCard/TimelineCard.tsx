import React from 'react'

import { Row, Col, Timeline } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { covidData } from '../../datatypes/formDatatypes'

import {
  Container,
  Text,
  PatientContainer,
  PatientInformation,
  EventBlock,
  CovidTimeline,
  TimelineText,
  DeleteButton,
  YELLOW,
  GREY,
} from './styled'

type Props = {
  timelineData: covidData
  onDelete: (date: string, time: string) => void
}

const TimelineCard = ({ timelineData, onDelete }: Props) => {
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
              <Text size={24}>{`ผู้ป่วย${timelineData.gender} อายุ  ${
                typeof timelineData.age == 'undefined'
                  ? 'ไม่ระบุ'
                  : `${timelineData.age} ปี `
              }`}</Text>
              <Text size={16}>{`อาชีพ ${
                typeof timelineData.job == 'undefined'
                  ? 'ไม่ระบุ'
                  : `${timelineData.job}`
              }`}</Text>
            </PatientInformation>
          </PatientContainer>
        </Col>
      </Row>
      <Row justify="start">
        <Col span={23}>
          <div>
            <CovidTimeline mode="left">
              {timelineData.timeline.map((timeline) => (
                <Timeline.Item
                  key={timeline.date}
                  label={
                    <TimelineText color={YELLOW} size={14}>
                      {`${timeline.date}`}
                    </TimelineText>
                  }
                >
                  {timeline.action.map((action) => (
                    <EventBlock key={action.time}>
                      <TimelineText color={YELLOW} size={14}>
                        {`${action.time} `}
                      </TimelineText>

                      {action.event.length > 0 ? (
                        action.event.map((actionEvent, index) =>
                          index === action.event.length - 1 ? (
                            <TimelineText
                              size={14}
                              color={GREY}
                              key={index}
                            >{`${actionEvent}`}</TimelineText>
                          ) : (
                            <TimelineText
                              size={14}
                              color={GREY}
                              key={index}
                            >{`${actionEvent} และ `}</TimelineText>
                          )
                        )
                      ) : (
                        <TimelineText
                          size={14}
                          color={GREY}
                        >{`${action.event[0]}`}</TimelineText>
                      )}
                      <DeleteButton
                        shape="circle"
                        icon={<CloseOutlined />}
                        size="small"
                        onClick={() => onDelete(timeline.date, action.time)}
                        data-testid={`delete ${timeline.date} ${action.time}`}
                      />
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
