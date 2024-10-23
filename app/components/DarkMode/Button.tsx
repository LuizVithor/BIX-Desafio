import { CSSProperties } from "react";
import { useColorScheme } from "@mui/material";
import { Container, ToggleSwitchWrapper, Sun, Cloud, Moon, Stars, Switch } from "./styles";

const ToggleSwitch = ({ containerStyle }: { containerStyle?: CSSProperties }) => {

    const { mode: muiMode, setMode, systemMode } = useColorScheme();

    const mode = muiMode === "system" ? (systemMode || "dark") : (muiMode || "dark");

    return (
        <Container
            style={containerStyle}
        >
            <ToggleSwitchWrapper
                isNight={mode == "dark"}
                onClick={() => setMode(mode == "dark" ? "light" : "dark")}
            >
                <Switch isNight={mode == "dark"}>
                    <Sun isNight={mode == "dark"}>☀️</Sun>
                    <Cloud isNight={mode == "dark"}>☁️</Cloud>
                    <Moon isNight={mode == "dark"}>🌙</Moon>
                    <Stars isNight={mode == "dark"}>✨</Stars>
                </Switch>
            </ToggleSwitchWrapper>
        </Container>
    );
};

export default ToggleSwitch;