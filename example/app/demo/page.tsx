import Link from 'next/link';
import { Link as TransitionLink } from 'next-transition-router';
import { Programmatic } from '../_components/programmatic';
import { Title } from '../_components/title';

export default function HomePage() {
  return (
    <>
      <section>
        <Title>
          <span style={{ display: 'inline-block' }}>Next</span>
          <span style={{ display: 'inline-block' }}>Transition</span>
          <span style={{ display: 'inline-block' }}>Router</span>
        </Title>
        <Link href="/about">About</Link>
      </section>
    </>
  );
}
