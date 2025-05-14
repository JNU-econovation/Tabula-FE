import { Button } from "@/components/common/Button/Button";
import WaveBackground from "@/components/Home/WaveBackground";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] px-4 text-center">
      <div className="text-4xl font-semibold text-gray-900 z-10 transform -translate-y-13">
        <div className="text-4xl font-semibold">백지에서 시작하는 진정한 학습,</div>
        <div className="text-4xl font-semibold mt-4 mb-6">TABULA와 함께하세요!</div>
      </div>
      <div className="mt-4 text-gray-500 z-10 transform -translate-y-13">
        틀린 부분과 부족한 부분에 대한 맞춤 피드백을 제공하여 쉽게 백지학습을 할 수 있도록 도와줍니다.
      </div>
      <div className="flex gap-8 mt-8 z-10 transform -translate-y-13">
        <Button colorScheme="gradient" size="md" width={190} className="z-10">로그인</Button>
        <Button variant="line" colorScheme="gray" size="md" width={190} className="z-10">게스트로 시작하기</Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-0">
        <WaveBackground />
      </div>
    </div>
  )
}
