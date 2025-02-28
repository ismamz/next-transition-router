import {
  createContext,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import delegate, { DelegateEvent } from "delegate-it";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { isModifiedEvent } from "./utils";

export type Stage = "leaving" | "entering" | "none";

export type TransitionCallback = (
  next: () => void,
  from?: string,
  to?: string
) => Promise<(() => void) | void> | ((() => void) | void);

export interface TransitionRouterProps {
  children: ReactNode;
  leave?: TransitionCallback;
  enter?: TransitionCallback;
  auto?: boolean;
}

export type NavigateProps = (
  href: string,
  pathname: string,
  method?: "push" | "replace" | "back",
  options?: NavigateOptions
) => void;

const TransitionRouterContext = createContext<{
  stage: Stage;
  navigate: NavigateProps;
  isReady: boolean;
}>({
  stage: "none",
  navigate: () => {},
  isReady: false,
});

export function TransitionRouter({
  children,
  leave = async (next) => next(),
  enter = async (next) => next(),
  auto = false,
}: TransitionRouterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [stage, setStage] = useState<Stage>("none");

  const leaveRef = useRef<(() => void) | void | null>(null);
  const enterRef = useRef<(() => void) | void | null>(null);

  const navigate: NavigateProps = useCallback(
    async (href, pathname, method = "push", options) => {
      if (stage === "leaving") return Promise.resolve();
      setStage("leaving");

      let callback = () => router[method](href, options);
      if (method === "back") callback = () => router.back();
      leaveRef.current = await leave(callback, pathname, href);
    },
    [leave, router, stage]
  );

  const fullPath = useMemo(() => {
    return pathname + searchParams.toString();
  }, [pathname, searchParams]);

  const handleClick = useCallback(
    (event: DelegateEvent<MouseEvent>) => {
      const anchor = event.delegateTarget as HTMLAnchorElement;
      const href = anchor?.getAttribute("href");
      const ignore = anchor?.getAttribute("data-transition-ignore");

      const url = href ? new URL(href, window.location.origin) : null;
      const currentUrl = new URL(window.location.href);

      const isSamePage =
        url?.pathname === currentUrl.pathname &&
        url?.search === currentUrl.search;

      if (
        !ignore &&
        href?.startsWith("/") &&
        !isSamePage &&
        anchor.target !== "_blank" &&
        !isModifiedEvent(event) &&
        !(href.includes("#") && url?.pathname === pathname)
      ) {
        event.preventDefault();
        navigate(href, pathname);
      }
    },
    [navigate, pathname]
  );

  useEffect(() => {
    if (!auto) return;

    const controller = new AbortController();
    delegate("a[href]", "click", handleClick, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [auto, handleClick]);

  useEffect(() => {
    if (stage === "entering") {
      if (typeof leaveRef.current === "function") leaveRef.current();
      leaveRef.current = null;

      const runEnter = async () => {
        enterRef.current = await Promise.resolve(enter(() => setStage("none")));
      };

      runEnter();
    }
  }, [stage, enter]);

  useEffect(() => {
    return () => {
      if (stage === "leaving") {
        if (typeof enterRef.current === "function") enterRef.current();
        enterRef.current = null;

        setStage("entering");
      }
    };
  }, [stage, fullPath]);

  const value = useMemo(
    () => ({ stage, navigate, isReady: stage !== "entering" }),
    [stage, navigate]
  );

  return (
    <TransitionRouterContext.Provider value={value}>
      {children}
    </TransitionRouterContext.Provider>
  );
}

export function useTransitionState() {
  return use(TransitionRouterContext);
}
