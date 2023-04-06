import "@/styles/globals.css";
import { ThemeProvider } from "styled-components";
import { BaseTheme } from "@lifesg/react-design-system/theme";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={BaseTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
