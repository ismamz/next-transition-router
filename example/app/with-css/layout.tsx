import { TransitionRouter } from 'next-transition-router';
import { DebugStage } from '../_components/debug';
import './styles.css';

export default function Layout({ children }) {
  return (
    <TransitionRouter duration={600}>
      {children}
      <DebugStage />
    </TransitionRouter>
  );
}
