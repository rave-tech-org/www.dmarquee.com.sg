export type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
export interface ViewInProps {
  children: React.ReactNode;
  immediate?: boolean;
  threshold?: number;
  once?: boolean;
  variant?: AnimationVariant;
  duration?: number;
  delay?: number;
}
