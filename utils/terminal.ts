import { Mock } from "./mock";

export const getDailyText = (mock: Mock) => {
  const formattedDate = new Date(mock.date).toLocaleDateString()
  return `Date: ${formattedDate}:
  - Sleep: ${mock.value.sleep} hours
  - Heart Rate Variability: ${mock.value.hrv} ms
  - Temperature: ${mock.value.temp} °C
  - Activity: ${mock.value.activity} min
  - Respiratory Rate: ${mock.value.respiratory} breaths per minute
  - Work hours logged: ${mock.value.workHours} hours
  `
}