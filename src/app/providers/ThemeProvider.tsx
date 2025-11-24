import { theme } from "@/shared/config/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
        {children}
    </MantineProvider>
);
