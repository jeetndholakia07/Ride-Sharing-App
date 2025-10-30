import { type FC } from "react";
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
    const { t } = useTranslation();

    return (
        <div className="relative w-full mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">
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
                className={`w-full border border-gray-300 hover:cursor-pointer rounded-md text-sm pl-1 py-2 focus:outline-none
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