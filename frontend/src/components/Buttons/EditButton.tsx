import React from 'react';

type EditButtonProps = {
  isEditing: boolean;
  onToggle: () => void;
  onCancel?: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ isEditing, onToggle, onCancel }) => {
  const handleClick = () => {
    onToggle();
    if (isEditing && onCancel) {
      onCancel();
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium
        transition-colors duration-200 shadow-sm hover:cursor-pointer mb-2
        ${isEditing
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}
      `}
    >
      <i className={`bi ${isEditing ? 'bi-x-circle' : 'bi-pencil'} text-lg`}></i>
      <span className="hidden sm:inline">
        {isEditing ? 'Cancel' : 'Edit'}
      </span>
    </button>
  );
};

export default EditButton;