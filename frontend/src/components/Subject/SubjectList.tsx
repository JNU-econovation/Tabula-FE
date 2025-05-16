"use client"

import SubjectFolder from "./SubjectFolder"

const SubjectList = () => {

  const handleAddSubject = () => {
    console.log('새 주제 추가')
  }
  return (
    <div className="grid grid-cols-5 gap-4 cursor-pointer">
      <SubjectFolder isAddCard onClick={handleAddSubject} />
      {subjects.map((subject, index) => (
        <SubjectFolder key={index} title={subject.title} colorIndex={subject.colorIndex} />
      ))}
    </div>
  )
}

export default SubjectList

const subjects = [
  { title: "CS", colorIndex: 0 },
  { title: "프론트엔드", colorIndex: 1 },
  { title: "CS", colorIndex: 2 },
  { title: "프론트엔드", colorIndex: 3 },
  { title: "CS", colorIndex: 4 },
  { title: "프론트엔드", colorIndex: 5 },
  { title: "CS", colorIndex: 0 },
];
