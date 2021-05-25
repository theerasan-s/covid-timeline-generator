import React from 'react'

import { Row, Col } from 'antd'
import { Container, GuidingText, GuideContainer, Text, YELLOW } from './styled'

const RequestTimelineCard = () => {
  return (
    <Container>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Text size={32} color={YELLOW} weight="bold">
            Timeline
          </Text>
        </Col>
        <Col span={24}>
          <GuideContainer>
            <GuidingText size={16} weight="bold">
              กรุณาเพิ่มข้อมูลผู้ป่วยให้เรียบร้อยเพื่อสร้างไทม์ไลน์
            </GuidingText>
          </GuideContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default RequestTimelineCard
