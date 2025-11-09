import { useState, useEffect, useRef, type FC, type KeyboardEvent, useCallback } from "react";
import axiosInstance from "../../hooks/axiosInstance";
import { api } from "../../hooks/api";

type LocationOption = {
    address: string;
    lat: number;
    lng: number;
    state: string;
};

type ComboBoxProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    onSelect: (option: LocationOption) => void;
    disabled?: boolean;
    icon?: string;
    required?: boolean;
};

const ComboBox: FC<ComboBoxProps> = ({
    label,
    placeholder = " ",
    value = "",
    onChange,
    onSelect,
    disabled = false,
    icon,
    required = false
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [options, setOptions] = useState<LocationOption[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [touched, setTouched] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Simple debounce helper
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timer: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // Fetch suggestions
    const fetchSuggestions = async (query: string) => {
        if (query.trim().length < 3) {
            setOptions([]);
            setIsOpen(false);
            return;
        }
        try {
            const response = await axiosInstance.get(api.public.autoComplete, {
                params: { query },
            });
            if (response?.data && Array.isArray(response.data)) {
                setOptions(response.data);
                setIsOpen(true);
            } else {
                setOptions([]);
                setIsOpen(false);
            }
        } catch (err) {
            console.error("Autocomplete error:", err);
        }
    };

    // Debounced fetch
    const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), []);

    const handleInputChange = (val: string) => {
        setInputValue(val);
        onChange(val);
        debouncedFetch(val);
        setTouched(true);
    };

    const handleSelect = (option: LocationOption) => {
        setInputValue(option.address);
        onChange(option.address);
        onSelect(option);
        setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            handleSelect(options[activeIndex]);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
            setActiveIndex(-1);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-sm mb-2">
            {/* Input */}
            <input
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => {
                    setTouched(true);
                    if (inputValue && options.length > 0) setIsOpen(true);
                }}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={` border-gray-300
                    peer block w-full rounded-md border px-3 pt-5 pb-1.5 text-sm
                    placeholder-transparent transition-all
                    ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-900"}
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${inputValue || touched ? "pt-2" : "pt-5"}
                `}
            />

            {/* Floating label */}
            <label
                className={`
                    absolute left-3 top-1.5 z-10 text-gray-500 text-sm transition-all duration-200
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-500
                    ${inputValue || touched ? "top-1.5 text-xs" : "top-3.5 text-sm"}
                    ${disabled ? "text-gray-400" : ""}
                `}
            >
                {/* Icon */}
                {icon && <i className={`${icon} text-gray-400 mr-1 text-xs`} />}{label}
                {required && <span className="text-red-500 text-xs ml-0.5">*</span>}
            </label>

            {/* Dropdown */}
            {isOpen && options.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded border border-gray-200 bg-white shadow-md">
                    {options.map((opt, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(opt)}
                            className={`cursor-pointer px-4 py-2 text-md ${activeIndex === idx
                                ? "bg-blue-100 text-blue-800"
                                : "text-gray-700 hover:bg-blue-50"
                                }`}
                        >
                            {opt.address}
                        </li>
                    ))}
                </ul>
            )}

            {/* No results */}
            {isOpen && options.length === 0 && inputValue.trim() && (
                <div className="absolute z-10 mt-1 w-full rounded border border-gray-200 bg-white px-4 py-2 text-gray-500">
                    No results found
                </div>
            )}
        </div>
    );
};

export default ComboBox;
