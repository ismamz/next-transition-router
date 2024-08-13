'use client';

import { useTransitionState } from 'next-transition-router';
import { ComponentProps, useEffect } from 'react';
import { gsap } from 'gsap';

export function Reveal({
  children,
  ...rest
}: { children: React.ReactNode } & ComponentProps<'div'>) {
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

  return <div {...rest}>{children}</div>;
}
