'use client';

import { gsap } from 'gsap';
import { useTransitionState } from '@ismamz/transitions';
import { useLayoutEffect, useRef } from 'react';

export function Title({ children }: { children: React.ReactNode }) {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLHeadingElement | null>(null);

  const isReady = stage === 'none';

  useLayoutEffect(() => {
    if (isReady) {
      const ctx = gsap.context(() => {
        gsap
          .timeline()
          .set(ref.current, { autoAlpha: 1 })
          .from('span', {
            y: 100,
            autoAlpha: 0,
            duration: 0.6,
            ease: 'circ.out',
            stagger: {
              each: 0.05,
            },
          });
      }, ref);

      return () => {
        ctx?.revert();
      };
    }
  }, [isReady]);

  return (
    <h1
      ref={ref}
      style={{ visibility: isReady ? 'visible' : 'hidden' }}
      className="title"
    >
      {children}
    </h1>
  );
}
