import React from 'react'

import { render, screen } from '@testing-library/react'
import { FormInstance } from 'antd/lib/form/Form'

import DataForm from './DataForm'

describe('DataForm', () => {
  const onSubmitSpy = jest.fn()

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

  const mockForm = {
    getFieldsValue: () => {},
    __INTERNAL__: { itemRef: jest.fn(), name: 'test' },
    getInternalHooks: () => ({
      useSubscription: jest.fn(),
      setValidateMessages: jest.fn(),
      setCallbacks: jest.fn(),
      setPreserve: jest.fn(),
      setInitialValues: jest.fn(),
      useSubscribe: jest.fn(),
      initEntityValue: jest.fn(),
      registerField: jest.fn(),
    }),
    validateFields: () => ({ setValidateMessages: jest.fn() }),
  } as unknown as FormInstance

  it('should render all components', () => {
    render(<DataForm form={mockForm} onSubmit={onSubmitSpy} />)
    const gender = screen.getByLabelText('เพศ')
    const age = screen.getByLabelText('อายุ')
    const job = screen.getByLabelText('อาชีพ')
    const timeline = screen.getByLabelText('วันเวลา')
    const description = screen.getByLabelText('รายละเอียด')

    expect(gender).toBeDefined()
    expect(age).toBeDefined()
    expect(job).toBeDefined()
    expect(timeline).toBeDefined()
    expect(description).toBeDefined()
  })
})
