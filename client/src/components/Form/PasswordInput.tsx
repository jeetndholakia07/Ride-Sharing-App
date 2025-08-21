import { type FC } from "react";

type passwordProps = {
    label: string;
    value: string;
    placeholder: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    required: boolean;
    error: any;
}

const PasswordInput: FC<passwordProps> = ({ label, value, placeholder, name, onChange, onBlur, required, error }) => {
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
            <input
                type="password"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white text-md text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
export default PasswordInput;