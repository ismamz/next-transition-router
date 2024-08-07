import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useEffect,
  useState,
} from 'react';
import delegate, { DelegateEvent } from 'delegate-it';
import { usePathname, useRouter } from 'next/navigation';

export type Stage = 'leaving' | 'entering' | 'none';

export interface PageTransitionsProps {
  children: ReactNode;
  leave: (n: () => void, f: string, t: string) => void;
  enter: (n: () => void) => void;
  auto: boolean;
}

const PageTransitionsContext = createContext<{
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  leave: PageTransitionsProps['leave'];
}>({
  stage: 'none',
  setStage: () => {},
  leave: () => {},
});

export function PageTransitions({
  children,
  leave,
  enter,
  auto = true,
}: PageTransitionsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [stage, setStage] = useState<Stage>('none');

  useEffect(() => {
    if (!auto) return;

    const handleClick = (event: DelegateEvent) => {
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
    };

    const controller = new AbortController();

    delegate('a[href]', 'click', handleClick, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [router, pathname, leave]);

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

  return (
    <PageTransitionsContext.Provider value={{ stage, setStage, leave }}>
      {children}
    </PageTransitionsContext.Provider>
  );
}

export function useTransitionState() {
  return use(PageTransitionsContext);
}
