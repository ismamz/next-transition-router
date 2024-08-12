import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="with-css">
      <h1>About</h1>
      <p>
        This is an example of a Next.js app with CSS transitions using{' '}
        <a
          href="https://github.com/ismamz/next-transition-router"
          target="_blank"
        >
          next-transition-router
        </a>
        .
      </p>
      <Link href="/with-css">← Back to Home</Link>

      <hr style={{ marginBlock: '3rem' }} />

      <Link href="https://github.com/ismamz/next-transition-router/tree/main/example/with-css">
        See source code for this example
      </Link>
    </main>
  );
}
