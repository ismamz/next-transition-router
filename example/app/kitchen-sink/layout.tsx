import { DebugStage } from '../_components/debug';
import { Providers } from './providers';

export default function Layout({ children }) {
  return (
    <Providers>
      {children}
      <DebugStage />
    </Providers>
  );
}
