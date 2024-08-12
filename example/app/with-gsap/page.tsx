import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>This is an example of a page with GSAP animations.</p>
      <Link href="/with-gsap/about">Go to About</Link>
    </>
  );
}
