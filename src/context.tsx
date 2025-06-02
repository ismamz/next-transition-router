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
import { shouldLinkTriggerTransition } from "./utils";

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

  const [stage, setStage] = useState<Stage>("none");

  const leaveRef = useRef<(() => void) | void | null>(null);
  const enterRef = useRef<(() => void) | void | null>(null);

  const navigate: NavigateProps = useCallback(
    async (href, pathname, method = "push", options) => {
      if (stage === "leaving") return Promise.resolve();

      let next = () => router[method](href, options);
      if (method === "back") next = () => router.back();

      // handle back navigation case where href is undefined
      if (method === "back" || !href) {
        next();
        return;
      }

      // skip transition for hash-only links
      if (href.startsWith("#")) {
        next();
        return;
      }

      let target: URL;
      let current: URL;

      try {
        current = new URL(window.location.href);
        target = new URL(href, current);
      } catch (error) {
        next();
        return;
      }

      const isSamePage =
        target.pathname === current.pathname &&
        target.search === current.search &&
        target.hash === current.hash;

      const isSamePathDifferentParams =
        target.pathname === current.pathname &&
        (target.search !== current.search || target.hash !== current.hash);

      if (
        target.origin === current.origin && // same origin
        !isSamePage && // not link to self
        !isSamePathDifferentParams // not same pathname but different params
      ) {
        setStage("leaving");
        leaveRef.current = await leave(next, pathname, href);
      } else {
        next();
      }
    },
    [leave, router, stage]
  );

  const handleClick = useCallback(
    (event: DelegateEvent<MouseEvent>) => {
      const link = event.delegateTarget as HTMLAnchorElement;
      const href = link?.getAttribute("href");
      const ignore = link?.getAttribute("data-transition-ignore"); // ignore only works in auto mode

      if (!ignore && shouldLinkTriggerTransition(link, event)) {
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
