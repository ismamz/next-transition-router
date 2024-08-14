"use client";

import { useTransitionRouter } from "next-transition-router";

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <>
      <button
        className="text-left underline underline-offset-4"
        onClick={() => {
          alert("You're about to go to /demo");
          router.push("/demo");
        }}
      >
        programmatic push
      </button>
      <button
        className="text-left underline underline-offset-4"
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
