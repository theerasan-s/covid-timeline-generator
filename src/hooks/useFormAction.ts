import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import { covidData, action, timeline } from '../datatypes/formDatatypes'

export default function useFormAction(covidData: covidData) {
  const [form] = useForm()

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
    const test = new Date(time)
    console.log(test)

    if (covidData === null) {
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
      return localStorage.setItem('covid-generator', JSON.stringify(newData))
    }

    const timelineIndex = covidData.timeline.findIndex(
      (timeline) => timeline.date === date
    )

    // date not found
    if (timelineIndex < 0) {
      console.log('prove')
      const timeline = {
        date: date,
        action: [{ time: time, event: [submitedForm.description] }],
      }

      console.log('coviddata', covidData)

      const newTimeline = [...covidData.timeline, timeline]
      console.log(newTimeline)

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
      covidData = newData
      return localStorage.setItem('covid-generator', JSON.stringify(newData))
    }

    const foundDate = covidData.timeline[timelineIndex]
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

      const timeline = covidData.timeline
      timeline[timelineIndex] = newTimelineObject

      const newData = {
        gender: submitedForm.gender,
        age: submitedForm.age,
        job: submitedForm.job,
        timeline: timeline,
      }
      return localStorage.setItem('covid-generator', JSON.stringify(newData))
    }

    // found time and date

    foundDate.action[foundActionIndex].event.push(submitedForm.description)
    const newTimelineList = covidData.timeline
    newTimelineList[timelineIndex] = foundDate

    const newData = {
      gender: submitedForm.gender,
      age: submitedForm.age,
      job: submitedForm.job,
      timeline: newTimelineList,
    }
    return localStorage.setItem('covid-generator', JSON.stringify(newData))
  }

  return { form, submitData }
}
