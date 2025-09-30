import { type FC } from 'react';

type TextAreaProps = {
    label: string;
    placeholder: string;
    value: string;
    name: string;
    required?: boolean;
    rows?: number;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    error?: any;
    disabled?: boolean;
    icon?: string;
};

const TextArea: FC<TextAreaProps> = ({
    label,
    value,
    onChange,
    placeholder = " ",
    rows = 4,
    required = false,
    onBlur,
    name,
    error,
    disabled = false,
    icon
}) => {
    return (
        <div className="relative w-full mb-2">
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`
          peer block w-full appearance-none rounded-md border
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
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default TextArea;