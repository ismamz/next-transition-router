"use client";

import { useTransitionState } from "next-transition-router";
import { ComponentProps, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Reveal({
  children,
  ...rest
}: { children: React.ReactNode } & ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isReady } = useTransitionState();

  useEffect(() => {
    if (isReady) {
      const ctx = gsap.context(() => {
        gsap.to("img", { scale: 1, duration: 0.8, ease: "expo.out" });
      }, ref);

      return () => {
        ctx?.revert();
      };
    }
  }, [isReady]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
