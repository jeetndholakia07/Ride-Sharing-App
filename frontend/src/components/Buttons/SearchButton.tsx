import React from "react";

type SearchButtonProps = {
  isLoading?: boolean;
  disabled?: boolean;
  name: string;
  loadingLabel?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  loadingBgColor?: string;
};

const SearchButton: React.FC<SearchButtonProps> = ({
  isLoading = false,
  disabled = false,
  name,
  loadingLabel = "Searching...",
  icon = <i className="bi bi-search text-md mr-2" />,
  bgColor = "bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
  loadingBgColor = "bg-green-400",
}) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      disabled={isButtonDisabled}
      className={`
        relative inline-flex items-center justify-center
        text-white text-base font-medium rounded-lg
        px-6 py-3 transition duration-300 ease-in-out
        ${isLoading ? `${loadingBgColor} cursor-wait` : `${bgColor} hover:cursor-pointer`}
        ${isButtonDisabled ? 'opacity-80 cursor-not-allowed' : ''}
      `}
    >
      {!isLoading && icon}

      <span className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
        {name}
      </span>

      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-white text-sm">
          <span>{loadingLabel}</span>
          <i className="bi bi-arrow-clockwise animate-spin text-white" />
        </span>
      )}
    </button>
  );
};

export default SearchButton;