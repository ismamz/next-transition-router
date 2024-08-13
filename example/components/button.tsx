import Link, { LinkProps } from 'next/link';
import { cn } from '@/app/utils';

export function ButtonLink({
  children,
  back = false,
  className,
  ...rest
}: {
  children: React.ReactNode;
  back?: boolean;
  className?: string;
} & LinkProps) {
  return (
    <Link
      className={cn(
        'bg-[tomato] rounded-full text-left text-white no-underline uppercase font-medium text-2xl px-8 py-4 flex items-center gap-8 justify-between',
        className
      )}
      {...rest}
    >
      {back && <span>←</span>}
      <span>{children}</span>
      {!back && <span>→</span>}
    </Link>
  );
}
