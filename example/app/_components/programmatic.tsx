'use client';

import { useTransitionRouter } from '@ismamz/transitions';

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <>
      <button
        onClick={() => {
          alert("You're about to go to /about");
          router.push('/about');
        }}
      >
        programmatic push navigation (/about)
      </button>
      <button
        onClick={() => {
          alert("You're about to go to /about");
          router.replace('/about');
        }}
      >
        programmatic replace navigation (/about)
      </button>
    </>
  );
}
