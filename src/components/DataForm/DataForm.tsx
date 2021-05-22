import React from 'react'

import { Row, Col, Form, Input, Select, DatePicker } from 'antd'
import { Container, FormTitle, FormItemLabel, SubmitButton } from './styled'
import { PlusOutlined } from '@ant-design/icons'

const genders = ['ชาย', 'หญิง']

const DataForm = () => {
  const { Option } = Select
  const { TextArea } = Input

  return (
    <div>
      <Form layout="vertical">
        <Container>
          <Row>
            <FormTitle>ข้อมูลผู้ป่วย</FormTitle>
          </Row>
          <Row gutter={[16, 8]}>
            <Col span={10}>
              <Form.Item label={<FormItemLabel>เพศ</FormItemLabel>}>
                <Select defaultValue={genders[0]}>
                  {genders.map((gender, index) => (
                    <Option value={gender} key={index}>
                      {gender}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item label={<FormItemLabel>อายุ</FormItemLabel>}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={<FormItemLabel>อาชีพ</FormItemLabel>}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <FormTitle>ข้อมูลไทม์ไลน์</FormTitle>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={<FormItemLabel>วันเวลา</FormItemLabel>}>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<FormItemLabel>รายละเอียด</FormItemLabel>}>
                <TextArea rows={5} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <SubmitButton icon={<PlusOutlined />} htmlType="submit">
                  เพิ่มข้อมูล
                </SubmitButton>
              </Form.Item>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  )
}

export default DataForm
