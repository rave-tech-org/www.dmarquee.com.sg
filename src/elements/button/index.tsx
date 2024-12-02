import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import type { ButtonProps } from './type';

export const buttonVariants = tv({
  base: 'rounded-md px-6 md:px-8 flex items-center justify-center shadow-[0px_2px_0px_rgba(0,0,0,0.045)] h-12 md:h-20 w-fit rounded-[25px] uppercase',
  variants: {
    color: {
      primary: 'bg-primary hover:bg-primary-disabled disabled:bg-primary-disabled text-white',
    },
  },

  defaultVariants: {
    color: 'primary',
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, type, className, disabled, children, ...rest }, ref) => {
    return (
      <button
        disabled={disabled}
        {...rest}
        ref={ref}
        type={type ?? 'button'}
        className={cn(buttonVariants({ className, color }))}
      >
        {children}
        <span className="sr-only">Button</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
