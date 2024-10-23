"use client";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ptBR } from 'date-fns/locale/pt-BR';
import { useAppSelector } from "@/lib/hooks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { clearFilters, setAccounts, setIndustries, setStates, setDateRange } from "@/lib/features/filterSlice";

export default function Filters() {
    const dispatch = useDispatch();
    const { transactions } = useAppSelector((state) => state.data);

    const [statesOptions, setStatesOptions] = useState<string[]>([]);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const [accountsOptions, setAccountsOptions] = useState<string[]>([]);
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [industriesOptions, setIndustriesOptions] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const states = Array.from(new Set(transactions.map((t) => t.state)));
        const accounts = Array.from(new Set(transactions.map((t) => t.account)));
        const industries = Array.from(new Set(transactions.map((t) => t.industry)));

        setStatesOptions(states);
        setAccountsOptions(accounts);
        setIndustriesOptions(industries);

        if (typeof window !== "undefined") {
            const savedFilters = localStorage.getItem("filters");
            if (savedFilters) {
                const parsedFilters = JSON.parse(savedFilters);
                if (parsedFilters.dateRange) {
                    setStartDate(new Date(parsedFilters.dateRange[0]));
                    setEndDate(new Date(parsedFilters.dateRange[1]));
                }
                if (parsedFilters.accounts) setSelectedAccounts(parsedFilters.accounts);
                if (parsedFilters.industries) setSelectedIndustries(parsedFilters.industries);
                if (parsedFilters.states) setSelectedStates(parsedFilters.states);
            }
        }
    }, [transactions]);

    const applyFilters = () => {
        dispatch(setStates(selectedStates));
        dispatch(setAccounts(selectedAccounts));
        dispatch(setIndustries(selectedIndustries));

        if (startDate && endDate) {
            console.log([startDate, endDate])
            dispatch(setDateRange([startDate, endDate]));
        } else {
            dispatch(setDateRange([null, null]));
        }

        if (typeof window !== "undefined") {
            const filtersToSave = {
                dateRange: [startDate ? startDate.valueOf() : null, endDate ? endDate.valueOf() : null],
                accounts: selectedAccounts,
                industries: selectedIndustries,
                states: selectedStates,
            };
            localStorage.setItem("filters", JSON.stringify(filtersToSave));
        }
    };

    const handleClearFilters = () => {
        setEndDate(null);
        setStartDate(null);
        setSelectedStates([]);
        setSelectedAccounts([]);
        dispatch(clearFilters());
        setSelectedIndustries([]);

        if (typeof window !== "undefined") {
            localStorage.removeItem("filters");
        }
    };

    return (
        <Box sx={{ p: 2, px: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <Box
                    gap={2}
                    display={"flex"}
                >
                    <DatePicker
                        value={startDate}
                        label="Data Inicial"
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{
                            field: { clearable: true, onClear: () => setStartDate(null) }
                        }}
                        sx={{
                            width: "50%"
                        }}
                    />
                    <DatePicker
                        value={endDate}
                        label="Data Final"
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{
                            field: { clearable: true, onClear: () => setEndDate(null) }
                        }}
                        sx={{
                            width: "50%"
                        }}
                    />
                </Box>
            </LocalizationProvider>
            <Autocomplete
                multiple
                value={selectedAccounts}
                options={accountsOptions}
                onChange={(_, newValue) => setSelectedAccounts(newValue)}
                renderInput={(params) => <TextField {...params} label="Contas" margin="normal" />}
            />
            <Autocomplete
                multiple
                value={selectedIndustries}
                options={industriesOptions}
                onChange={(_, newValue) => setSelectedIndustries(newValue)}
                renderInput={(params) => <TextField {...params} label="Indústrias" margin="normal" />}
            />
            <Autocomplete
                multiple
                value={selectedStates}
                options={statesOptions}
                onChange={(_, newValue) => setSelectedStates(newValue)}
                renderInput={(params) => <TextField {...params} label="Estados" margin="normal" />}
            />
            <Box sx={{ display: "flex", mt: 2 }}>
                <Button
                    sx={{ mr: 2 }}
                    color="primary"
                    variant="contained"
                    onClick={applyFilters}
                >
                    Aplicar Filtros
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClearFilters}
                >
                    Limpar Filtros
                </Button>
            </Box>
        </Box>
    );
}
