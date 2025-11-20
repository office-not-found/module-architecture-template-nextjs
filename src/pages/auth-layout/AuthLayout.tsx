import type { ReactNode } from "react";
import styles from "./layout.module.scss";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return <div className={styles.layout}>{children}</div>;
};
