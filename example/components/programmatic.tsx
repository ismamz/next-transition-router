"use client";

import { useTransitionRouter } from "next-transition-router";

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <>
      <button
        className="underline"
        onClick={() => {
          alert("You're about to go to /demo");
          router.push("/demo");
        }}
      >
        programmatic push
      </button>
      <button
        className="underline"
        onClick={() => {
          alert("You're about to go to /demo");
          router.replace("/demo");
        }}
      >
        programmatic replace
      </button>
    </>
  );
}
