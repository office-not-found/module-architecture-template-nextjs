import { useLogoutMutation } from "@/modules/account-module/query";
import { Button } from "@/shared/ui";

export const LogoutButton = () => {
    const { mutate: logout, isPending } = useLogoutMutation();

    return (
        <Button mt="md" onClick={() => logout()} loading={isPending}>
            Выйти
        </Button>
    );
};
