import { type FC } from "react";
import { useTranslation } from "react-i18next";

type PaginationRowProps = {
    page: number;
    handlePageChange: (page: number, limit: number) => void;
}

const PaginationRows: FC<PaginationRowProps> = ({ page, handlePageChange }) => {
    const pageSizeSelector = [5, 10, 15, 20];
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>{t("pageRows")}</span>
            <div className="relative">
                <select className="appearance-none block w-auto pl-2 pr-4 py-1.5 border border-gray-300 bg-white rounded-md 
                shadow-sm text-sm text-gray-700 focus:outline-none hover:cursor-pointer"
                    onChange={(e) => handlePageChange(page, parseInt(e.target.value))}>
                    {
                        pageSizeSelector.map((size) => {
                            return (
                                <option className="hover:cursor-pointer" key={size} value={size}>{size}</option>
                            )
                        })
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                    <i className="bi bi-chevron-down text-xs"></i>
                </div>
            </div>
        </div>
    )
}
export default PaginationRows;