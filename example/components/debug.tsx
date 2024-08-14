"use client";

import { useTransitionState } from "next-transition-router";

export function Debug() {
  const { stage } = useTransitionState();

  return (
    <aside className="fixed bottom-0 right-0 z-[9999] mb-6 mr-8 rounded-full bg-black/25 px-4 py-2 text-xs leading-[1] tracking-wide text-white lg:mb-8 lg:mr-16 lg:px-6 lg:py-3 lg:text-base">
      stage: {stage}
    </aside>
  );
}
