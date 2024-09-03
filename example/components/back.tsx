"use client";

import { useTransitionRouter } from "next-transition-router";

export function Back() {
  const { back } = useTransitionRouter();

  return (
    <button onClick={back} className="underline underline-offset-4">
      router.back()
    </button>
  );
}
