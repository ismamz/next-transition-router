import { Debug } from '@/components/debug';
import { Providers } from './providers';
import { Header } from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header />
      {children}
      <Debug />
    </Providers>
  );
}
