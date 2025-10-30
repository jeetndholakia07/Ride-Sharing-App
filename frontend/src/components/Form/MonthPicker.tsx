import Flatpickr from "react-flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import { type FC, useRef, useEffect } from "react";
import "flatpickr/dist/themes/light.css";
import "flatpickr/dist/plugins/monthSelect/style.css";

type MonthPickerProps = {
    name: string;
    value: any;
    onChange: any;
    setIsCalendarOpen: (state: boolean) => void;
    label: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    icon?: string;
};

const MonthPicker: FC<MonthPickerProps> = ({
    name,
    value,
    onChange,
    setIsCalendarOpen,
    label,
    error,
    disabled = false,
    placeholder = " ",
    icon,
}) => {
    const inputRef = useRef<any>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
            try {
                // Safely destroy instance only if it exists
                if (inputRef.current?.flatpickr && typeof inputRef.current.flatpickr.destroy === "function") {
                    inputRef.current.flatpickr.destroy();
                }
            } catch (err) {
                console.warn("Flatpickr destroy skipped:", err);
            }
        };
    }, []);

    const handleChange = (dates: Date[], dateStr: string) => {
        onChange(dates, dateStr);
    };


    return (
        <div className="relative w-full mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">
                {icon && icon} {label}
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
                    disableMobile: true,
                }}
                onOpen={() => {
                    if (!mountedRef.current) return;
                    setIsCalendarOpen(true);
                }}
                onClose={() => {
                    if (!mountedRef.current) return;
                    setIsCalendarOpen(false);
                }}
                className={`block w-full rounded-md border bg-white px-3 pt-5 text-sm text-gray-900 
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