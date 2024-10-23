import transactions from "@/public/data.json";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Transaction {
    date: number;
    state: string;
    amount: string;
    account: string;
    industry: string;
    currency: string;
    transaction_type: "deposit" | "withdraw";
}

interface DataState {
    loading: boolean;
    transactions: Transaction[];
}

const initialState: DataState = {
    loading: false,
    transactions: [],
};

export const fetchTransactions = createAsyncThunk(
    "data/fetchTransactions",
    async () => {
        return transactions as Transaction[];
    }
);

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.transactions = action.payload;
                state.loading = false;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default dataSlice.reducer;
