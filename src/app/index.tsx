import { QueryProvider } from "@/app/providers/QueryProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ToasterProvider } from "@/app/providers/ToasterProvider";

export default function App() {
    return (
        <QueryProvider>
            <ThemeProvider>
                <ToasterProvider />
            </ThemeProvider>
        </QueryProvider>
    );
}
