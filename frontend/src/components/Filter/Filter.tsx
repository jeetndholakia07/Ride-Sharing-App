import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import SelectInput from "../../components/Form/SelectInput.js";
import { useRole } from "../../context/RoleContext.js";
import statusConfig from "../../i18n/keys/filter.json";
import { getDateComponentsfromDateObj } from "../../utils/dateFormat.js";
import MonthPicker from "../Form/MonthPicker.js";
import { useFilter } from "../../context/FilterContext.js";

const Filter = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState<Date | undefined>(undefined);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const menuRef = useRef<any>(null);
    const { t } = useTranslation();
    const { role } = useRole();
    const { filters, setFilters, onApply } = useFilter();

    const statuses = role === "driver" ? statusConfig.driver : statusConfig.passenger;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && !isCalendarOpen) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCalendarOpen]);

    const handleMonthChange = (date: any) => {
        setSelectedMonthYear(date);
    };

    const handleStatusChange = (e: any) => {
        const selected = statuses.find((s) => s.value === e.target.value);
        if (selected) {
            // update the correct filter dynamically (driverStatus or driveStatus)
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
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 py-2 rounded-md text-white 
                font-semibold transition-shadow shadow-md hover:cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                <i className="bi bi-funnel-fill"></i>
                {t("filter")}
            </button>

            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-96 max-h-[70vh] overflow-y-auto bg-white border 
                    border-gray-200 rounded-lg shadow-xl p-6 z-50"
                >
                    {/* Header */}
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{t("filterOptions")}</h3>

                    {/* Status Filter */}
                    <div className="mb-4">
                        <SelectInput
                            name={t("status")}
                            value={
                                filters[
                                statuses.find((s) => s.filter in filters)?.filter ?? statuses[0].filter
                                ] || ""
                            }
                            values={statuses}
                            label={t("status")}
                            onChange={handleStatusChange}
                        />
                    </div>

                    {/* Month Filter */}
                    <div className="mb-4">
                        <MonthPicker
                            name="monthPicker"
                            label={t("monthYear")}
                            value={selectedMonthYear}
                            onChange={([date]: any) => handleMonthChange(date)}
                            setIsCalendarOpen={setIsCalendarOpen}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md 
                            transition-shadow shadow-sm hover:cursor-pointer"
                            onClick={handleResetFilter}
                        >
                            {t("resetBtn")}
                        </button>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md 
                            transition-shadow shadow-sm hover:cursor-pointer"
                            onClick={handleApplyFilter}
                        >
                            {t("applyBtn")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;