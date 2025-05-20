import { useCreateWorkspace } from '@/hooks/query/workspace/mutation';
import { FaCirclePlus } from 'react-icons/fa6';

interface AddWorkspaceProps {
  folderId: string;
}

const AddWorkspace = ({ folderId }: AddWorkspaceProps) => {
  const { mutate: createWorkspace } = useCreateWorkspace(folderId);
  const handleCreateWorkspace = () => {
    createWorkspace(folderId);
  };

  return (
    <div
      onClick={handleCreateWorkspace}
      className="group cursor-pointer flex gap-4 items-center hover:bg-primary-100 rounded-md py-1 transition ease-in-out duration-100 h-10 flex-none"
    >
      <button>
        <FaCirclePlus
          size={28}
          className="cursor-pointer text-primary-600  rounded-full transition ease-in-out duration-100 group-hover:scale-105 group-hover:shadow-sm relative left-1 active:scale-110"
        />
      </button>
      <div className={` text-primary-800 text-sm`}>학습 공간 추가하기</div>
    </div>
  );
};

export default AddWorkspace;
