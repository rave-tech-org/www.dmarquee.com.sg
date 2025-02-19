'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    const ctr = new AbortController();
    window.addEventListener('scroll', handleScroll, { signal: ctr.signal });

    return () => ctr.abort();
  }, [lastScrollY]);

  const menus = block?.description?.map((e) => {
    const doesntHaveHref = !e.markDefs?.length;

    return {
      label: e.children?.[0]?.text || 'Unlabeled',
      href: e.markDefs?.[0]?.href || '/',
      children: doesntHaveHref ? [] : null,
    };
  });

  return (
    <nav
      id={block.slug?.current}
      className={cn('animate sticky top-0 w-full py-6 lg:py-8 bg-white z-50 main-padding-x', {
        '-translate-y-full': !isVisible,
        'shadow-lg': lastScrollY > 0,
      })}
    >
      <div className="component-wrapper flex justify-between gap-6">
        <NextImage src={block.imageUrl} className="w-44 lg:w-56" />
        <ul className="hidden lg:flex gap-6 items-center">
          {menus?.map((e) => {
            const isActive = e.href === '/' ? pathname === e.href : pathname.startsWith(e.href);
            return (
              <li key={e.label}>
                <Link href={e.href} className={cn({ 'font-medium': isActive, 'hover:underline': !isActive })}>
                  {e.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
