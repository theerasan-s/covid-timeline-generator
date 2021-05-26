import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { mockTimeline } from '../../Mocks/mockTimeline'

import TimelineCard from './TimelineCard'

describe('TimelineCard', () => {
  const onDeleteSpy = jest.fn()

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  afterEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
  })

  it('should render all component correctly', () => {
    render(<TimelineCard timelineData={mockTimeline} onDelete={onDeleteSpy} />)

    const timelineTitle = screen.getByText('Timeline')
    const patientInfo = screen.getByText('ผู้ป่วยชาย อายุ 22 ปี')
    const patientJob = screen.getByText('อาชีพ tester')
    const timelineDate = screen.getByText('25/05/2021')
    const timelineTime = screen.getByText('19:00')
    const event = screen.getByText('test')
    const deletebutton = screen.getByTestId('delete 25/05/2021 19:00')

    expect(timelineTitle).toBeDefined()
    expect(patientInfo).toBeDefined()
    expect(patientJob).toBeDefined()
    expect(timelineDate).toBeDefined()
    expect(timelineTime).toBeDefined()
    expect(event).toBeDefined()
    expect(deletebutton).toBeDefined()
  })

  it('should call onDelete', () => {
    render(<TimelineCard timelineData={mockTimeline} onDelete={onDeleteSpy} />)

    const deletฺeฺฺButton = screen.getByTestId('delete 25/05/2021 19:00')

    fireEvent.click(deletฺeฺฺButton)

    expect(onDeleteSpy).toBeCalledTimes(1)
  })
})
