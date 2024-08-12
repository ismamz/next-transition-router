import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <p>This is an example of a page with GSAP animations.</p>
      <Link href="/with-gsap">Back to Home</Link>
    </>
  );
}
