"use client";

import { useContext } from "react";
import NextLink from "next/link";
import { Link, useTransitionRouter } from "next-transition-router";
import { TransitionSettingsContext } from "@/app/providers";
import { Back } from "./back";

export function SearchParamsNavigation({ page }: { page: string }) {
  const { auto, setAuto, enabled, setEnabled } = useContext(
    TransitionSettingsContext,
  );
  const router = useTransitionRouter();

  return (
    <div className="flex max-w-3xl flex-col items-center gap-4 text-base text-white">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
        Animate search parameter changes
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={auto}
          onChange={(event) => setAuto(event.target.checked)}
        />
        Detect links automatically
      </label>
      <span>Current: {page}</span>
      <div className="flex flex-wrap justify-center gap-4 underline underline-offset-4">
        <NextLink href="/demo?page=1">Page 1 (Next Link)</NextLink>
        <a href="?page=2">Page 2 (auto)</a>
        <Link href={{ pathname: "/demo", query: { page: "3" } }}>
          Page 3 (custom Link)
        </Link>
        <button onClick={() => router.push("?page=4", { scroll: false })}>
          Push page 4
        </button>
        <button onClick={() => router.replace("?page=5", { scroll: false })}>
          Replace page 5
        </button>
        <button onClick={() => router.push("/demo", { scroll: false })}>
          Clear filters
        </button>
        <button onClick={() => router.push("?q=a%20b", { scroll: false })}>
          Search a b
        </button>
        <button onClick={() => router.push("?q=a+b", { scroll: false })}>
          Same search with +
        </button>
        <Back />
      </div>
    </div>
  );
}
