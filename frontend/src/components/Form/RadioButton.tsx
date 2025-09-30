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
    <div className="mt-1 mb-3 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
            {label && (
                <label className="text-md font-medium text-gray-700 mb-2 lg:mb-0 lg:whitespace-nowrap">
                    {label}
                    {required && <span className="text-red-600 ml-1">*</span>}
                </label>
            )}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {options.map((option) => {
                    const isSelected = value === option.value;
                    return (
                        <label
                            key={option.value}
                            htmlFor={`${name}-${option.value}`}
                            className={`relative flex items-center justify-center px-4 py-2 rounded-full border transition-all duration-300
                            ${isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                }
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}
                        `}
                        >
                            <input
                                id={`${name}-${option.value}`}
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={isSelected}
                                onChange={onChange}
                                onBlur={onBlur}
                                disabled={disabled}
                                required={required}
                                className="absolute opacity-0 w-0 h-0"
                            />
                            <div className="flex items-center space-x-2 text-base font-medium">
                                <i className={`${option.icon} text-lg`} />
                                <span>{option.label}</span>
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
);

export default RadioButtonGroup;