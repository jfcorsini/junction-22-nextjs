import { Mock, mockData } from "./mock";

const warning = "#D9D9AC"
const danger = "#C5947C"

// <span style="color:blue">
const colorValue = (value: number, dangerMin: number | null, warningMin: number | null, warningMax: number, dangerMax:number) => {
  let color="white";
  if (dangerMin && value <= dangerMin || value >= dangerMax) {
    color = danger;
  } else if ((warningMin && value < warningMin) || value > warningMax) {
    color = warning;
  }

  return `<span style="color:${color}">${value}</span>`;
}

export const getDailyText = (mock: Mock, dayAddition: number) => {
  const formattedDate = new Date(mock.date)
  const firstDate = new Date(mockData[0].date)
  const weekends = Math.floor((dayAddition) / 5)
  formattedDate.setDate(firstDate.getDate() + dayAddition + weekends*2);
  const result = `Date: ${formattedDate.toLocaleDateString()}:
  - Sleep: ${colorValue(mock.value.sleep, 3, 5, 11, 13)} hours
  - Heart Rate Variability: ${colorValue(mock.value.hrv, 10, 28.5, 103.75, 122.5)} ms
  - Temperature: ${colorValue(mock.value.temp, 35, 35.5, 38, 40)} °C
  - Activity: ${colorValue(mock.value.activity, 5, 10, 120, 180)} min
  - Respiratory Rate: ${colorValue(mock.value.respiratory, 10, 12, 22, 24)} breaths per minute
  - Work hours logged: ${colorValue(mock.value.workHours, null, null, 10, 12)} hours
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
