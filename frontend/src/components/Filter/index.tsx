import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import StatusFilter from "./StatusFilter.js";
import { useRole } from "../../context/RoleContext.js";
import statusConfig from "../../i18n/keys/filter.json";
import { getDateComponentsfromDateObj } from "../../utils/dateFormat.js";
import MonthPicker from "../Form/MonthPicker.js";
import { useFilter } from "../../context/FilterContext.js";
import useMediaQuery from "../../utils/useMediaQuery.js";

const Filter = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState<Date | undefined>(undefined);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const menuRef = useRef<any>(null);
    const { t } = useTranslation();
    const { role } = useRole();
    const { filters, setFilters, onApply } = useFilter();

    const statuses = role === "driver" ? statusConfig.driver : statusConfig.passenger;
    const isDesktop = useMediaQuery('(min-width:767px)');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            const target = event.target as Node;

            if (menuRef.current?.contains(target)) return;

            if ((target as HTMLElement).closest(".flatpickr-calendar")) return;

            if (!isCalendarOpen) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCalendarOpen, isDesktop]);


    const handleMonthChange = (date: any) => setSelectedMonthYear(date);

    const handleStatusChange = (e: any) => {
        const selected = statuses.find((s) => s.value === e.target.value);
        if (selected) {
            setFilters({
                ...filters,
                [selected.filter]: selected.value,
            });
        }
    };

    const handleApplyFilter = () => {
        const updatedFilters: Record<string, string> = { ...filters };
        if (selectedMonthYear) {
            const { month, year } = getDateComponentsfromDateObj(selectedMonthYear);
            if (month) updatedFilters.month = month;
            if (year) updatedFilters.year = year;
        }
        setFilters(updatedFilters);
        setMenuOpen(false);
        onApply?.(updatedFilters);
    };

    const handleResetFilter = () => {
        setFilters({});
        setSelectedMonthYear(undefined);
        setMenuOpen(false);
        onApply?.({});
    };

    return (
        <div className="relative">
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white 
        px-4 py-2 rounded-lg shadow-sm transition-all font-semibold hover:cursor-pointer"
            >
                <i className="bi bi-funnel-fill text-lg"></i>
                {t("filter")}
            </button>

            {menuOpen && (
                <>
                    {/* Mobile Overlay */}
                    {!isDesktop && (
                        <div
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                            onClick={() => setMenuOpen(false)}
                        ></div>
                    )}

                    {/* Filter Panel */}
                    <div
                        ref={menuRef}
                        className={`z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 
              ${!isDesktop
                                ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm"
                                : "absolute right-0 mt-2 w-96"
                            }`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{t("filterOptions")}</h3>
                            <button
                                onClick={handleResetFilter}
                                className="text-sm text-blue-600 hover:underline font-medium hover:cursor-pointer"
                            >
                                {t("resetBtn")}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 mb-5"></div>

                        {/* Status Filter */}
                        <div className="mb-5">
                            <StatusFilter
                                name={t("status")}
                                label={t("status")}
                                value={
                                    filters[
                                    statuses.find((s) => s.filter in filters)?.filter ?? statuses[0].filter
                                    ] || ""
                                }
                                values={statuses}
                                onChange={handleStatusChange}
                            />
                        </div>

                        {/* Month Filter */}
                        <div className="mb-6">
                            <MonthPicker
                                name="monthPicker"
                                label={t("monthYear")}
                                value={selectedMonthYear}
                                onChange={([date]: any) => handleMonthChange(date)}
                                setIsCalendarOpen={setIsCalendarOpen}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6 border-t pt-4 border-gray-100">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium
                                 hover:bg-gray-100 transition hover:cursor-pointer"
                            >
                                {t("cancel")}
                            </button>
                            <button
                                onClick={handleApplyFilter}
                                className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 
                                transition hover:cursor-pointer"
                            >
                                {t("applyBtn")}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Filter;