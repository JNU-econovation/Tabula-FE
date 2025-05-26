import { StatsData } from '@/api/mypage'
import { COLOR_PALETTE } from '@/constants/color'
import { useGetMypage } from '@/hooks/query/mypage/query'
import { useState } from 'react'
import Calendar from 'react-calendar'
import { Value } from 'react-calendar/dist/esm/shared/types.js'

const StudyStats = () => {
  const [value, setValue] = useState(new Date())
  const year = value.getFullYear()
  const month = value.getMonth() + 1
  const levels = [0, 1, 2, 3]

  const handleChange = (
    nextValue: Value,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (nextValue instanceof Date) {
      setValue(nextValue)
    } else if (Array.isArray(nextValue) && nextValue[0] instanceof Date) {
      setValue(nextValue[0])
    }
  }

  return (
    <div className='flex flex-col gap-1 mt-4 rounded-xl border border-gray-200 shadow-md p-4 w-fit'>
      <Calendar
        value={value}
        onChange={handleChange}
        formatDay={(locale, date) => date.toLocaleDateString('en', { day: 'numeric' })}
        showNeighboringMonth={false}
        minDetail="month"
        maxDetail="month"
        tileDisabled={({ date }) => date > new Date()}
        selectRange={false}
        prev2Label={null}
        next2Label={null}
        className='calendar-custom'
      />
        </div>
  )
}

export default StudyStats