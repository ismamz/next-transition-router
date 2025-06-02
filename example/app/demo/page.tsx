import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { Title } from "@/components/title";
import { Reveal } from "@/components/reveal";
import demoImage from "@/assets/image.jpg";
import Link from "next/link";
import { Link as TransitionLink } from "next-transition-router";

export default function DemoPage() {
  return (
    <>
      <div className="mx-auto flex h-dvh flex-col items-center justify-center px-8 lg:max-w-[75%] lg:px-16">
        <Title className="relative z-20 mb-8 mt-64 text-center text-[3.75rem] font-normal uppercase leading-[.85] text-[tomato] mix-blend-color-dodge md:text-[8rem] lg:mt-0 lg:text-[12rem]">
          <div className="overflow-hidden px-2">
            <span className="block">Make the</span>
          </div>
          <div className="overflow-hidden px-2">
            <span className="block">
              <em>Transition</em>
            </span>
          </div>
        </Title>

        <div className="relative z-50">
          <ButtonLink href="/" back>
            Back
          </ButtonLink>
        </div>
      </div>

      <Reveal className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={demoImage}
          className="h-full w-full scale-[2] object-cover object-bottom"
          alt=""
          priority
        />
      </Reveal>

      <section className="flex h-dvh items-center justify-center bg-white">
        <div className="flex flex-col gap-6 px-4 md:flex-row">
          <TransitionLink
            data-transition-ignore
            href="/demo"
            className="text-md rounded-full bg-primary px-6 py-3 text-center text-white"
          >
            same pathname
          </TransitionLink>
          <TransitionLink
            data-transition-ignore
            href="/demo#test"
            className="text-md rounded-full bg-primary px-6 py-3 text-center text-white"
          >
            same pathname with hash
          </TransitionLink>
          <TransitionLink
            data-transition-ignore
            href="/"
            className="text-md rounded-full bg-primary px-6 py-3 text-center text-white"
          >
            simple custom link
          </TransitionLink>
          <TransitionLink
            data-transition-ignore
            href={{
              pathname: "/",
              query: { name: "test" },
            }}
            className="text-md rounded-full bg-primary px-6 py-3 text-center text-white"
          >
            url object
          </TransitionLink>
        </div>
      </section>

      <div id="test" className="flex h-dvh items-center justify-center">
        <p className="flex gap-6 text-lg md:text-3xl">
          <Link href="#" className="underline underline-offset-4">
            top ↑ (#)
          </Link>
          <Link href="/demo#" className="underline underline-offset-4">
            top ↑ (/demo#)
          </Link>
        </p>
      </div>
    </>
  );
}
