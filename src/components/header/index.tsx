'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function Header({ block, entries }: ContentBlockRegistry) {
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

  const { menus } = entries;

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

            if (e.children?.length && !e.href) {
              return (
                <li key={e.label}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="[&[data-state=open]>svg]:rotate-180 flex items-center justify-center gap-1 outline-none">
                      {e.label}
                      <ChevronDown className="size-5 animate" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {e.children.map((l) => {
                        const isActive = l.href === '/' ? pathname === l.href : pathname.startsWith(l.href);
                        return (
                          <DropdownMenuItem key={l.label}>
                            <Link
                              href={l.href}
                              className={cn('font-normal', { 'font-medium': isActive, 'hover:underline': !isActive })}
                            >
                              {l.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              );
            }

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
