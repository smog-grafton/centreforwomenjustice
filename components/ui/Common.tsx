import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
      secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-sm',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-slate-600 hover:bg-slate-100',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  light = false,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}) => (
  <div className={cn('mb-12 space-y-4', centered && 'text-center')}>
    <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-serif font-bold', light ? 'text-white' : 'text-slate-900')}>
      {title}
    </h2>
    {subtitle && (
      <p className={cn('text-lg max-w-2xl', centered && 'mx-auto', light ? 'text-white/80' : 'text-slate-600')}>
        {subtitle}
      </p>
    )}
  </div>
);
