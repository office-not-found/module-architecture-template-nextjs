import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchLogout } from "../api";
import { useAccountStore } from "../model";
import { EQueryKeys } from "@/shared/config/query";
import { ROUTES } from "@/shared/config/routes";

export const useLogoutMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const resetAccount = useAccountStore((state) => state.resetAccount);

    const mutation = useMutation({
        mutationKey: [EQueryKeys.AUTH],
        mutationFn: fetchLogout,
        onSuccess: () => {
            resetAccount();
            queryClient.clear();
            router.replace(ROUTES.LOGIN);
        },
    });

    return mutation;
};

