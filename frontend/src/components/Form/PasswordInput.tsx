import { useState, type FC } from "react";

type PasswordProps = {
    label: string;
    value: string;
    placeholder: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    required?: boolean;
    error?: any;
    disabled?: boolean;
    icon?: string;
};

const PasswordInput: FC<PasswordProps> = ({
    label,
    value,
    placeholder = " ",
    name,
    onChange,
    onBlur,
    required = false,
    error,
    disabled = false,
    icon
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative w-full mb-2">
            <input
                type={showPassword ? "text" : "password"}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`
                    peer block w-full appearance-none rounded-md border pr-10
                    bg-white px-3 pt-5 pb-1.5 text-sm
                    text-gray-900 placeholder-transparent transition-all
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${error ? 'border-red-500' : 'border-gray-300'}
                    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                `}
            />
            <label
                htmlFor={name}
                className={`
                    absolute left-3 top-1.5 z-10 origin-[0]
                    text-gray-500 text-sm transition-all duration-200
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-500
                    ${error ? 'text-red-500 peer-focus:text-red-500' : ''}
                    ${disabled ? 'text-gray-400' : ''}
                `}
            >
                {icon && <i className={`${icon} text-md text-gray-400 mr-1`} aria-hidden="true" />}
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                tabIndex={-1}
            >
                <i className={`bi ${showPassword ? "bi-eye " : "bi-eye-slash"}`}></i>
            </button>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default PasswordInput;