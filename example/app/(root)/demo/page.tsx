import Image from "next/image";
import imageFull from "@/assets/image-full.jpg";
import { ButtonLink } from "@/components/button";
import { Title } from "@/components/title";
import { Reveal } from "@/components/reveal";

export default function AboutPage() {
  return (
    <>
      <div className="px-8 lg:px-16 lg:max-w-[75%] mx-auto h-dvh flex items-center flex-col justify-center">
        <Title className="uppercase font-normal text-[3.75rem] md:text-[8rem] lg:text-[12rem] relative z-20 mix-blend-color-dodge leading-[.85] text-center text-[tomato] mb-8 mt-64 lg:mt-0">
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
          src={imageFull}
          className="w-full h-full object-cover object-bottom scale-[2]"
          alt=""
          priority
        />
      </Reveal>
    </>
  );
}
