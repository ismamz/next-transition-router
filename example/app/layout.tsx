import { JetBrains_Mono } from 'next/font/google';
import { Navbar } from './_components/navbar';
import './styles.css';

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  preload: true,
});

export const metadata = {
  title: 'Transition Router - page transitions in Next.js App Router',
  description:
    'Create animated transitions between pages using Next.js App Router and your favorite animation library.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={monoFont.variable}>
      <body>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
