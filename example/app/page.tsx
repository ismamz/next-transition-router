import Link from "next/link";
import Image from "next/image";
import { Link as TransitionLink } from "next-transition-router";
import { ButtonLink } from "@/components/button";
import { Title } from "@/components/title";
import { Programmatic } from "@/components/programmatic";
import { Reveal } from "@/components/reveal";
import { Back } from "@/components/back";
import demoImage from "@/assets/image.jpg";

export default function HomePage() {
  return (
    <>
      <div className="flex h-dvh flex-col items-center justify-center px-8 lg:flex-row lg:px-16">
        <Title className="relative z-10 text-6xl uppercase leading-[.85] text-white mix-blend-difference lg:text-9xl lg:leading-[.85]">
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

        <div className="relative z-0 items-center lg:flex">
          <Reveal>
            <Image
              src={demoImage}
              alt=""
              width={460}
              height={580}
              className="h-[280px] w-[220px] -translate-y-[1.5rem] rotate-[-7deg] scale-[1.2] object-cover lg:h-[36rem] lg:w-[28rem] lg:-translate-x-[4rem]"
              priority
            />
          </Reveal>

          <ButtonLink
            href="/demo"
            className="relative right-0 -mt-12 lg:absolute"
          >
            Navigate
          </ButtonLink>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 mb-6 ml-8 flex flex-col gap-3 py-2 text-sm text-gray-500 md:flex-row md:gap-4 lg:mb-8 lg:ml-16 lg:items-center lg:py-3">
        <span className="text-xs font-medium uppercase">Demo </span>

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

        <Back />

        <Link href="/demo#test" className="underline underline-offset-4">
          Hash
        </Link>
      </div>
    </>
  );
}
