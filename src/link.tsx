import NextLink from "next/link";
import { useCallback } from "react";
import { useTransitionRouter } from "./router";
import { isModifiedEvent } from "./utils";

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const router = useTransitionRouter();

  const { href, as, replace, scroll } = props;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) props.onClick(e);

      if (!e.defaultPrevented && !isModifiedEvent(e)) {
        e.preventDefault();
        const navigate = replace ? router.replace : router.push;
        navigate((as || href) as string, { scroll: scroll ?? true });
      }
    },
    [props.onClick, href, as, replace, scroll, router]
  );

  return <NextLink {...props} onClick={onClick} />;
}
