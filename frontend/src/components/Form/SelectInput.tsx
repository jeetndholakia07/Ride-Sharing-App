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
    icon?: string;
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
    icon,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelFloats = isFocused || value;

    return (
        <div className="relative w-full mb-2">
            {/* Floating Label */}
            <label
                htmlFor={name}
                className={`
          absolute left-3 z-10 origin-[0] transition-all duration-200
          ${labelFloats
                        ? "top-1.5 text-sm text-gray-400"
                        : "top-4 text-base text-gray-400"}
          ${error ? "text-red-500" : ""}
          ${disabled ? "text-gray-400" : ""}
          pointer-events-none
        `}
            >
                {icon && (
                    <i
                        className={`${icon} text-md text-gray-400 mr-1`}
                        aria-hidden="true"
                    />
                )}
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
                disabled={disabled}
                className={`
          block w-full appearance-none rounded-md border
          bg-white px-3 pt-5 pb-1.5 text-sm
          text-gray-900 hover:cursor-pointer
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
        `}
            >
                {/* Optional placeholder */}
                <option value="" disabled hidden>
                    {label}
                </option>

                {values.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default SelectInput;
