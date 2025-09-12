import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'none';
}

export function PageContainer({ children, className = '', maxWidth = 'none' }: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    none: ''
  };

  return (
    <div className={`page-wrapper ${className}`}>
      <div className={`container-responsive ${maxWidthClasses[maxWidth]} ${maxWidth !== 'none' ? 'mx-auto' : ''}`}>
        {children}
      </div>
    </div>
  );
}