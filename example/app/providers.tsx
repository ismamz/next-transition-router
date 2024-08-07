'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { PageTransitions } from 'next-transition-router';
import { DebugStage } from './_components/debug';

const routes = {
  '/': 'Home',
  '/about': 'About',
};

export function Providers({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  const [nextPageName, setNextPageName] = useState('');

  return (
    <PageTransitions
      leave={(next, from, to) => {
        console.log({ from, to });

        // Target the layer element and set its content with the next route name
        // layerRef.current.innerHTML = routes[to];
        // Or use the state to set the next route name
        setNextPageName(routes[to]);

        gsap.context(() => {
          gsap
            .timeline({
              onComplete: next,
            })
            .to(mainRef.current, {
              autoAlpha: 0,
              startAt: { autoAlpha: 1 },
              duration: 0.6,
              ease: 'power3.inOut',
            })
            .to(
              layerRef.current,
              {
                y: 0,
                startAt: { y: '100%' },
                duration: 0.6,
                ease: 'circ.inOut',
              },
              '<25%'
            )
            .fromTo(
              layerRef.current.querySelector('span'),
              { autoAlpha: 0 },
              {
                autoAlpha: 1,
                duration: 0.6,
                ease: 'power3.inOut',
              },
              '<50%'
            );
        });
      }}
      enter={next => {
        gsap.context(() => {
          gsap
            .timeline({
              onComplete: next,
              delay: 0.4, // how much time the layer will stay visible before animating out
            })
            .fromTo(
              layerRef.current.querySelector('span'),
              { autoAlpha: 1 },
              {
                autoAlpha: 0,
                duration: 0.6,
                ease: 'power3.inOut',
              }
            )
            .to(
              layerRef.current,
              {
                y: '-100%',
                duration: 0.6,
                ease: 'circ.inOut',
              },
              '<50%'
            )
            .fromTo(
              mainRef.current,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.6, ease: 'power3.inOut' },
              '<25%'
            );
        });
      }}
    >
      <main ref={mainRef}>{children}</main>
      <div
        ref={layerRef}
        className="layer"
        style={{ transform: 'translateY(100%)' }}
      >
        <span style={{ visibility: 'hidden' }}>{nextPageName}</span>
      </div>
      <DebugStage />
    </PageTransitions>
  );
}
