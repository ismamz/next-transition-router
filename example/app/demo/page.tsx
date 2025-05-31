import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { Title } from "@/components/title";
import { Reveal } from "@/components/reveal";
import demoImage from "@/assets/image.jpg";
import Link from "next/link";

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

      <div id="test" className="flex h-dvh items-center justify-center">
        <p className="text-3xl">
          <Link href="#" className="underline underline-offset-4">
            top ↑
          </Link>
        </p>
      </div>
    </>
  );
}
