
"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Box, Typography } from "@mui/material";
import { formatCurrency } from "@/utils/formatCurrency";
import {
    Bar,
    Pie,
    Line,
    Cell,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    PieChart,
    BarChart,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function Charts() {
    const filters = useAppSelector((state) => state.filters);
    const { transactions } = useAppSelector((state) => state.data);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((t) => {
            const matchesAccount =
                filters.accounts.length === 0 || filters.accounts.includes(t.account);
            const matchesIndustry =
                filters.industries.length === 0 || filters.industries.includes(t.industry);
            const matchesState = filters.states.length === 0 || filters.states.includes(t.state);
            const matchesDate = (filters.dateRange[0] && filters.dateRange[1]) ? (filters.dateRange[0] <= new Date(t.date)) && (filters.dateRange[1] >= new Date(t.date)) : true;
            return matchesAccount && matchesIndustry && matchesState && matchesDate;
        });
    }, [transactions, filters]);

    const lineChartData = useMemo(() => {
        const dataMap: { [key: string]: number } = {};

        filteredTransactions
            .sort((a, b) => a.date - b.date)
            .forEach((t) => {
                const date = new Date(t.date).toLocaleDateString();
                const amount = parseFloat(t.amount) / 100;
                dataMap[date] = (dataMap[date] || 0) + amount * (t.transaction_type === "deposit" ? 1 : -1);
            });

        return Object.keys(dataMap).map((date) => ({
            date,
            amount: dataMap[date],
        }));
    }, [filteredTransactions]);

    const barChartData = useMemo(() => {
        const dataMap: { [key: string]: { deposit: number; withdraw: number } } = {};

        filteredTransactions
            .sort((a, b) => a.date - b.date)
            .forEach((t) => {
                const date = new Date(t.date).toLocaleDateString();
                const amount = parseFloat(t.amount) / 100;
                if (!dataMap[date]) {
                    dataMap[date] = { deposit: 0, withdraw: 0 };
                }
                dataMap[date][t.transaction_type] += amount;
            });

        return Object.keys(dataMap).map((date) => ({
            date,
            deposit: dataMap[date].deposit,
            withdraw: dataMap[date].withdraw,
        }));
    }, [filteredTransactions]);

    const industryData = useMemo(() => {
        const dataMap: { [key: string]: number } = {};

        filteredTransactions.forEach((t) => {
            const amount = parseFloat(t.amount) / 100;
            dataMap[t.industry] = (dataMap[t.industry] || 0) + amount;
        });

        const data = Object.keys(dataMap).map((industry) => ({
            name: industry,
            value: dataMap[industry],
        }));

        return data.sort((a, b) => b.value - a.value).slice(0, 10);
    }, [filteredTransactions]);

    const stateData = useMemo(() => {
        const dataMap: { [key: string]: number } = {};

        filteredTransactions.forEach((t) => {
            const amount = parseFloat(t.amount) / 100;
            dataMap[t.state] = (dataMap[t.state] || 0) + amount;
        });

        const data = Object.keys(dataMap).map((state) => ({
            name: state,
            value: dataMap[state],
        }));

        return data.sort((a, b) => b.value - a.value).slice(0, 10);
    }, [filteredTransactions]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

    const monthlyData = useMemo(() => {
        const dataMap: { [key: string]: number } = {};

        filteredTransactions
            .sort((a, b) => a.date - b.date)
            .forEach((t) => {
                const date = new Date(t.date);
                const month = `${date.getMonth() + 1}/${date.getFullYear()}`;
                const amount = parseFloat(t.amount) / 100;
                dataMap[month] = (dataMap[month] || 0) + amount;
            });

        const data = Object.keys(dataMap).map((month) => ({
            month,
            amount: dataMap[month],
        }));

        return data;
    }, [filteredTransactions]);

    return (
        <Box sx={{ mt: 4 }} display={"flex"} flexWrap={"wrap"}>
            <Typography variant="h6" gutterBottom>
                Gráfico de Linhas (Fluxo de Caixa)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number, name: string, props: any) => {
                            const currency = "USD";
                            return [formatCurrency(value, currency), name];
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="amount" name="Valor" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Gráfico de Barras Empilhadas (Receitas vs Despesas)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number, name: string, props: any) => {
                            const currency = "BRL";
                            return [formatCurrency(value, currency), name];
                        }}
                    />
                    <Legend />
                    <Bar dataKey="deposit" name="Receitas" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="withdraw" name="Despesas" stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Meses com Maior Movimento
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number, name: string, props: any) => {
                            const currency = "BRL";
                            return [formatCurrency(value, currency), name];
                        }}
                    />
                    <Legend />
                    <Bar dataKey="amount" name="Valor" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <Box
                marginTop={5}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Typography variant="h6" gutterBottom>
                    Top 10 Indústrias
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            nameKey="name"
                            dataKey="value"
                            fill="#8884d8"
                            outerRadius={100}
                            data={industryData}
                            label={(data) => formatCurrency(data.value, "BRL")}
                        >
                            {industryData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                const currency = "BRL";
                                return [formatCurrency(value, currency), name];
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
            <Box
                marginTop={5}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Typography variant="h6" gutterBottom>
                    Top 10 Estados
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            nameKey="name"
                            dataKey="value"
                            data={stateData}
                            fill="#82ca9d"
                            outerRadius={100}
                            label={(data) => formatCurrency(data.value, "BRL")}
                        >
                            {stateData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string, props: any) => {
                                const currency = "BRL";
                                return [formatCurrency(value, currency), name];
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
