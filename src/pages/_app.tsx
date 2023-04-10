import "@/styles/globals.css";

import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import theme from "@/styles/theme";

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <SWRConfig
                value={{
                    fetcher: (url: string) => fetch(url).then(res => res.json()),
                }}
            >
                <Component {...pageProps} />
            </SWRConfig>
        </ThemeProvider>
    );
}
