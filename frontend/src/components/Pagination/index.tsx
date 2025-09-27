import { type FC } from "react";
import PaginationButtons from "./PaginationButtons.js";
import PaginationRows from "./PaginationRows.js";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    page: number;
    limit: number;
    handlePageChange: (page: number, limit: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, page, limit, handlePageChange }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 !pb-0 border-t border-gray-200 bg-white">
            <PaginationRows page={page} handlePageChange={handlePageChange} />
            <PaginationButtons limit={limit} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
}
export default Pagination;