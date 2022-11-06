import { Mock, mockData } from "./mock";

const warning = "#D9D9AC"
const danger = "#C5947C"

// <span style="color:blue">
const getOpenSpan = (value: number, dangerMin: number | null, warningMin: number | null, warningMax: number, dangerMax:number) => {
  let color="white";
  if (dangerMin && value <= dangerMin || value >= dangerMax) {
    color = danger;
  } else if ((warningMin && value < warningMin) || value > warningMax) {
    color = warning;
  }

  return `<span style="color:${color}">`;
}

export const getDailyText = (mock: Mock, dayAddition: number) => {
  const formattedDate = new Date(mock.date)
  const firstDate = new Date(mockData[0].date)
  const weekends = Math.floor((dayAddition) / 5)
  formattedDate.setDate(firstDate.getDate() + dayAddition + weekends*2);
  const result = `Date: ${formattedDate.toLocaleDateString()}:
  - ${getOpenSpan(mock.value.sleep, 3, 5, 11, 13)} Sleep: ${mock.value.sleep} hours</span>
  - ${getOpenSpan(mock.value.hrv, 10, 28.5, 103.75, 122.5)} Heart Rate Variability: ${mock.value.hrv} ms</span>
  - ${getOpenSpan(mock.value.temp, 35, 35.5, 38, 40)} Temperature: ${mock.value.temp} °C</span>
  - ${getOpenSpan(mock.value.activity, 5, 10, 120, 180)} Activity: ${mock.value.activity} min</span>
  - ${getOpenSpan(mock.value.respiratory, 10, 12, 22, 24)} Respiratory Rate: ${mock.value.respiratory} breaths per minute</span>
  - ${getOpenSpan(mock.value.workHours, null, null, 10, 12)} Work hours logged: ${mock.value.workHours} hours</span>
  `

  if (mock.action) {
    return result + `
    <span style="color:${danger}">
    ....................
    Flare detected.
    Action: ${mock.action}
    ....................
    </span>
    `
  }

  return result
}
