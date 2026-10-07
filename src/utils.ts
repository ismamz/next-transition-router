import type { DelegateEvent } from "delegate-it";
import type { MouseEvent as ReactMouseEvent } from "react";

export function isModifiedEvent(
  event: DelegateEvent<MouseEvent> | ReactMouseEvent
): boolean {
  const eventTarget = (
    "delegateTarget" in event ? event.delegateTarget : event.currentTarget
  ) as HTMLAnchorElement | SVGAElement;

  const target = eventTarget.getAttribute("target");

  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    ("which" in event ? event.which : event.nativeEvent.which) === 2 // middle mouse button
  );
}

export function shouldLinkTriggerTransition(
  link: HTMLAnchorElement,
  event: DelegateEvent<MouseEvent> | ReactMouseEvent
): boolean {
  return (
    link.target !== "_blank" && // not for new tab
    link.origin === window.location.origin && // ensure same origin
    link.rel !== "external" && // ensure not marked as external
    !link.download && // not download link
    !isModifiedEvent(event) && // not a modifier key
    !event.defaultPrevented // click was not cancelled
  );
}
