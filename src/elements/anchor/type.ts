export interface AnchorProps {
  children: React.ReactNode;
  offsetTop?: number;
  className?: string;
}

export interface AnchorContextProps {
  activeLink: string;
  scrollToAnchor: (anchorId: string) => void;
}
