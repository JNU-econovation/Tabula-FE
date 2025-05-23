import Upload from '@/components/common/Upload/Upload'
import useUploadFile from '@/hooks/common/useUploadFile'
import { useLearningResultUpload } from '@/hooks/workspace/useLearningResultUpload'
import { useParams } from 'next/navigation'
import React, { useRef } from 'react'
import SelectedFileItem from '../LearningFileUpload/SelectedFileItem'
import { Button } from '@/components/common/Button/Button'
import { HiOutlinePaperAirplane } from 'react-icons/hi'
import { uploadLearningFile } from '@/api/workspace'
import UploadedImagePreview from './UploadImagePreview'

const LearningResultUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { folderId, spaceId } = useParams()
  const { selectedFile, imageFiles, handleFile, deleteFile, deleteImageFile, processFile } = useUploadFile('multi-type')

  const {
    uploadLearningResultFile
  } = useLearningResultUpload(folderId as string, spaceId as string, selectedFile || imageFiles, () => alert('업로드 완료'))

  const isImageMode = imageFiles.length > 0
  const isPdfMode = selectedFile && !isImageMode
    
  return (
    <div className={`relative border rounded-xl border-gray-300 bg-white shadow-lg w-full mx-10 sm:mx-20 md:mx-30 xl:mx-40 ${isPdfMode ? "px-4" : "pl-4 pr-4 pb-4 pt-2"}`}>
      <div className={`flex relative items-center ${isPdfMode ? 'mb-3 ml-2' : 'mb-3 ml-2`'}`}>
        {imageFiles.length > 0 && (
          <UploadedImagePreview imageFiles={imageFiles} deleteImageFile={deleteImageFile} />
        )}
        {(selectedFile || imageFiles.length > 0) && (
          <div className={`absolute right-0 ${isPdfMode ? 'top-8' : ''}`}>
            <Button colorScheme="purple" size="icon" icon={<HiOutlinePaperAirplane className='rotate-45 -translate-y-0.5' />} />
          </div>
        )}
      </div>
      <div className='z-20'>
        {selectedFile ? (
          <SelectedFileItem selectedFile={selectedFile} deleteFile={deleteFile} />
        ) : <Upload height='xs' width='full' handleFile={handleFile} processFile={processFile} mode='multi-type' selectedFile={selectedFile} imageFiles={imageFiles} />}
      </div>
    </div>
  )
}

export default LearningResultUpload