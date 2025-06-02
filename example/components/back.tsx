"use client";

import { useTransitionRouter } from "next-transition-router";

export function Back() {
  const { back } = useTransitionRouter();

  return (
    <button onClick={back} className="text-left underline underline-offset-4">
      back
    </button>
  );
}
