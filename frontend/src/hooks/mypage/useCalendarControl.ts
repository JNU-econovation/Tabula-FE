import { useState } from "react"

export const useCalendarControl = () => {
  const [activeStartDate, setActiveStartDate] = useState(new Date())

  const isNextMonthAfterToday = () => {
    const nextMonth = new Date(activeStartDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
  
    const today = new Date()
    return (
      nextMonth.getFullYear() > today.getFullYear() ||
      (nextMonth.getFullYear() === today.getFullYear() &&
        nextMonth.getMonth() > today.getMonth())
    )
  }

  return { activeStartDate, setActiveStartDate, isNextMonthAfterToday }

}