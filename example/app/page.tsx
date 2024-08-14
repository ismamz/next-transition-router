import Link from "next/link";
import Image from "next/image";
import { Link as TransitionLink } from "next-transition-router";
import { ButtonLink } from "@/components/button";
import { Title } from "@/components/title";
import { Programmatic } from "@/components/programmatic";
import demoImage from "@/assets/image.jpg";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <>
      <div className="px-8 lg:px-16 h-dvh flex items-center justify-center flex-col lg:flex-row">
        <Title className="text-6xl lg:text-9xl uppercase leading-[.85] lg:leading-[.85] mix-blend-difference text-white relative z-10">
          <div className="overflow-hidden px-2">
            <span className="block">Next.js — </span>
          </div>
          <div className="overflow-hidden px-2">
            <span className="block">
              <em>Transition </em>
            </span>
          </div>
          <div className="overflow-hidden px-2">
            <span className="block">Router</span>
          </div>
        </Title>

        <div className="relative z-0 lg:flex items-center">
          <Reveal>
            <Image
              src={demoImage}
              alt=""
              width={460}
              height={580}
              className="rotate-[-7deg] lg:-translate-x-[4rem] -translate-y-[1.5rem] w-[220px] h-[280px] lg:w-[28rem] lg:h-[36rem] object-cover scale-[1.2]"
              priority
            />
          </Reveal>

          <ButtonLink
            href="/demo"
            className="relative lg:absolute right-0 -mt-12"
          >
            Navigate
          </ButtonLink>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 mb-6 lg:mb-8 ml-8 lg:ml-16 z-50 text-gray-500 text-sm flex flex-col md:flex-row gap-3 md:gap-4 lg:items-center py-2 lg:py-3">
        <span className="uppercase font-medium text-xs">Demo </span>

        <Link
          href="/demo"
          data-transition-ignore
          className="underline underline-offset-4"
        >
          ignore transition
        </Link>

        <TransitionLink
          href="/demo"
          data-transition-ignore
          className="underline underline-offset-4"
        >
          custom link
        </TransitionLink>

        <Programmatic />
      </div>
    </>
  );
}
