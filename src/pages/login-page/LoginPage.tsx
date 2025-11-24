import { LoginForm } from "@/modules/account-module/ui";
import styles from "./loginPage.module.scss";

export const LoginPage = () => (
    <div className={styles["login-page"]}>
        <div className={styles["login-page__form"]}>
            <LoginForm />
        </div>
    </div>
);
