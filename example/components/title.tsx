"use client";

import { cn } from "@/app/utils";
import { gsap } from "gsap";
import { useTransitionState } from "next-transition-router";
import { useLayoutEffect, useRef } from "react";

export function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { isReady } = useTransitionState();
  const ref = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (isReady) {
      const ctx = gsap.context(() => {
        gsap
          .timeline()
          .set(ref.current, {
            autoAlpha: 1,
          })
          .from("span", {
            y: "110%",
            duration: 0.6,
            ease: "circ.out",
            stagger: {
              each: 0.2,
            },
          });
      }, ref);

      return () => {
        ctx?.revert();
      };
    }
  }, [isReady]);

  return (
    <h1 ref={ref} className={cn(className, "invisible")}>
      {children}
    </h1>
  );
}
