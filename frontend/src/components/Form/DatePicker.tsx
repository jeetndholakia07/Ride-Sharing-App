import Flatpickr from "react-flatpickr";
import { type FC } from "react";

type DatePickerProps = {
    label: string;
    name: string;
    value: any;
    onChange: any;
    dateFormat: string;
    error?: any;
    required?: boolean;
    minDate?: any;
    disabled?: boolean;
    placeholder?: any;
}

const DatePicker: FC<DatePickerProps> = ({ label, value, name, onChange, dateFormat, error, minDate,
    required = false, disabled = false, placeholder = "" }) => {
    return (
        <div className="mb-2 flex flex-col items-start justify-start">
            {label && (
                <div className="flex items-center">
                    <label className="mb-1 block text-md font-medium text-gray-700">
                        {label}
                    </label>
                    {required && (
                        <i className="text-red-600 font-bold text-sm">*</i>
                    )}
                </div>
            )}
            <Flatpickr
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                options={{
                    dateFormat: dateFormat,
                    minDate: minDate,
                    disable: [
                        (date) => date < minDate,
                    ],
                }}

                className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-md disabled:bg-blue-50
                 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default DatePicker;