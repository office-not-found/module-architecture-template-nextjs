import {
    Button as ButtonFromLibUi,
    createPolymorphicComponent,
    type ButtonProps,
} from "@mantine/core";
import { forwardRef } from "react";

interface CustomButtonProps extends ButtonProps {}

const ButtonBase = forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ children, ...others }, ref) => (
        <ButtonFromLibUi {...others} ref={ref}>
            {children}
        </ButtonFromLibUi>
    ),
);

ButtonBase.displayName = "Button";

export const Button = createPolymorphicComponent<"button", CustomButtonProps>(ButtonBase);
