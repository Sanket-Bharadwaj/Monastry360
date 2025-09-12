import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background w-full" style={{ margin: 0, padding: 0, width: '100%' }}>
      <Navigation />
      <main className="pt-24 w-full" style={{ margin: 0, padding: 0, width: '100%' }}>
        {children}
      </main>
    </div>
  );
}