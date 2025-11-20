import { Button } from "@/shared/ui";
import { useLogoutMutation } from "@/modules/account-module/query";

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <Button mt="md" onClick={() => logout()} loading={isPending}>
      Выйти
    </Button>
  );
};



