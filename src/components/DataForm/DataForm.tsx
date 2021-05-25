import React from 'react'

import { Row, Col, Form, Input, Select, DatePicker, FormInstance } from 'antd'
import {
  Container,
  FormTitle,
  FormItemLabel,
  SubmitButton,
  TimelineContainer,
  FormInput,
  GenderSelect,
  DescriptionArea,
} from './styled'
import { PlusOutlined } from '@ant-design/icons'

type Props = {
  form: FormInstance<any>
  onSubmit: () => void
}

const genders = ['ชาย', 'หญิง']

const DataForm = ({ form, onSubmit }: Props) => {
  const { Option } = Select
  const { TextArea } = Input

  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Container>
        <Row>
          <FormTitle>ข้อมูลผู้ป่วย</FormTitle>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={10}>
            <Form.Item
              name="gender"
              label={<FormItemLabel>เพศ</FormItemLabel>}
              initialValue={genders[0]}
            >
              <GenderSelect>
                {genders.map((gender, index) => (
                  <Option value={gender} key={index}>
                    {gender}
                  </Option>
                ))}
              </GenderSelect>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="age"
              label={<FormItemLabel>อายุ</FormItemLabel>}
              rules={[
                {
                  pattern: new RegExp('^[1-9][0-9]*$'),
                  message: 'กรุณากรอกอายุให้ถูกต้อง เช่น 1 ปี, 12 ปี',
                },
              ]}
            >
              <FormInput maxLength={3} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="job" label={<FormItemLabel>อาชีพ</FormItemLabel>}>
              <FormInput />
            </Form.Item>
          </Col>
        </Row>
      </Container>
      <TimelineContainer>
        <Row>
          <FormTitle>ข้อมูลไทม์ไลน์</FormTitle>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="timeline"
              label={<FormItemLabel>วันเวลา</FormItemLabel>}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก วันที่ และ เวลา',
                },
              ]}
            >
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format={'MM/DD/YYYY HH:mm'}
                style={{ width: '100%', color: 'white' }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label={<FormItemLabel>รายละเอียด</FormItemLabel>}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก รายละเอียด',
                },
              ]}
            >
              <DescriptionArea rows={5} />
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
      </TimelineContainer>
    </Form>
  )
}

export default DataForm
