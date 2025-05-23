interface UserPanelProps {
  title: string;
  fileTitle: string;
}

const UserPanel = ({ title, fileTitle }: UserPanelProps) => {
  return (
    <div className="flex flex-col w-50 h-40 bg-gray-200 p-4 rounded-2xl border border-gray-300 gap-4">
      <div className="font-semibold ml-2 text-gray-800">{title}</div>
      <div className="rounded-xl bg-white ml-4 mr-1 px-6 py-8 text-gray-600 shadow-md">
        {fileTitle}
      </div>
    </div>
  );
};

export default UserPanel;
