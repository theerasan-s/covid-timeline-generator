import { useState, useCallback } from 'react'

import { useForm } from 'antd/lib/form/Form'
import { covidData, action, timeline } from '../datatypes/formDatatypes'

export default function useFormAction(covidData: covidData) {
  const [form] = useForm()
  const [generatedTimeline, setTimeline] = useState(covidData)

  const submitData = () => {
    const submittedForm = form.getFieldsValue([
      'gender',
      'age',
      'job',
      'timeline',
      'description',
    ])

    const timeline: moment.Moment = submittedForm.timeline
    const date = timeline.format('DD/MM/YYYY')
    const time = timeline.format('HH:mm')

    const age =
      typeof submittedForm.age == 'undefined'
        ? undefined
        : submittedForm.age.trim().length === 0
        ? undefined
        : submittedForm.age

    const job =
      typeof submittedForm.job == 'undefined'
        ? undefined
        : submittedForm.job.trim().length === 0
        ? undefined
        : submittedForm.job

    if (generatedTimeline === null) {
      const timeline = {
        date: date,
        action: [{ time: time, event: [submittedForm.description] }],
      }

      const newData = {
        gender: submittedForm.gender,
        age: age,
        job: job,
        timeline: [timeline],
      }

      localStorage.setItem('covid-generator', JSON.stringify(newData))
      setTimeline(newData)
      return form.resetFields()
    }

    const timelineIndex = generatedTimeline.timeline.findIndex(
      (timeline) => timeline.date === date
    )

    // date not found
    if (timelineIndex < 0) {
      const timeline = {
        date: date,
        action: [{ time: time, event: [submittedForm.description] }],
      }
      const newTimeline = [...generatedTimeline.timeline, timeline]
      newTimeline.sort((timeline1, timeline2) => {
        const splitDate1 = timeline1.date.split('/')
        const splitDate2 = timeline2.date.split('/')
        const date1 = new Date(
          `${splitDate1[1]}/${splitDate1[0]}/${splitDate1[2]}`
        )
        const date2 = new Date(
          `${splitDate2[1]}/${splitDate2[0]}/${splitDate2[2]}`
        )
        if (date1 > date2) {
          return 1
        }
        return -1
      })

      const newData = {
        gender: submittedForm.gender,
        age: age,
        job: job,
        timeline: newTimeline,
      }

      localStorage.setItem('covid-generator', JSON.stringify(newData))
      setTimeline(newData)
      return form.resetFields()
    }

    const foundDate = generatedTimeline.timeline[timelineIndex]
    const foundActionIndex = foundDate.action.findIndex(
      (action) => action.time === time
    )
    // time not found

    if (foundActionIndex < 0) {
      const newActionObject: action = {
        time: time,
        event: [submittedForm.description],
      }

      const newTimelineObject: timeline = {
        date: date,
        action: [...foundDate.action, newActionObject],
      }

      newTimelineObject.action.sort((action1, action2) => {
        if (action1.time > action2.time) {
          return 1
        }
        return -1
      })

      const timeline = generatedTimeline.timeline
      timeline[timelineIndex] = newTimelineObject

      const newData = {
        gender: submittedForm.gender,
        age: age,
        job: job,
        timeline: timeline,
      }

      localStorage.setItem('covid-generator', JSON.stringify(newData))
      setTimeline(newData)
      return form.resetFields()
    }

    // found time and date
    foundDate.action[foundActionIndex].event.push(submittedForm.description)
    const newTimelineList = generatedTimeline.timeline
    newTimelineList[timelineIndex] = foundDate

    const newData = {
      gender: submittedForm.gender,
      age: age,
      job: job,
      timeline: newTimelineList,
    }

    localStorage.setItem('covid-generator', JSON.stringify(newData))

    setTimeline(newData)
    return form.resetFields()
  }

  const onDelete = (timelineDate: string, time: string) => () => {
    const newTimeline = [...generatedTimeline.timeline]
    const newData = { ...generatedTimeline }

    const dateIndex = generatedTimeline.timeline.findIndex(
      (timeline) => timeline.date === timelineDate
    )
    const updatedAction = generatedTimeline.timeline[dateIndex].action.filter(
      (action) => action.time !== time
    )

    if (updatedAction.length === 0) {
      newTimeline.splice(dateIndex, 1)
    } else {
      const newTimelineObject: timeline = {
        date: generatedTimeline.timeline[dateIndex].date,
        action: updatedAction,
      }

      newTimeline[dateIndex] = newTimelineObject
    }

    newData.timeline = newTimeline
    return setTimeline(newData)
  }

  return { form, generatedTimeline, submitData, onDelete }
}
