"use client";

import { useTransitionRouter } from "next-transition-router";

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <>
      <button
        className="text-left underline underline-offset-4"
        onClick={() => {
          alert("Do something before navigating away");
          router.push("/demo");
        }}
      >
        programmatic push
      </button>
      <button
        className="text-left underline underline-offset-4"
        onClick={() => {
          alert("Do something before navigating away");
          router.replace("/demo");
        }}
      >
        programmatic replace
      </button>
    </>
  );
}
