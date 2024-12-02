import { ReactNode } from 'react';

export interface TravelInterestCardProps {
  title?: string | null;
  desc: string | ReactNode;
  imageUrl?: string | null;
}
