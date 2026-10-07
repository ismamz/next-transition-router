"use client";

import { createContext, useRef, useState, startTransition } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

export const TransitionSettingsContext = createContext({
  auto: true,
  setAuto: (auto: boolean) => {},
  enabled: true,
  setEnabled: (enabled: boolean) => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [auto, setAuto] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const firstLayer = useRef<HTMLDivElement | null>(null);
  const secondLayer = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionRouter
      auto={auto}
      transitionOnSearchParams={enabled}
      leave={(next, from, to) => {
        console.log({ from, to });

        const tl = gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            firstLayer.current,
            { y: "100%" },
            {
              y: 0,
              duration: 0.5,
              ease: "circ.inOut",
            },
          )
          .fromTo(
            secondLayer.current,
            {
              y: "100%",
            },
            {
              y: 0,
              duration: 0.5,
              ease: "circ.inOut",
            },
            "<50%",
          );

        return () => {
          tl.kill();
        };
      }}
      enter={(next) => {
        const tl = gsap
          .timeline()
          .fromTo(
            secondLayer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 0.5,
              ease: "circ.inOut",
            },
          )
          .fromTo(
            firstLayer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 0.5,
              ease: "circ.inOut",
            },
            "<50%",
          )
          .call(
            () => {
              // Defer React updates to prevent jank during animation
              requestAnimationFrame(() => {
                startTransition(next);
              });
            },
            undefined,
            "<50%",
          );

        return () => {
          tl.kill();
        };
      }}
    >
      <TransitionSettingsContext.Provider
        value={{ auto, setAuto, enabled, setEnabled }}
      >
        <main>{children}</main>
      </TransitionSettingsContext.Provider>

      <div
        ref={firstLayer}
        className="fixed inset-0 z-50 translate-y-full bg-primary"
      />
      <div
        ref={secondLayer}
        className="fixed inset-0 z-50 translate-y-full bg-foreground"
      />
    </TransitionRouter>
  );
}
