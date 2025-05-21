import { useUpdateWorkspaceName } from '@/hooks/query/workspace/mutation';
import { useState } from 'react';

export const useEditSpaceName = (spaceName: string, spaceId: string) => {
  const { mutate: updateWorkspaceMutation } = useUpdateWorkspaceName();
  const [isEditing, setIsEditing] = useState(false);
  const [spaceNameValue, setSpaceNameValue] = useState(spaceName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceNameValue(e.target.value);
  };

  const resetInputValue = () => {
    setSpaceNameValue(spaceName);
  };

  const updateWorkspaceName = async () => {
    if (spaceNameValue.length === 0) {
      setIsEditing(false);
      return;
    }
    if (spaceNameValue === spaceName) {
      setIsEditing(false);
      return;
    }
    if (spaceNameValue.length > 50) {
      alert('폴더 이름이 너무 길어요. 50자 이하로 입력해주세요.');
      return;
    }

    await updateWorkspaceMutation({
      spaceId,
      newSpaceName: spaceNameValue,
    });
    setIsEditing(false);
  };

  const isEditingToggle = () => {
    setIsEditing(!isEditing);
  };

  return {
    spaceNameValue,
    updateWorkspaceName,
    isEditingToggle,
    handleInputChange,
    resetInputValue,
    isEditing,
  };
};
