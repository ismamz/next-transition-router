'use client';

import { useTransitionState } from 'next-transition-router';

export function Debug() {
  const { stage } = useTransitionState();

  return (
    <aside className="fixed bottom-0 right-0 mr-6 mb-6 bg-black/25 text-white z-[9999] px-8 py-4 rounded-full leading-[1]">
      stage: {stage}
    </aside>
  );
}
