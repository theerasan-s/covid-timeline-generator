import { renderHook, act } from '@testing-library/react-hooks'

import {
  mockTimeline,
  mockSortByTimeTimeline,
  mockSortByDate,
} from '../Mocks/mockTimeline'
import { covidData } from '../datatypes/formDatatypes'

import moment from 'moment'

import useFormActionType from './useFormAction'

const useFormSpy = jest.fn()

const useFormReturnValue = {
  gender: 'ชาย',
  age: '24',
  job: 'tester',
  timeline: moment('2021-05-25 18:00'),
  description: 'test',
}

jest.doMock('antd/lib/form/Form', () => ({
  useForm: useFormSpy,
}))

beforeEach(() => {
  useFormSpy.mockReturnValue([{ getFieldsValue: () => useFormReturnValue }])
})

afterEach(() => {
  jest.resetModules()
  jest.resetAllMocks()
})

describe('useFormAction', () => {
  const useFormAction = require('./useFormAction')
    .default as typeof useFormActionType

  it('should set generatedTimeline to be null if there is no covidData', () => {
    const { result } = renderHook(() =>
      useFormAction(null as unknown as covidData)
    )

    expect(result.current.generatedTimeline).toBeNull()
  })

  it('should set generatedTimeline', () => {
    const { result } = renderHook(() => useFormAction(mockTimeline))

    expect(result.current.generatedTimeline).toStrictEqual({
      gender: 'ชาย',
      age: '22',
      job: 'tester',
      timeline: [
        { date: '25/05/2021', action: [{ time: '19:00', event: ['test'] }] },
      ],
    })
  })

  it('should create a timeline correctly if date of timeline does not exist', () => {
    const { result } = renderHook(() =>
      useFormAction(null as unknown as covidData)
    )

    act(() => {
      result.current.submitData()
    })

    expect(result.current.generatedTimeline).toStrictEqual({
      gender: 'ชาย',
      age: '24',
      job: 'tester',
      timeline: [
        { date: '25/05/2021', action: [{ time: '18:00', event: ['test'] }] },
      ],
    })
  })

  it('should add sort new timeline by date correctly', () => {
    useFormSpy.mockReturnValue([
      {
        getFieldsValue: () => ({
          gender: 'ชาย',
          age: '24',
          job: 'tester',
          timeline: moment('2021-05-26 19:00'),
          description: 'test',
        }),
      },
    ])

    const { result } = renderHook(() => useFormAction(mockSortByDate))

    act(() => {
      result.current.submitData()
    })

    expect(result.current.generatedTimeline).toStrictEqual({
      gender: 'ชาย',
      age: '24',
      job: 'tester',
      timeline: [
        { date: '25/05/2021', action: [{ time: '19:00', event: ['test'] }] },
        { date: '26/05/2021', action: [{ time: '19:00', event: ['test'] }] },
        { date: '27/05/2021', action: [{ time: '19:00', event: ['test'] }] },
      ],
    })
  })

  it('should add sort new timeline by time correctly', () => {
    useFormSpy.mockReturnValue([
      {
        getFieldsValue: () => ({
          gender: 'ชาย',
          age: '24',
          job: 'tester',
          timeline: moment('2021-05-25 19:05'),
          description: 'test',
        }),
      },
    ])

    const { result } = renderHook(() => useFormAction(mockSortByTimeTimeline))

    act(() => {
      result.current.submitData()
    })

    expect(result.current.generatedTimeline).toStrictEqual({
      gender: 'ชาย',
      age: '24',
      job: 'tester',
      timeline: [
        {
          date: '25/05/2021',
          action: [
            { time: '19:00', event: ['test'] },
            { time: '19:05', event: ['test'] },
            { time: '19:08', event: ['test'] },
          ],
        },
      ],
    })
  })

  it('should add sort new event correctly if it already have date and time in the timeline', () => {
    useFormSpy.mockReturnValue([
      {
        getFieldsValue: () => ({
          gender: 'ชาย',
          age: '24',
          job: 'tester',
          timeline: moment('2021-05-25 19:00'),
          description: 'test2',
        }),
      },
    ])

    const { result } = renderHook(() => useFormAction(mockTimeline))

    act(() => {
      result.current.submitData()
    })

    expect(result.current.generatedTimeline).toStrictEqual({
      gender: 'ชาย',
      age: '24',
      job: 'tester',
      timeline: [
        {
          date: '25/05/2021',
          action: [{ time: '19:00', event: ['test', 'test2'] }],
        },
      ],
    })
  })
})
