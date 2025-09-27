import { useState, type FC } from "react";

type FormCardProps = {
    title: string;
    defaultOpen?: boolean;
    children?: React.ReactNode;
}

const FormCard: FC<FormCardProps> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="max-w-4xl mx-auto rounded-lg border border-gray-300 bg-white shadow-sm mb-5">
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className="flex w-full hover:cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-6 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                <i
                    className={`bi bi-chevron-down text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    aria-hidden="true"
                ></i>
            </button>

            {/* Collapsible content */}
            <div
                className={`overflow-hidden rounded-b-lg bg-white px-6 transition-all duration-300 ${isOpen ? "max-h-full py-6" : "max-h-0 py-0"
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default FormCard;