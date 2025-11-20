"use client";

import { Container, Title } from "@mantine/core";
import { LogoutButton } from "@/modules/account-module/ui";

export const HomePage = () => {
  return (
    <Container size="md">
      <Title order={1}>Главная страница</Title>

      <LogoutButton />
    </Container>
  );
};



