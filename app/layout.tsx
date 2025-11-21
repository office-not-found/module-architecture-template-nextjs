import type { Metadata } from "next";
import { AppProviders } from "@/app/providers/AppProviders";
import "@/shared/config/theme/index.scss";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Module Architecture Template (Next.js)",
    description: "Module architecture template ported from Vite React to Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
