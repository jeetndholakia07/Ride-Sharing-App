import Flatpickr from "react-flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import { type FC, useState, useRef, useEffect } from "react";
import "flatpickr/dist/themes/light.css";
import "flatpickr/dist/plugins/monthSelect/style.css";

type MonthPickerProps = {
    label: string;
    name: string;
    value: any;
    onChange: any;
    setIsCalendarOpen: (state: boolean) => void;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    icon?: string;
};

const MonthPicker: FC<MonthPickerProps> = ({
    label,
    name,
    value,
    onChange,
    setIsCalendarOpen,
    error,
    required = false,
    disabled = false,
    placeholder = " ",
    icon,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    const handleChange = (dates: Date[], dateStr: string) => {
        onChange(dates, dateStr);
        setHasValue(dateStr !== "");
    };

    const labelFloats = isFocused || hasValue;

    return (
        <div className="relative w-full mb-5">
            <label
                htmlFor={name}
                className={`absolute left-3 z-10 bg-white px-1 transition-all duration-200
                    ${labelFloats ? "top-1 text-xs text-gray-700" : "top-3.5 text-sm text-gray-500"}
                    ${error ? "text-red-500" : ""}
                    ${disabled ? "text-gray-400" : ""}
                `}
            >
                {icon && <i className={`${icon} text-gray-400 mr-1`} aria-hidden="true" />}
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <Flatpickr
                id={name}
                name={name}
                ref={inputRef}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                options={{
                    plugins: [
                        monthSelectPlugin({
                            shorthand: true,
                            dateFormat: "m-Y",
                            altFormat: "F Y",
                        }),
                    ],
                    dateFormat: "m-Y",
                    allowInput: true,
                }}
                onOpen={() => {
                    setIsFocused(true);
                    setIsCalendarOpen(true);
                }}
                onClose={() => {
                    setIsFocused(false);
                    setIsCalendarOpen(false);
                }}
                className={`block w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:border-gray-400"}
                    transition-all hover:cursor-pointer
                `}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default MonthPicker;