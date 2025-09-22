import { type FC } from 'react';

type Option = {
    label: string;
    value: string;
    icon: string;
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
    <div className="mb-4 flex flex-col w-full">
        {label && (
            <div className="flex md:flex-row flex-col items-center mb-2">
                <label className="block text-md font-medium text-gray-700">
                    {label}
                </label>
                {required && <i className="text-red-600 font-bold text-sm ml-1">*</i>}
            </div>
        )}

        <div className="flex md:flex-row flex-col items-center space-x-8">
            {options.map((option) => (
                <label
                    key={option.value}
                    htmlFor={`${name}-${option.value}`}
                    className={`flex items-center cursor-pointer select-none ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800 hover:text-blue-600'}`}
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
                        className="h-5 w-5 mr-2 text-blue-600 border-gray-300 transition duration-300"
                        required={required}
                    />
                    <i className={`${option.icon} text-lg`} />
                    <span className="text-md font-semibold">{option.label}</span>
                </label>
            ))}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default RadioButtonGroup;