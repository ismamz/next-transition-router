'use client';

import { useTransitionState } from 'next-transition-router';

export function DebugStage() {
  const { stage } = useTransitionState();

  return <aside id="debug">stage: {stage}</aside>;
}
