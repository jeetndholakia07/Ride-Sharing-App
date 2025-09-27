import { type FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type FileUploadProps = {
    label: string;
    name: string;
    onChange: (file: File | null) => void;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    value?: File | null;
    setFieldTouched?: (field: string, touched: boolean, shouldValidate?: boolean) => void;
};

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

const FileUpload: FC<FileUploadProps> = ({
    label,
    name,
    onChange,
    error,
    required = false,
    disabled = false,
    value,
    setFieldTouched
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const { t } = useTranslation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (setFieldTouched) {
            // mark as touched and validate
            setFieldTouched(name, true, true);
        }

        if (!file) {
            onChange(null);
            setLocalError(null);
            return;
        }

        const isValidType = ALLOWED_FILE_TYPES.includes(file.type);
        const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

        if (!isValidType) {
            setLocalError(t("fileFormatConstraint"));
            onChange(null);
            return;
        }

        if (!isValidSize) {
            setLocalError(t("fileSizeConstraint"));
            onChange(null);
            return;
        }

        setLocalError(null);
        onChange(file);
    };

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        if (setFieldTouched) {
            setFieldTouched(name, true, true);
        }
        onChange(null);
        setLocalError(null);
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
                   hover:cursor-pointer
                   focus:outline-none"
                accept=".jpg,.jpeg,.png"
                aria-describedby={localError || error ? `${name}-error` : undefined}
            />

            {value && (
                <div className="mt-1 text-gray-600 text-sm flex items-center gap-2">
                    <span>{t("selectedFile")} {value.name}</span>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-red-500 hover:cursor-pointer underline hover:text-red-700 text-sm"
                    >
                        {t("remove")}
                    </button>
                </div>
            )}

            {(localError || error) && (
                <p id={`${name}-error`} className="text-red-500 text-sm mt-1">
                    {localError || error}
                </p>
            )}
        </div>
    );
};

export default FileUpload;