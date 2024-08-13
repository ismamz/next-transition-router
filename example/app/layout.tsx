import localFont from 'next/font/local';
import './styles.css';
import { cn } from './utils';

export const metadata = {
  title: 'Transition Router - page transitions in Next.js App Router',
  description:
    'Create animated transitions between pages using Next.js App Router and your favorite animation library.',
};

export const primaryFont = localFont({
  variable: '--font-primary',
  preload: true,
  src: [
    {
      path: '../assets/fonts/NeueMontreal-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeueMontreal-Italic.woff2',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: '../assets/fonts/NeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeueMontreal-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(primaryFont.variable)}>
      <body>{children}</body>
    </html>
  );
}
