'use client';

import { cn } from '@/app/utils';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import { useLayoutEffect, useRef } from 'react';

export function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
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
            y: '100%',
            duration: 0.6,
            ease: 'circ.out',
            stagger: {
              each: 0.1,
            },
          });
      }, ref);

      return () => {
        ctx?.revert();
      };
    }
  }, [isReady]);

  return (
    <h1 ref={ref} className={cn(className, isReady ? 'visible' : 'invisible')}>
      {children}
    </h1>
  );
}
