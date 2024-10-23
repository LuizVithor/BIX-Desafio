"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { Card, Typography, Grid, Avatar, Box } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function SummaryCards() {
    const filters = useAppSelector((state) => state.filters);
    const { transactions } = useAppSelector((state) => state.data);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((t) => {
            const matchesAccount =
                filters.accounts.length === 0 || filters.accounts.includes(t.account);
            const matchesIndustry =
                filters.industries.length === 0 || filters.industries.includes(t.industry);
            const matchesState =
                filters.states.length === 0 || filters.states.includes(t.state);
            const matchesDateRange =
                !filters.dateRange[0] ||
                !filters.dateRange[1] ||
                (new Date(t.date) >= filters.dateRange[0] && new Date(t.date) <= filters.dateRange[1]);
            return matchesAccount && matchesIndustry && matchesState && matchesDateRange;
        });
    }, [transactions, filters]);

    const totalDeposits = filteredTransactions
        .filter((t) => t.transaction_type === "deposit")
        .reduce((sum, t) => sum + parseFloat(t.amount) / 100, 0);

    const totalWithdraws = filteredTransactions
        .filter((t) => t.transaction_type === "withdraw")
        .reduce((sum, t) => sum + parseFloat(t.amount) / 100, 0);

    const pendingTransactions = filteredTransactions.filter((t) => {
        const today = Date.now();
        return t.date > today;
    }).length;

    const balance = totalDeposits - totalWithdraws;

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: currency,
        }).format(amount);
    };

    const currency = filteredTransactions[0]?.currency || "USD";

    const formattedBalance = formatCurrency(balance, currency);
    const formattedTotalDeposits = formatCurrency(totalDeposits, currency);
    const formattedTotalWithdraws = formatCurrency(totalWithdraws, currency);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#4caf50", mr: 2 }}>
                        <ArrowUpwardIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1">Receitas</Typography>
                        <Typography variant="h6">{formattedTotalDeposits}</Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#f44336", mr: 2 }}>
                        <ArrowDownwardIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1">Despesas</Typography>
                        <Typography variant="h6">{formattedTotalWithdraws}</Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#ff9800", mr: 2 }}>
                        <HourglassEmptyIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1">Transações Pendentes</Typography>
                        <Typography variant="h6">{pendingTransactions}</Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#2196f3", mr: 2 }}>
                        <AccountBalanceWalletIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1">Saldo Total</Typography>
                        <Typography variant="h6">{formattedBalance}</Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
