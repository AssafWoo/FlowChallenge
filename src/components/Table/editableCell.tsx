import React, { useState } from "react";
import { updatePost, updateUser } from "../../api";

interface EditableCellProps {
  initialValue: string;
  postId?: number;
  itemId: number;
  field: string;
  dataType: "post" | "user";
  onEditSuccess: () => void;
}

// Future - design the editable input field in a different way.
const EditableCell: React.FC<EditableCellProps> = ({
  initialValue,
  itemId,
  field,
  dataType,
  onEditSuccess,
}) => {
  const [value, setValue] = useState(initialValue);

  const onEdit = async () => {
    if (value !== initialValue) {
      try {
        const updateData = dataType === "post" ? updatePost : updateUser;
        await updateData(itemId, { [field]: value });
        onEditSuccess();
      } catch (error) {
        console.error(`Failed to edit ${dataType}:`, error);
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onEdit}
    />
  );
};

export default EditableCell;
