import React from 'react'
import logo from './logo.svg'
import 'antd/dist/antd.css'
import './App.css'
import DataForm from './components/DataForm/DataForm'
import useFormAction from './hooks/useFormAction'
import { covidData } from './datatypes/formDatatypes'

const App = () => {
  const localData = localStorage.getItem('covid-generator') || 'null'
  const formData: covidData = JSON.parse(localData)

  const { submitData, form } = useFormAction(formData)

  return (
    <div>
      <DataForm form={form} onSubmit={submitData} />
    </div>
  )
}

export default App
