"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToasterProvider } from "./ToasterProvider";
import { CheckAuthProvider } from "./CheckAuthProvider";

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
