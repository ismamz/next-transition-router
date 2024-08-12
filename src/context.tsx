import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import delegate, { DelegateEvent } from 'delegate-it';
import { usePathname, useRouter } from 'next/navigation';

export type Stage = 'leaving' | 'entering' | 'none';

export interface TransitionRouterProps {
  children: ReactNode;
  leave?: (n: () => void, f: string, t: string) => void;
  enter?: (n: () => void) => void;

  auto?: boolean;
}

const TransitionRouterContext = createContext<{
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  leave: TransitionRouterProps['leave'];
}>({
  stage: 'none',
  setStage: () => {},
  leave: () => {},
});

export function TransitionRouter({
  children,
  leave = next => next(),
  enter = next => next(),

  auto = true,
}: TransitionRouterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [stage, setStage] = useState<Stage>('none');

  const handleClick = useCallback(
    (event: DelegateEvent) => {
      const anchor = event.delegateTarget as HTMLAnchorElement;
      const href = anchor?.getAttribute('href');
      const ignore = anchor?.getAttribute('data-transition-ignore');

      if (
        !ignore &&
        href?.startsWith('/') &&
        href !== pathname &&
        anchor.target !== '_blank' &&
        !href.includes('#')
      ) {
        event.preventDefault();
        setStage('leaving');
        leave(() => router.push(href), pathname, href);
      }
    },
    [router, pathname, leave]
  );

  useEffect(() => {
    if (!auto) return;

    const controller = new AbortController();
    delegate('a[href]', 'click', handleClick, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [auto, handleClick]);

  useEffect(() => {
    if (stage === 'entering') {
      enter(() => {
        setStage('none');
      });
    }
  }, [stage, enter]);

  useEffect(() => {
    return () => {
      if (stage === 'leaving') {
        setStage('entering');
      }
    };
  }, [stage, pathname]);

  useEffect(() => {
    document.documentElement.dataset.stage = stage;
  }, [stage]);

  const value = useMemo(() => ({ stage, setStage, leave }), [stage, leave]);

  return (
    <TransitionRouterContext.Provider value={value}>
      {children}
    </TransitionRouterContext.Provider>
  );
}

export function useTransitionState() {
  return use(TransitionRouterContext);
}
