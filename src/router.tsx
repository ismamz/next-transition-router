import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useTransitionState } from "./context";

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { navigate } = useTransitionState();

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      navigate(href, pathname, "push", options);
    },
    [pathname]
  );

  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      navigate(href, pathname, "replace", options);
    },
    [pathname]
  );

  return useMemo(
    () => ({
      ...router,
      push,
      replace,
    }),
    [router, push, replace]
  );
}
