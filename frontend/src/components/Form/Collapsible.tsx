import { useState, type FC, type ReactNode } from "react";

type CollapsibleProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

const Collapsible: FC<CollapsibleProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full border border-gray-200 rounded-lg shadow-sm">
      {/* Header / Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-t-lg 
        transition-all duration-200 hover:cursor-pointer"
      >
        <span className="text-md font-semibold text-nowrap text-gray-800 mr-1">{title}</span>
        <i
          className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"
            } text-gray-600 text-lg transition-transform duration-300`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100 px-5 pb-5 pt-2" : "max-h-0 opacity-0 p-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
