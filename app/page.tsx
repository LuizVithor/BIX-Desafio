// pages/dashboard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Toolbar, AppBar, Typography, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTransactions } from "@/lib/features/dataSlice";
import Sidebar from "./components/Dashboard/SideBar";
import Filters from "./components/Dashboard/Filters";
import SummaryCards from "./components/Dashboard/SummaryCards";
import Charts from "./components/Dashboard/Charts";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signIn");
    }
  }, [user, loading, router]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading || !user) {
    return <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress />
    </Box>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Filters />
        <SummaryCards />
        <Charts />
      </Box>
    </Box>
  );
}
