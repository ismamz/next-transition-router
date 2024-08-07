import { useTransitionState } from './context';
import { usePathname, useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { leave, setStage } = useTransitionState();

  return {
    ...router,
    push: (href: string, options?: NavigateOptions) => {
      setStage('leaving');
      leave(() => router.push(href, options), pathname, href);
    },
    replace: (href: string, options?: NavigateOptions) => {
      setStage('leaving');
      leave(() => router.replace(href, options), pathname, href);
    },
  };
}
