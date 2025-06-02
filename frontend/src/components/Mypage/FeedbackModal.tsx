import { useState } from "react"
import emailjs, { send } from '@emailjs/browser'
import { useToastStore } from "@/stores/toastStore"
import Modal from "../common/Modal/Modal"
import { Button } from "../common/Button/Button"

interface FeedbackModalProps {
  username: string | null;
  onClose: () => void;
}

const FeedbackModal = ({ username, onClose }: FeedbackModalProps ) => {
  const addToast = useToastStore((state) => state.addToast)
  const [message, setMessage] = useState('')
  const date = new Date()
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          date: formattedDate,
          userName: username,
          message: message
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      onClose()
      addToast('피드백이 성공적으로 전송되었습니다. 의견 남겨주셔서 감사합니다!', 3, 'default')
    } catch (error) {
      console.error('이메일 전송 실패: ', error)
      addToast('피드백 전송에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <Modal isOpen={true} close={onClose} size="lg" color="blue">
      <form className="flex flex-col w-full items-center justify-start">
        <div className="flex justify-center font-semibold text-xl mt-2 mb-2">서비스 의견 남기기</div>
        <textarea
          className="w-full h-50 border p-4 rounded mt-2 mb-2 resize-none"
          placeholder="서비스 이용 중 느낀 점이나 개선점을 자유롭게 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
        />
        <div className="text-xs text-gray-500 w-full text-right">
          {message.length} / 300자
        </div>
        <Button size="sm" className="mt-2" onClick={sendEmail}>
          피드백 전송
        </Button>
      </form>
    </Modal>
  )
}

export default FeedbackModal