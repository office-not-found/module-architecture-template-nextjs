import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui";
import Link from "next/link";
import styles from "./errorPage.module.scss";

export interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    const errorMessage = error.message ?? "Something went wrong";

    return (
        <div className={styles["error-page"]}>
            <div className={styles["error-page__container"]}>
                <h1 className={styles["error-page__title"]}>Something went wrong</h1>
                <p className={styles["error-page__text"]}>{String(errorMessage)}</p>
                <div className={styles["error-page__buttons"]}>
                    <Button
                        component={Link}
                        href={ROUTES.INDEX}
                        className={styles["error-page__button"]}
                    >
                        Home
                    </Button>
                    <Button onClick={reset} className={styles["error-page__button"]}>
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    );
};
