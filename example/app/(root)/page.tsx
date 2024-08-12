import Link from 'next/link';
import { Link as TransitionLink } from 'next-transition-router';
import { Programmatic } from '../_components/programmatic';
import { Title } from '../_components/title';

export default function HomePage() {
  return (
    <>
      <section>
        <Title>
          <span style={{ display: 'inline-block' }}>N</span>
          <span style={{ display: 'inline-block' }}>T</span>
          <span style={{ display: 'inline-block' }}>R</span>
        </Title>
        <Link href="/about">About</Link>
      </section>
    </>
  );
}
