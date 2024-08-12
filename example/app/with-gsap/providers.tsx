'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { TransitionRouter } from 'next-transition-router';
import { DebugStage } from '../_components/debug';

export function Providers({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);

  return (
    <TransitionRouter
      leave={next => {
        gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            mainRef.current,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.6, ease: 'power3.inOut' }
          );
      }}
      enter={next => {
        gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            mainRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, ease: 'power3.inOut' }
          );
      }}
    >
      <main ref={mainRef}>{children}</main>
      <DebugStage />
    </TransitionRouter>
  );
}
