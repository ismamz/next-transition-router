'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TransitionRouter } from 'next-transition-router';
import { DebugStage } from '../_components/debug';

const routes = {
  '/': 'Home',
  '/about': 'About',
};

export function Providers({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionRouter
      leave={(next, from, to) => {
        gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            layerRef.current,
            { autoAlpha: 0, x: '100%' },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: 'circ.inOut',
            }
          );
      }}
      enter={next => {
        gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            layerRef.current,
            { autoAlpha: 1, x: 0 },
            {
              x: '-100%',
              autoAlpha: 0,
              duration: 0.6,
              ease: 'circ.inOut',
            }
          );
      }}
    >
      <main ref={mainRef}>{children}</main>
      <div ref={layerRef} className="big-word">
        CHOTA
      </div>
      <DebugStage />
    </TransitionRouter>
  );
}
