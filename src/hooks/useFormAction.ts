import { useState } from 'react'

import { useForm } from 'antd/lib/form/Form'
import { covidData, action, timeline } from '../datatypes/formDatatypes'

export default function useFormAction(covidData: covidData) {
  const [form] = useForm()
  const [generatedTimeline, setTimeline] = useState(covidData)

  const submitData = () => {
    const submitedForm = form.getFieldsValue([
      'gender',
      'age',
      'job',
      'timeline',
      'description',
    ])

    const date = submitedForm.timeline.format('DD/MM/YYYY')
    const time = submitedForm.timeline.format('HH:mm')

    if (generatedTimeline === null) {
      const timeline = {
        date: date,
        action: [{ time: time, event: [submitedForm.description] }],
      }

      const newData = {
        gender: submitedForm.gender,
        age: submitedForm.age,
        job: submitedForm.job,
        timeline: [timeline],
      }
      localStorage.setItem('covid-generator', JSON.stringify(newData))
      return setTimeline(newData)
    }

    const timelineIndex = generatedTimeline.timeline.findIndex(
      (timeline) => timeline.date === date
    )

    // date not found
    if (timelineIndex < 0) {
      const timeline = {
        date: date,
        action: [{ time: time, event: [submitedForm.description] }],
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
        gender: submitedForm.gender,
        age: submitedForm.age,
        job: submitedForm.job,
        timeline: newTimeline,
      }

      localStorage.setItem('covid-generator', JSON.stringify(newData))
      return setTimeline(newData)
    }

    const foundDate = generatedTimeline.timeline[timelineIndex]
    const foundActionIndex = foundDate.action.findIndex(
      (action) => action.time === time
    )

    // time not found

    if (foundActionIndex < 0) {
      const newActionObject: action = {
        time: time,
        event: [submitedForm.description],
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
        gender: submitedForm.gender,
        age: submitedForm.age,
        job: submitedForm.job,
        timeline: timeline,
      }

      localStorage.setItem('covid-generator', JSON.stringify(newData))
      return setTimeline(newData)
    }

    // found time and date

    foundDate.action[foundActionIndex].event.push(submitedForm.description)
    const newTimelineList = generatedTimeline.timeline
    newTimelineList[timelineIndex] = foundDate

    const newData = {
      gender: submitedForm.gender,
      age: submitedForm.age,
      job: submitedForm.job,
      timeline: newTimelineList,
    }
    localStorage.setItem('covid-generator', JSON.stringify(newData))
    return setTimeline(newData)
  }

  return { form, generatedTimeline, submitData }
}
