import { useState } from 'react'
import Calendar from 'react-calendar'


const StudyStats = () => {
  const [value, setValue] = useState(new Date())

  return (
    <div>
      <Calendar />
    </div>
  )
}

export default StudyStats