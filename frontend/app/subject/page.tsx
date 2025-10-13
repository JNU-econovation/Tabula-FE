'use client';
import SubjectList from "@/components/Subject/SubjectList"
import useRedirectGuest from "@/hooks/common/useRedirectGuest"

const page = () => {
  const { loginType } = useRedirectGuest();
  if (loginType == null || loginType === 'guest') return null;

  return (
    <div className="px-2 sm:px-6 md:px-10 lg: px-16 xl:px-24 py-30">
      <SubjectList />
    </div>
  )
}

export default page