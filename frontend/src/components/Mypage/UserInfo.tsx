import { FaUserCircle } from "react-icons/fa"

interface UserInfoProps {
  username: string | null
}

const UserInfo = ({ username }: UserInfoProps) => {
  return (
    <div className="flex relative items-center p-4">
      <div className="mr-8">
        <FaUserCircle className="text-5xl text-gray-400 rounded-full" />
      </div>
      <div className="text-xl">{username}님</div>
    </div>
  )
}

export default UserInfo