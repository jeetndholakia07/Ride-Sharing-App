import { type FC } from 'react';

type Option = {
    label: string;
    value: string;
};

type RadioButtonGroupProps = {
    label: string;
    name: string;
    options: Option[];
    value: string;
    required?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    error?: string | null;
    disabled?: boolean;
};

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
    label,
    name,
    options,
    value,
    required = false,
    onChange,
    onBlur,
    error,
    disabled = false,
}) => (
    <div className="mb-4 flex flex-col items-start justify-start w-full">
        {label && (
            <div className="flex items-center mb-2">
                <label className="block text-md font-medium text-gray-700">{label}</label>
                {required && <i className="text-red-600 font-bold text-sm ml-1">*</i>}
            </div>
        )}

        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <label
                    key={option.value}
                    htmlFor={`${name}-${option.value}`}
                    className={`flex items-center cursor-pointer select-none ${disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-800'
                        }`}
                >
                    <input
                        id={`${name}-${option.value}`}
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required={required}
                    />
                    {option.label}
                </label>
            ))}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default RadioButtonGroup;