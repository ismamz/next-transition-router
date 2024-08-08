import { sleep, useTransitionState } from './context';
import { usePathname, useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCallback, useMemo } from 'react';

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { leave, setStage, duration } = useTransitionState();

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      setStage('leaving');

      const navigate = () =>
        leave(() => router.push(href, options), pathname, href);

      if (duration) {
        sleep(duration).then(navigate);
      } else {
        navigate();
      }
    },
    [router, leave, pathname, setStage, duration]
  );

  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      setStage('leaving');

      const navigate = () =>
        leave(() => router.replace(href, options), pathname, href);

      if (duration) {
        sleep(duration).then(navigate);
      } else {
        navigate();
      }
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
