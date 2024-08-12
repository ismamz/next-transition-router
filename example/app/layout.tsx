import { Navbar } from './_components/navbar';
import './styles.css';

export const metadata = {
  title: 'Transition Router - page transitions in Next.js App Router',
  description:
    'Create animated transitions between pages using Next.js App Router and your favorite animation library.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
