import { type FC } from "react";

type checkboxProps = {
    value: boolean;
    handleChange: () => void;
    label: any;
}

const Checkbox: FC<checkboxProps> = ({ value, handleChange, label }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 max-w-2xl">
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={handleChange}
                    className={`form-checkbox h-5 w-5 border-gray-300 rounded`}
                />
                <label className="text-md font-medium text-gray-700">
                    {label}
                </label>
            </div>
        </div>
    )
}
export default Checkbox;