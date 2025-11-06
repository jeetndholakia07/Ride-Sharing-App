import { useState, useEffect, useRef, type FC, type KeyboardEvent } from "react";

type ComboBoxProps = {
    label: string;
    placeholder: string;
    options: string[];
    onSelect: (value: string) => void;
};

const ComboBox: FC<ComboBoxProps> = ({
    label,
    placeholder,
    options = [],
    onSelect,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [touched, setTouched] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Close dropdown when clicking outside
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

    // Filter options when input changes
    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredOptions([]);
            setIsOpen(false);
            return;
        }

        const filtered = options.filter((opt) =>
            opt.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
        setIsOpen(true);
        setActiveIndex(-1);
    }, [inputValue, options]);

    const handleSelect = (value: string) => {
        setInputValue(value);
        setTimeout(() => {
            setIsOpen(false);
            setActiveIndex(-1);
        }, 0);
        onSelect?.(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            handleSelect(filteredOptions[activeIndex]);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
            setActiveIndex(-1);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-md mb-2">
            {/* Input container */}
            <input
                type="text"
                value={inputValue}
                placeholder={placeholder || " "}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setTouched(true);
                }}
                onFocus={() => {
                    setTouched(true);
                    if (inputValue.trim() === "") {
                        setIsOpen(true);
                        setFilteredOptions([]);
                    }
                }}
                onKeyDown={handleKeyDown}
                className={`
          peer block w-full appearance-none rounded-md border
          px-3 pt-5 pb-1.5 text-sm placeholder-transparent transition-all
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
          ${inputValue || touched ? 'pt-2' : 'pt-5'} 
          ${filteredOptions.length === 0 && inputValue && !isOpen ? 'border-gray-300' : 'border-gray-300'}
        `}
            />

            {/* Label */}
            <label
                htmlFor="combo-box"
                className={`
          absolute left-3 top-1.5 z-10 origin-[0] text-gray-500 text-sm transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
          peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-500
          ${inputValue || touched ? 'top-1.5 text-xs' : 'top-3.5 text-sm'}
        `}
            >
                {label}
            </label>

            {/* Options dropdown */}
            {isOpen && (
                <ul
                    ref={listRef}
                    className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded border border-gray-200 bg-white shadow-md"
                >
                    {!touched || inputValue === "" ? (
                        <li className="px-4 py-2 text-md text-gray-500">Start typing...</li>
                    ) : filteredOptions.length === 0 ? (
                        <li className="px-4 py-2 text-md text-gray-500">No results found</li>
                    ) : (
                        filteredOptions.map((option, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleSelect(option)}
                                className={`cursor-pointer px-4 py-2 text-md ${activeIndex === idx
                                    ? "bg-blue-100 text-blue-800"
                                    : "text-gray-700 hover:bg-blue-50"
                                    }`}
                            >
                                {option}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;
