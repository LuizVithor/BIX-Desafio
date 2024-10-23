import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
    states: string[];
    accounts: string[];
    industries: string[];
    dateRange: [Date | null, Date | null];
}

const savedFilters = typeof window !== "undefined" ? localStorage.getItem("filters") : null;
const initialState: FiltersState = savedFilters ? JSON.parse(savedFilters) : {
    dateRange: [null, null],
    accounts: [],
    industries: [],
    states: [],
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setDateRange(state, action: PayloadAction<[Date | null, Date | null]>) {
            state.dateRange = action.payload;
        },
        setAccounts(state, action: PayloadAction<string[]>) {
            state.accounts = action.payload;
        },
        setIndustries(state, action: PayloadAction<string[]>) {
            state.industries = action.payload;
        },
        setStates(state, action: PayloadAction<string[]>) {
            state.states = action.payload;
        },
        clearFilters(state) {
            state.dateRange = [null, null];
            state.accounts = [];
            state.industries = [];
            state.states = [];
        },
    },
});

export const filtersMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action);
    if (
        filtersSlice.actions.setDateRange.match(action) ||
        filtersSlice.actions.setAccounts.match(action) ||
        filtersSlice.actions.setIndustries.match(action) ||
        filtersSlice.actions.setStates.match(action) ||
        filtersSlice.actions.clearFilters.match(action)
    ) {
        const state = storeAPI.getState().filters;
        localStorage.setItem("filters", JSON.stringify(state));
    }
    return result;
};

export const { setDateRange, setAccounts, setIndustries, setStates, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;