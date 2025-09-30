import { type FC, useState } from "react";

type SelectProps = {
    label: string;
    value: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    values: any[];
    name: string;
    required?: boolean;
    error?: any;
    disabled?: boolean;
    icon?: string
};

const SelectInput: FC<SelectProps> = ({
    label,
    value,
    onChange,
    values,
    name,
    required = false,
    error,
    disabled = false,
    icon
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const labelFloats = isFocused || (value !== "" && value !== undefined && value !== null);

    return (
        <div className="relative w-full mb-2">
            <label
                htmlFor={name}
                className={`
          absolute left-2 z-10 origin-[0]
          transition-all duration-200
          ${labelFloats
                        ? "top-1.5 text-sm text-gray-600"
                        : "top-4 text-base text-gray-400"}
          ${error ? "text-red-500" : ""}
          ${disabled ? "text-gray-400" : ""}
          pointer-events-none
          bg-white px-1
        `}
            >
                {icon && <i className={`${icon} text-md text-gray-400 mr-1`} aria-hidden="true" />}
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
          peer block w-full appearance-none rounded-md border
          bg-white px-3 pt-5 pb-1.5 text-sm hover:cursor-pointer
          text-gray-900 placeholder-transparent transition-all
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
        `}
            >
                {values.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default SelectInput;