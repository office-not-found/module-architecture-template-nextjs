import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { type TLoginData, type IUser, loginResolver, useAccountStore } from "../model";
import { useLoginQuery } from "../query";
import { ROUTES } from "@/shared/config/routes";

export const useLoginForm = () => {
    const router = useRouter();

    const setAccount = useAccountStore((state) => state.setAccount);

    const { mutateAsync, isPending } = useLoginQuery();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<TLoginData>({
        resolver: loginResolver,
        reValidateMode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSuccess = (user: IUser) => {
        setAccount({ ...user, isAuth: true });

        router.replace(ROUTES.INDEX);
    };

    const onSubmit = handleSubmit((data: TLoginData) => {
        mutateAsync(
            {
                username: data.username.trim(),
                password: data.password.trim(),
            },
            { onSuccess },
        );
    });

    return {
        errors,
        register,
        onSubmit,
        isPending,
    };
};
