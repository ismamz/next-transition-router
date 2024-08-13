import Image from 'next/image';
import image1 from '@/assets/image-1.jpg';
import { ButtonLink } from '@/components/button';
import { Title } from '@/components/title';

export default function HomePage() {
  return (
    <div className="px-8 lg:px-16 h-screen flex items-center justify-center flex-col lg:flex-row">
      <Title className="text-6xl lg:text-9xl uppercase leading-[.85] mix-blend-difference text-white relative z-10">
        <div className="overflow-hidden">
          <span className="block">Next.js — </span>
        </div>
        <div className="overflow-hidden">
          <span className="block">
            <em>Transition </em>
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="block">Router</span>
        </div>
      </Title>

      <div className="relative z-0 lg:flex items-center">
        <Image
          src={image1}
          alt=""
          width={460}
          className="rotate-[-7deg] lg:-translate-x-20 w-[14rem] lg:w-[24rem]"
          priority
          id="home-image"
        />

        <ButtonLink href="/about" className="relative lg:absolute right-0">
          Next
        </ButtonLink>
      </div>
    </div>
  );
}
