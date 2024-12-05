import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import type { ButtonProps } from './type';

export const buttonVariants = tv({
  base: 'rounded-md px-4 xl:px-8 py-3 xl:py-6 flex items-center justify-center shadow-[0px_2px_0px_rgba(0,0,0,0.045)] w-fit rounded-[10px] md:rounded-[25px] uppercase',
  variants: {
    color: {
      primary: 'bg-primary hover:bg-primary-disabled disabled:bg-primary-disabled text-white',
      white: 'bg-white hover:bg-[#e8e6e6] disabled:bg-[#e8e6e6] text-black',
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
