import AuthLayout from "@/pages/auth-layout";
import type { ReactNode } from "react";

export default function AuthLayoutPage({ children }: { children: ReactNode }) {
    return <AuthLayout>{children}</AuthLayout>;
}
