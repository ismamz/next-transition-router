'use client';

import { useTransitionState } from 'next-transition-router';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export function Reveal({ children }: { children: React.ReactNode }) {
  const { stage } = useTransitionState();

  useEffect(() => {
    if (stage === 'none') {
      gsap.fromTo(
        '#full-image',
        { scale: 2 },
        { scale: 1, duration: 0.8, ease: 'expo.out' }
      );
    }
  }, [stage]);

  return <>{children}</>;
}
