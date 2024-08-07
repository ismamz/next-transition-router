import { Providers } from './providers';
import './styles.css';

export const metadata = {
  title: 'Page Transitions in Next.js App Router',
  description:
    'Create animated transitions between pages using Next.js App Router and your favorite animation library.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
