"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

const routes = {
  "/": "Home",
  "/demo": "Demo",
};

export function Providers({ children }: { children: React.ReactNode }) {
  const firstLayer = useRef<HTMLDivElement | null>(null);
  const secondLayer = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        gsap
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
            }
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
            "<50%"
          );
      }}
      enter={next => {
        gsap
          .timeline()
          .fromTo(
            secondLayer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 0.5,
              ease: "circ.inOut",
            }
          )
          .fromTo(
            firstLayer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 0.5,
              ease: "circ.inOut",
            },
            "<50%"
          )
          .call(next, undefined, "<50%");
      }}
    >
      {children}

      <div
        ref={firstLayer}
        className="fixed z-50 inset-0 bg-primary translate-y-full"
      />
      <div
        ref={secondLayer}
        className="fixed z-50 inset-0 bg-foreground translate-y-full"
      />
    </TransitionRouter>
  );
}
