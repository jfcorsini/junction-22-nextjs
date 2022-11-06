import { Mock, mockData } from "./mock";

// <span style="color:blue">
export const getDailyText = (mock: Mock, dayAddition: number) => {
  const formattedDate = new Date(mock.date)
  const firstDate = new Date(mockData[0].date)
  const weekends = Math.floor((dayAddition) / 5)
  formattedDate.setDate(firstDate.getDate() + dayAddition + weekends*2);
  const result = `Date: ${formattedDate.toLocaleDateString()}:
  - Sleep: ${mock.value.sleep} hours
  - Heart Rate Variability: ${mock.value.hrv} ms
  - Temperature: ${mock.value.temp} °C
  - Activity: ${mock.value.activity} min
  - Respiratory Rate: ${mock.value.respiratory} breaths per minute
  - Work hours logged: ${mock.value.workHours} hours
  `

  if (mock.action) {
    return result + `
    ....................
    Flare detected.
    Action: ${mock.action}
    ....................
    `
  }

  return result
}
