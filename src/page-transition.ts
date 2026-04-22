import { useEffect } from "react";
import { useTransitionState } from "./context";

export interface PageTransitionCallbacks {
  onEnter?: (timeline: any) => void;
  onLeave?: (timeline: any) => void;
}

export function usePageTransition({ onEnter, onLeave }: PageTransitionCallbacks) {
  const { timeline, stage } = useTransitionState();

  useEffect(() => {
    if (stage === "leaving" && onLeave && timeline) {
      onLeave(timeline);
    }
  }, [stage, onLeave, timeline]);

  useEffect(() => {
    if (stage === "entering" && onEnter && timeline) {
      onEnter(timeline);
    }
  }, [stage, onEnter, timeline]);
}