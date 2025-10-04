import Flatpickr from "react-flatpickr";
import { type FC, useState } from "react";
import "flatpickr/dist/themes/material_blue.css";

type TimePickerProps = {
    label: string;
    name: string;
    value: any;
    onChange: any;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    icon?: string;
};

const TimePicker: FC<TimePickerProps> = ({
    label,
    value,
    name,
    onChange,
    error,
    required = false,
    disabled = false,
    placeholder = " ",
    icon
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const labelFloats = isFocused || (value && value.length > 0);

    return (
        <div className="relative w-full mb-2">
            <label
                htmlFor={name}
                className={`
          absolute left-4 z-10 origin-[0]
          transition-all duration-200
          ${labelFloats
                        ? "top-1.5 text-sm text-blue-600"
                        : "top-1.2 text-base text-gray-400"}
          ${error ? "text-red-500" : ""}
          ${disabled ? "text-gray-400" : ""}
          pointer-events-none
        `}
            >
                {icon && <i className={`${icon} text-md text-gray-400 mr-1`} aria-hidden="true" />}
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <Flatpickr
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "h:i:S K",
                    time_24hr: false,
                    enableSeconds: true,
                }}
                onOpen={() => setIsFocused(true)}
                onClose={() => setIsFocused(false)}
                className={`
          peer block w-full appearance-none rounded-md border
          bg-white px-3 pt-5 pb-1.5 text-sm
          text-gray-900 placeholder-transparent transition-all
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
        `}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default TimePicker;