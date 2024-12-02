import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import type { buttonVariants } from '.';

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { children: React.ReactNode };
