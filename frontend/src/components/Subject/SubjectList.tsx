"use client"

import SubjectFolder from "./SubjectFolder"
import { FolderProps, useGetFolderList } from "@/hooks/query/useGetFolderList"

const SubjectList = () => {
  const { data, isLoading, error } = useGetFolderList()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading folders.</div>

  return (
    <div className="grid grid-cols-5 gap-4 cursor-pointer">
      <SubjectFolder isAddCard />
      {data?.map((subject: FolderProps) => (
        <SubjectFolder key={subject.folderId} title={subject.folderName} colorIndex={subject.folderColor} folderId={subject.folderId} />
      ))}
    </div>
  )
}

export default SubjectList
