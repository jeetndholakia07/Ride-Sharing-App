import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    values: SelectOption[];
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
    const { t } = useTranslation();

    const labelFloats = isFocused || (value !== "" && value !== null);

    return (
        <div className="relative w-full mb-5">
            <label
                htmlFor={name}
                className={`absolute left-3 z-10 bg-white px-1 transition-all duration-200
                    ${labelFloats ? "top-1 text-xs text-gray-700" : "top-4 text-sm text-gray-500"}
                    ${error ? "text-red-500" : ""}
                    ${disabled ? "text-gray-400" : ""}
                `}
            >
                {icon && <i className={`${icon} text-gray-400 mr-1`} aria-hidden="true" />}
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
                className={`block w-full rounded-md border bg-white px-3 
                    ${labelFloats ? "pt-5 pb-2" : "pt-5 pb-2"} 
                    text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:border-gray-400"}
                    transition-all hover:cursor-pointer
                `}
            >
                {values.map((item) => (
                    <option key={item.value} value={item.value}>
                        {t(item.label)}
                    </option>
                ))}
            </select>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default SelectInput;