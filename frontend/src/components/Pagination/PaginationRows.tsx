import { type FC } from "react";
import { useTranslation } from "react-i18next";

type PaginationRowProps = {
    page: number;
    limit: number;
    handlePageChange: (page: number, limit: number) => void;
};

const PaginationRows: FC<PaginationRowProps> = ({ limit, handlePageChange }) => {
    const pageSizeSelector = [1, 2, 3, 4, 5];
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>{t("pageRows")}</span>
            <div className="relative">
                <select
                    className="appearance-none block w-auto pl-2 pr-5 py-1.5 border border-gray-300 bg-white rounded-md 
          shadow-sm text-sm text-gray-700 focus:outline-none hover:cursor-pointer"
                    value={limit}
                    onChange={(e) => { handlePageChange(1, parseInt(e.target.value)); console.log("selector:", e.target.value) }}
                >
                    {pageSizeSelector.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                    <i className="bi bi-chevron-down text-xs"></i>
                </div>
            </div>
        </div>
    );
};

export default PaginationRows;
