'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TransitionRouter } from 'next-transition-router';

const routes = {
  '/': 'Home',
  '/about': 'About',
};

export function Providers({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const layerRef2 = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        // layerRef.current.textContent = routes[to];

        gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            layerRef.current,
            { y: '100%' },
            {
              y: 0,
              duration: 0.5,
              ease: 'circ.inOut',
            }
          )
          .fromTo(
            layerRef2.current,
            {
              y: '100%',
            },
            {
              y: 0,
              duration: 0.5,
              ease: 'circ.inOut',
            },
            '<50%'
          );
      }}
      enter={next => {
        gsap
          .timeline()
          .fromTo(
            layerRef2.current,
            { y: 0 },
            {
              y: '-100%',
              duration: 0.5,
              ease: 'circ.inOut',
            }
          )
          .fromTo(
            layerRef.current,
            { y: 0 },
            {
              y: '-100%',
              duration: 0.5,
              ease: 'circ.inOut',
            },
            '<50%'
          )
          .call(next, undefined, '<50%');
      }}
    >
      <main ref={mainRef}>{children}</main>

      <div
        ref={layerRef}
        className="fixed z-50 inset-0 bg-primary translate-y-full"
      />
      <div
        ref={layerRef2}
        className="fixed z-50 inset-0 bg-foreground translate-y-full"
      />
    </TransitionRouter>
  );
}
