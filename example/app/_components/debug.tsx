'use client';

import { useTransitionState } from '@ismamz/transitions';

export function DebugStage() {
  const { stage } = useTransitionState();

  return <aside id="debug">stage: {stage}</aside>;
}
