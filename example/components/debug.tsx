"use client";

import { useTransitionState } from "next-transition-router";

export function Debug() {
  const { stage } = useTransitionState();

  return (
    <aside className="text-xs lg:text-base fixed bottom-0 right-0 mr-8 lg:mr-16 mb-6 lg:mb-8 bg-black/25 text-white z-[9999] px-4 lg:px-6 py-2 lg:py-3 rounded-full leading-[1] tracking-wide">
      stage: {stage}
    </aside>
  );
}
