"use client";

import { LogoutButton } from "@/modules/account-module/ui";
import { Container, Title } from "@mantine/core";

export const HomePage = () => {
    return (
        <Container size="md">
            <Title order={1}>Главная страница</Title>

            <LogoutButton />
        </Container>
    );
};
