import "@/styles/globals.css";

import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import theme from "@/styles/theme";

import type { AppProps } from "next/app";
import AppLayout from "@/components/AppLayout";
import { AuthContext } from "@/contexts/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{
                user: undefined,
                token: undefined,
            }}>
                <SWRConfig
                    value={{
                        fetcher: (url: string) => fetch(url).then(res => res.json()),
                    }}
                >
                    <AppLayout>
                        <Component {...pageProps} />
                    </AppLayout>
                </SWRConfig>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}
