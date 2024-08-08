import { useTransitionState } from './context';
import { usePathname, useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCallback, useMemo } from 'react';

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { leave, setStage } = useTransitionState();

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      setStage('leaving');
      leave(() => router.push(href, options), pathname, href);
    },
    [router, leave, pathname, setStage]
  );

  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      setStage('leaving');
      leave(() => router.replace(href, options), pathname, href);
    },
    [router, leave, pathname, setStage]
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
