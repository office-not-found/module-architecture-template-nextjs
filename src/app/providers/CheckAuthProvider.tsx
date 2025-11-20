"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";
import { LoaderOverlay } from "@/shared/ui";
import { useGetSelfQuery } from "@/modules/account-module/query";

const PUBLIC_ROUTES = [ROUTES.LOGIN];

export function CheckAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isPending, isSuccess, isError } = useGetSelfQuery();

  useEffect(() => {
    if (!isPending && isSuccess && pathname === ROUTES.LOGIN) {
      router.replace(ROUTES.INDEX);
    }
  }, [isPending, isSuccess, pathname, router]);

  useEffect(() => {
    const isPublic = PUBLIC_ROUTES.includes(pathname as ROUTES);

    if (!isPending && isError && !isPublic) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isPending, isError, pathname, router]);

  if (isPending) {
    return <LoaderOverlay visible={true} />;
  }

  return <>{children}</>;
}

