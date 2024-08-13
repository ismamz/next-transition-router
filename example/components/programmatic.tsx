"use client";

import { useTransitionRouter } from "next-transition-router";

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <>
      <button
        className="underline"
        onClick={() => {
          alert("You're about to go to /about");
          router.push("/about");
        }}
      >
        programmatic push
      </button>
      <button
        className="underline"
        onClick={() => {
          alert("You're about to go to /about");
          router.replace("/about");
        }}
      >
        programmatic replace
      </button>
    </>
  );
}
