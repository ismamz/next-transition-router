import Link, { LinkProps } from "next/link";
import { cn } from "@/app/utils";

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
        "group flex items-center justify-between gap-8 rounded-full bg-[tomato] px-8 py-4 text-left text-xl font-medium uppercase text-white no-underline transition-transform duration-100 active:scale-95 lg:text-2xl",
        className,
      )}
      {...rest}
    >
      {back && (
        <span className="text-[140%] transition-transform duration-200 group-hover:-translate-x-2">
          ←
        </span>
      )}
      <span>{children}</span>
      {!back && (
        <span className="text-[140%] transition-transform duration-200 group-hover:translate-x-2">
          →
        </span>
      )}
    </Link>
  );
}
