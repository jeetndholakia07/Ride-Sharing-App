import { type FC } from "react";

type PageButtonProps = {
    currentPage: number;
    totalPages: number;
    limit: number
    handlePageChange: (page: number, limit: number) => void;
}

const PaginationButtons: FC<PageButtonProps> = ({ currentPage, totalPages, limit, handlePageChange }) => {
    const maxVisiblePages = 3;
    const getPageNumbers = () => {
        const pages = [];
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start < maxVisiblePages - 1) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }
    return (
        <div className="flex items-center gap-2">
            <button
                className={`px-3 py-1.5 hover:cursor-pointer text-bold text-sm text-gray-600 hover:text-blue-600 
                disabled:opacity-50 disabled:cursor-default`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1, limit)}
            >
                <i className="bi bi-chevron-left text-lg"></i>
            </button>
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page, limit)}
                    className={`w-8 h-8 rounded-md hover:cursor-pointer text-sm font-medium ${page === currentPage
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                className={`px-3 py-1.5 hover:cursor-pointer text-sm text-gray-600 hover:text-blue-600 
                disabled:opacity-50 disabled:cursor-default`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1, limit)}
            >
                <i className="bi bi-chevron-right text-lg"></i>
            </button>
        </div>
    )
}
export default PaginationButtons;