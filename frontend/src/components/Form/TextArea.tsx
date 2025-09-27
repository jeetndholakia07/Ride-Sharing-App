import { type FC } from 'react';

type TextAreaProps = {
    label: string;
    placeholder: string;
    value: string;
    name: string;
    required?: boolean;
    rows: number;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
    error?: any;
    disabled?: boolean;
}

const TextArea: FC<TextAreaProps> = ({ label, value, onChange, placeholder, rows = 4, required=false, onBlur, name, error, disabled = false }) => (
    <div className="mb-2 flex flex-col items-start justify-start">
        {label && (
            <div className="flex items-center">
                <label className="mb-1 block text-md font-medium text-gray-700">
                    {label}
                </label>
                {required && (
                    <i className="text-red-600 font-bold text-sm">*</i>
                )}
            </div>
        )}
        <textarea
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
            disabled={disabled}
            className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default TextArea;