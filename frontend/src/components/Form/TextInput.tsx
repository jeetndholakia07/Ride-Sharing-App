import { type FC } from 'react';

type TextInputProps = {
    label: string;
    placeholder: string;
    name: string;
    value: string;
    required?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    error?: any;
    disabled?: boolean;
}

const TextInput: FC<TextInputProps> = ({ label, value, onChange, placeholder, name, required = false, onBlur, error, disabled = false }) => (
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
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onBlur={onBlur}
            className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-md text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default TextInput;