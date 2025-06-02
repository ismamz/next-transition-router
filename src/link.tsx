import NextLink from "next/link";
import { useCallback } from "react";
import { useTransitionRouter } from "./router";
import { shouldLinkTriggerTransition } from "./utils";

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const router = useTransitionRouter();

  const { href, as, replace, scroll } = props;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) props.onClick(e);

      const link = e.currentTarget as HTMLAnchorElement;
      const targetHref = (as || href) as string;

      if (shouldLinkTriggerTransition(link, e)) {
        e.preventDefault();
        const navigate = replace ? router.replace : router.push;
        navigate(targetHref, { scroll: scroll ?? true });
      }
    },
    [props.onClick, href, as, replace, scroll, router.replace, router.push]
  );

  return <NextLink {...props} onClick={onClick} />;
}
