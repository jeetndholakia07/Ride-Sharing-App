import React, { useRef, useState } from 'react';

type ProfileImageEditorProps = {
    image: string | null;
    onImageChange: (file: File) => void;
    alignment?: 'left' | 'center' | 'right';
    heading?: string;
};

const alignmentMap = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
};

const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
    image,
    onImageChange,
    alignment = 'center',
    heading
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setSelectedFile(file);
        }
    };

    const handleCancel = () => {
        clearSelection();
    };

    const clearSelection = () => {
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
        }
    };

    const handleSave = () => {
        if (selectedFile) {
            onImageChange(selectedFile);
            setPreview(null);
            setSelectedFile(null);
        }
    };

    return (
        <div className={`flex flex-col gap-3 ${alignmentMap[alignment]}`}>
            {heading && (
                <h3 className="text-lg font-semibold text-gray-700">{heading}</h3>
            )}
            {/* Profile image container */}
            <div
                className={`relative w-[5rem] h-[5rem] rounded-full overflow-hidden border border-gray-300 cursor-pointer group`}
                onClick={handleImageClick}
            >
                {/* Image */}
                <img
                    src={preview || image || '/default-avatar.png'}
                    alt="Profile Preview"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* Hover Camera Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-full p-2 shadow-md">
                        <i className="bi bi-camera text-gray-600 text-lg" />
                    </div>
                </div>
            </div>

            {/* Save button */}
            {preview && (
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        className="px-4 py-1 hover:cursor-pointer text-sm rounded bg-green-600 text-white hover:bg-green-700"
                    >
                        <i className="bi bi-check-lg mr-1" />
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-1 text-sm hover:cursor-pointer rounded bg-red-600 text-white-700 hover:bg-red-700"
                    >
                        <i className="bi bi-x-lg mr-1" />
                        Cancel
                    </button>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ProfileImageEditor;