'use client'
import { type ReactNode } from "react";
import { useAppSelector } from "@/lib/hooks";
import { StoreProvider } from "./StoreProvider";
import { GlobalStyle } from "./styles/globals";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { darkColors, whiteColors } from "@/utils/colors";
import AuthWatcher from "./components/Watchers/AuthWatcher";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import StyledComponentsRegistry from "@/lib/styledComponents/registry";
import { createTheme, ThemeProvider as MuiThemeProvider, useColorScheme } from "@mui/material/styles";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  readonly children: ReactNode;
}


const MainComponent = ({ children }: Props) => {

  const { mode: muiMode, systemMode } = useColorScheme();
  const { loading } = useAppSelector(state => state.auth);

  const storageMode = typeof localStorage !== "undefined" ? localStorage.getItem("mui-mode") as "light" | "dark" | undefined : null;
  const mode = storageMode ? storageMode : muiMode == "system" ? (systemMode || "dark") : (muiMode || "dark");

  const colorPallete = {
    dark: { mode: mode, ...darkColors },
    light: { mode: mode, ...whiteColors },
  };

  return (
    <ThemeProvider theme={colorPallete[mode] || colorPallete.dark}>
      <html lang="pt-BR">
        <body>
          <ToastContainer />
          {
            loading
              ? <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CircularProgress />
              </Box>
              : children
          }
        </body>
      </html>
      <GlobalStyle />
    </ThemeProvider>
  )
}

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: darkColors.body,
          paper: darkColors.background,
          defaultChannel: darkColors.body,
          paperChannel: darkColors.background,
        },
        primary: {
          main: darkColors.primary,
        },
        secondary: {
          main: darkColors.secondary,
        },
      }
    },
    light: {
      palette: {
        mode: "light",
        background: {
          default: whiteColors.body,
          paper: whiteColors.background,
          defaultChannel: whiteColors.body,
          paperChannel: whiteColors.background,
        },
        primary: {
          main: whiteColors.primary,
        },
        secondary: {
          main: whiteColors.secondary,
        },
      }
    },
  },
});

export default function RootLayout({ children }: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <StoreProvider>
        <CssBaseline />
        <AuthWatcher />
        <StyledComponentsRegistry>
          <MainComponent children={children} />
        </StyledComponentsRegistry>
      </StoreProvider>
    </MuiThemeProvider>
  );
}
