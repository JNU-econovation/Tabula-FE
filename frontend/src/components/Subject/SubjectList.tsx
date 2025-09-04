"use client"

import Link from "next/link"
import SubjectFolder from "./SubjectFolder"
import { FolderProps, useGetFolderList } from "@/hooks/query/useGetFolderList"

const SubjectList = () => {
  const { data, isLoading, error } = useGetFolderList()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading folders.</div>

  return (
    <div className="grid justify-items-center xl:justify-items-start grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 cursor-pointer">
      <SubjectFolder isAddCard />
      {data?.response?.map((subject: FolderProps) => (
        <SubjectFolder key={subject.folderId} title={subject.folderName} colorIndex={subject.colorIndex} folderId={subject.folderId} />
      ))}
    </div>
  )
}

export default SubjectList
