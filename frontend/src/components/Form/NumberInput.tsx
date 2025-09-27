import { type FC } from 'react';

type NumberInputProps = {
    label: string;
    value: number;
    name: string;
    placeholder: string;
    required?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    min?: number;
    error?: any;
    disabled?:boolean;
}

const NumberInput: FC<NumberInputProps> = ({ label, value, name, onChange, placeholder, onBlur, min, required=false, error, disabled=false }) => (
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
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
            min={min}
            disabled={disabled}
            className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-md text-gray-800 
            disabled:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default NumberInput;