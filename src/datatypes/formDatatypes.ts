export interface action {
  time: string
  event: string[]
}

export interface timeline {
  date: string
  action: action[]
}

export interface covidData {
  age: string
  gender: string
  job: string
  timeline: timeline[]
}
