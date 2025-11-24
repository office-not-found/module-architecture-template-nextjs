"use client";

import type { ReactNode } from "react";
import { CheckAuthProvider } from "./CheckAuthProvider";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToasterProvider } from "./ToasterProvider";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <QueryProvider>
                <ToasterProvider>
                    <CheckAuthProvider>{children}</CheckAuthProvider>
                </ToasterProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}
