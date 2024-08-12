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
        <Link href="/about" target="_blank">
          /about (_blank)
        </Link>
        <Link href="#example">#example</Link>
        <Link href="/#example">/#example</Link>
        <Link href="/about#example">/about#example</Link>
        <Programmatic />
        <Link href="/about" data-transition-ignore>
          Ignore (Link)
        </Link>
        <a href="/about" data-transition-ignore>
          Ignore (a)
        </a>
        <TransitionLink href="/about" data-transition-ignore>
          Ignore event delegation and use custom Link component
        </TransitionLink>
        <TransitionLink href="/about" data-transition-ignore replace>
          Ignore event delegation and use custom Link component (replace)
        </TransitionLink>

        <TransitionLink
          href="/about"
          data-transition-ignore
          replace
          scroll={false}
        >
          Ignore event delegation and use custom Link component (scroll = false)
        </TransitionLink>
      </section>

      <section id="example">
        <h1>#example</h1>
      </section>

      <section>
        <Link href="/about">About</Link>
      </section>
    </>
  );
}