import Link from 'next/link';

import { Title } from '../../_components/title';

export default function AboutPage() {
  return (
    <>
      <section>
        <Title>
          <span style={{ display: 'inline-block' }}>A</span>
          <span style={{ display: 'inline-block' }}>b</span>
          <span style={{ display: 'inline-block' }}>o</span>
          <span style={{ display: 'inline-block' }}>u</span>
          <span style={{ display: 'inline-block' }}>t</span>
        </Title>
        <Link href="/">Home</Link>
      </section>
      <section>
        <Link href="/">Home</Link>
      </section>
      <section id="example">example</section>
    </>
  );
}
