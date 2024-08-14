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
import { usePathname, useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type Stage = "leaving" | "entering" | "none";

export interface TransitionRouterProps {
  children: ReactNode;
  leave?: (n: () => void, f: string, t: string) => (() => void) | void;
  enter?: (n: () => void) => (() => void) | void;
  auto?: boolean;
}

export type NavigateProps = (
  href: string,
  pathname: string,
  method?: "push" | "replace",
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
  leave = next => next(),
  enter = next => next(),
  auto = false,
}: TransitionRouterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [stage, setStage] = useState<Stage>("none");

  const leaveRef = useRef<(() => void) | void | null>(null);
  const enterRef = useRef<(() => void) | void | null>(null);

  const navigate: NavigateProps = useCallback(
    (href, pathname, method = "push", options) => {
      setStage("leaving");
      leaveRef.current = leave(
        () => router[method](href, options),
        pathname,
        href
      );
    },
    [leave, router]
  );

  const handleClick = useCallback(
    (event: DelegateEvent) => {
      const anchor = event.delegateTarget as HTMLAnchorElement;
      const href = anchor?.getAttribute("href");
      const ignore = anchor?.getAttribute("data-transition-ignore");

      if (
        !ignore &&
        href?.startsWith("/") &&
        href !== pathname &&
        anchor.target !== "_blank" &&
        !href.includes("#")
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

      enterRef.current = enter(() => {
        setStage("none");
      });
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
  }, [stage, pathname]);

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
