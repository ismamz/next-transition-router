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
        "bg-[tomato] rounded-full text-left text-white no-underline uppercase font-medium text-xl lg:text-2xl px-8 py-4 flex items-center gap-8 justify-between group active:scale-95 transition-transform duration-100",
        className
      )}
      {...rest}
    >
      {back && (
        <span className="text-[140%] group-hover:-translate-x-2 transition-transform duration-200">
          ←
        </span>
      )}
      <span>{children}</span>
      {!back && (
        <span className="text-[140%] group-hover:translate-x-2 transition-transform duration-200">
          →
        </span>
      )}
    </Link>
  );
}
