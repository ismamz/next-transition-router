import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useTransitionState } from "./context";
import { format, UrlObject } from "url";

type Url = string | UrlObject;

function getUrlAsString(url: Url): string {
  if (typeof url === "string") return url;
  return format(url);
}

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { navigate } = useTransitionState();

  const push = useCallback(
    (href: Url, options?: NavigateOptions) => {
      navigate(getUrlAsString(href), pathname, "push", options);
    },
    [pathname, navigate]
  );

  const replace = useCallback(
    (href: Url, options?: NavigateOptions) => {
      navigate(getUrlAsString(href), pathname, "replace", options);
    },
    [pathname, navigate]
  );

  const back = useCallback(() => {
    navigate(undefined, pathname, "back");
  }, [pathname, navigate]);

  return useMemo(
    () => ({
      ...router,
      push,
      replace,
      back,
    }),
    [router, push, replace, back]
  );
}
