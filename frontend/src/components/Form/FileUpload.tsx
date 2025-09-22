import { type FC, useRef } from 'react';

type FileUploadProps = {
    label: string;
    name: string;
    onChange: (file: File | null) => void;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    value?: File | null;
};

const FileUpload: FC<FileUploadProps> = ({
    label,
    name,
    onChange,
    error,
    required = false,
    disabled = false,
    value,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
        } else {
            onChange(null);
        }
    };

    return (
        <div className="mb-2 flex flex-col items-start w-full">
            <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
                {label} {required && <span className="text-red-600">*</span>}
            </label>

            <input
                ref={inputRef}
                type="file"
                id={name}
                name={name}
                onChange={handleFileChange}
                disabled={disabled}
                className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-100 file:text-blue-700
                   hover:file:bg-blue-200
                   focus:outline-none"
                accept="image/*"
            />
            {value && (
                <p className="mt-1 text-gray-600 text-sm">Selected file: {value.name}</p>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FileUpload;
