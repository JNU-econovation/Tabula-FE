import { StatsData } from '@/api/mypage'
import { COLOR_PALETTE } from '@/constants/color'
import { useCalendarControl } from '@/hooks/mypage/useCalendarControl'
import { useStudyStats } from '@/hooks/mypage/useStudyStats'
import Calendar from 'react-calendar'

const StudyStats = () => {
  const value = new Date()
  const year = value.getFullYear()
  const month = value.getMonth() + 1
  const levels = [0, 1, 2, 3]
  
  const { studyStatsMap, isLoading } = useStudyStats(year, month)
  const { activeStartDate, setActiveStartDate, isNextMonthAfterToday } = useCalendarControl()

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

  return (
    <div>
      {isLoading ? (
        <div>로딩중 ...</div>
      ) : (
        <div className='flex flex-col gap-1 mt-4 rounded-xl border border-gray-200 shadow-md p-4 w-fit'>
          <Calendar
            value={value}
            formatDay={(locale, date) => date.toLocaleDateString('en', { day: 'numeric' })}
            showNeighboringMonth={false}
            minDetail="month"
            maxDetail="month"
            tileDisabled={({ date }) => date > new Date()}
            tileClassName={tileClassName}
            selectRange={false}
            prev2Label={null}
            next2Label={null}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate!)
            }
            nextLabel={isNextMonthAfterToday() ? null : undefined}
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