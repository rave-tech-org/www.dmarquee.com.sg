'use client';

import { PATHS } from '@/app/urls';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
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
        {block.imageUrl ? (
          <Link href={PATHS.main}>
            <Image src={block.imageUrl} alt="" className="w-44 lg:w-56" width={230} height={230} />
          </Link>
        ) : null}
        <ul className="hidden lg:flex gap-6 items-center">
          {menus?.map((e) => {
            const isActive = e.href === PATHS.main ? pathname === e.href : pathname.startsWith(e.href);

            if (e.children?.length && !e.href) {
              const hrefs = e.children?.map((e) => e.href);

              return (
                <li key={e.label}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="[&[data-state=open]>svg]:rotate-180 flex items-center justify-center gap-1 outline-none">
                      <p className={cn({ 'font-medium': hrefs.includes(pathname) })}>{e.label}</p>
                      <ChevronDown className="size-5 animate" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {e.children.map((l) => {
                        const isActive = l.href === PATHS.main ? pathname === l.href : pathname.startsWith(l.href);
                        return (
                          <DropdownMenuItem key={l.label} className="group p-0">
                            <Link
                              href={l.href}
                              className={cn('size-full font-normal px-2 py-1', {
                                'font-medium': isActive,
                                'group-hover:underline': !isActive,
                              })}
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
