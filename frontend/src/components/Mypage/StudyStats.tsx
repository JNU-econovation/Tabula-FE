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

  const { response, isLoading } = useGetMypage(year, month)

  const studyStatsMap: Record<string, number> = {}
  response?.data.forEach(({ date, cnt }: StatsData) => {
    const dateStr = date.split('T') ? date.split('T')[0] : date
    studyStatsMap[dateStr] = cnt
  })

  const getLocalDateStr = (d: Date) => {
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`
  }

  const tileClassName = ({ date }: { date: Date }) => {
    const today = new Date()
    const dateStr = getLocalDateStr(date)
    const todayStr = getLocalDateStr(today)
    const cnt = studyStatsMap[dateStr]

    const classes = []

    const level = Math.min(cnt, 3)
    classes.push(`study-level-${level}`)

    if (dateStr === todayStr) {
      classes.push('today')
    }

    if (date > today) {
      classes.push ('text-gray-300')
    }

    return classes.join(' ')
  }

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
    <div>
      {isLoading ? (
        <div>로딩중 ...</div>
      ) : (
        <div className='flex flex-col gap-1 mt-4 rounded-xl border border-gray-200 shadow-md p-4 w-fit'>
          <Calendar
            value={value}
            onChange={handleChange}
            formatDay={(locale, date) => date.toLocaleDateString('en', { day: 'numeric' })}
            showNeighboringMonth={false}
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month"
            tileDisabled={({ date }) => date > new Date()}
            tileClassName={tileClassName}
            selectRange={false}
            prev2Label={null}
            next2Label={null}
            className='calendar-custom'
          />
          <div className='flex items-center mt-4'>
            {levels.map((level) =>
              level === 3 ? (
                <div key={level} className='flex items-center'>
                  <div
                    className={`flex w-8 h-4 justify-center items-center text-sm`}
                    style={{ backgroundColor: COLOR_PALETTE.levelColors[level] }}
                  >
                    3+
                  </div>
                </div>
              ) : (
                <div key={level}
                  className={`w-8 h-4 flex items-center justify-center text-sm`}
                  style={{ backgroundColor: COLOR_PALETTE.levelColors[level] }}
                >
                  {level}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyStats