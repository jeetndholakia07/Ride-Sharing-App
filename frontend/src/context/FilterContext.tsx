import { createContext, useCallback, useContext, useState } from "react";

type FilterContextType = {
    filters: Record<string, string>;
    setFilters: (filters: Record<string, string>) => void;
    onApply: ((appliedFilters?: Record<string, string>) => void) | null;
    setOnApply: (callback: (appliedFilters?: Record<string, string>) => void) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: any) => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [onApply, setOnApplyState] = useState<((appliedFilters?: Record<string, string>) => void) | null>(null);

    // Memoize setOnApply so child components always get a stable reference
    const setOnApply = useCallback(
        (callback: (appliedFilters?: Record<string, string>) => void) => {
            setOnApplyState(() => callback);
        },
        []
    );

    return (
        <FilterContext.Provider value={{ filters, setFilters, onApply, setOnApply }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilter must be used within FilterProvider");
    return context;
};