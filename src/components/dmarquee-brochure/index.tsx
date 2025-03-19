'use client';

import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { useEffect } from 'react';

export default function DmarqueeBrochure({ block }: ContentBlockRegistry) {
  console.log('block', block);
  
  useEffect(() => {
    window.open(block?.fileUrl || '', '_self', 'noopener,noreferrer');
  }, [block?.fileUrl]);
  
  return (
    <article id={block?.slug?.current} className="main-padding enquire-introduction-wrapper">
      Redirecting to our brochure link...
    </article>
  );
}