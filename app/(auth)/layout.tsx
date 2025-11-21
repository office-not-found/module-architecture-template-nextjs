import type { ReactNode } from "react";
import AuthLayout from "@/pages/auth-layout";

export default function AuthLayoutPage({ children }: { children: ReactNode }) {
    return <AuthLayout>{children}</AuthLayout>;
}
