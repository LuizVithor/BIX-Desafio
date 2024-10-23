"use client";
import React from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { auth } from "@/app/api/auth/firebaseConfig";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, Button, Toolbar, AppBar, Typography, Box } from "@mui/material";
import ToggleSwitch from "../DarkMode/Button";

const drawerWidth = 240;

export default function Sidebar() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/auth/signin");
    };

    const drawerContent = (
        <List>
            <ListItem component={Button} onClick={() => router.push("/")}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={Button} onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </ListItem>
        </List>
    );

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <>
                <AppBar component="nav" position="fixed">
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            sx={{ ml: 1 }}
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ToggleSwitch
                            containerStyle={{
                                top: 0,
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                                justifyContent: "center",
                            }}
                        />
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={mobileOpen}
                    variant="temporary"
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                        "& .MuiList-root": {
                            paddingY: 2,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>
            </>
        </>
    );
}
