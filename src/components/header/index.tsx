'use client';

import { PATHS } from '@/app/urls';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { buildMenu } from '@/utils';

export default function Header({ block }: ContentBlockRegistry) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && open) setOpen(false);
    };

    const ctr = new AbortController();
    window.addEventListener('resize', handleResize, { signal: ctr.signal });

    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      ctr.abort();
    };
  }, [open]);

  const menus = buildMenu(block?.description);

  if (!block) return null;

  return (
    <Fragment>
      <nav
        id={block.slug?.current}
        className={cn('animate sticky top-0 w-full py-6 lg:py-8 bg-white z-50 main-padding-x', {
          '-translate-y-full': !isVisible,
          'shadow-lg': lastScrollY > 0 || open,
        })}
      >
        <div className="component-wrapper flex justify-between gap-6">
          {block.imageUrl ? (
            <Link href="/">
              <Image src={block.imageUrl} alt="" className="w-44 lg:w-56" width={500} height={500} />
            </Link>
          ) : null}

          <button className="md:hidden flex items-center justify-center" type="button" onClick={() => setOpen(!open)}>
            <DynamicIcon name={open ? 'x' : 'menu'} size={30} />
          </button>

          <ul className="hidden lg:flex gap-6 items-center">
            {menus?.map((item) => {
              const href = item.marks?.href || PATHS.main;
              const isActive = href === PATHS.main ? pathname === href : pathname.startsWith(href);

              if (item.subMenu?.length) {
                const subMenuHrefs = item.subMenu?.map((subItem) => subItem.marks?.href || PATHS.main);

                return (
                  <li key={item.id}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="[&[data-state=open]>svg]:rotate-180 flex items-center justify-center gap-1 outline-none">
                        <p className={cn({ 'font-medium': subMenuHrefs.includes(pathname) })}>{item.text}</p>
                        <ChevronDown className="size-5 animate" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.subMenu.map((subItem) => {
                          const subItemHref = subItem.marks?.href || PATHS.main;
                          const isSubItemActive =
                            subItemHref === PATHS.main ? pathname === subItemHref : pathname.startsWith(subItemHref);

                          return (
                            <DropdownMenuItem key={subItem.text} className="group p-0">
                              <Link
                                href={subItemHref}
                                className={cn('size-full font-normal px-2 py-1', {
                                  'font-medium': isSubItemActive,
                                  'group-hover:underline': !isSubItemActive,
                                })}
                              >
                                {subItem.text}
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
                <li key={item.id || item.text}>
                  <Link href={href} className={cn({ 'font-medium': isActive, 'hover:underline': !isActive })}>
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <nav
        className={cn(
          'z-40 fixed top-0 md:hidden flex items-center gap-6 justify-center flex-col size-full bg-white animate-longer-2 ease-in-out',
          { 'opacity-0 invisible -translate-y-full h-0': !open }
        )}
      >
        {open ? (
          <ul className="flex gap-4 flex-col">
            {menus?.map((item) => {
              const href = item.marks?.href || PATHS.main;
              const isActive = href === PATHS.main ? pathname === href : pathname.startsWith(href);

              if (item.subMenu?.length) {
                const subMenuHrefs = item.subMenu?.map((subItem) => subItem.marks?.href || PATHS.main);

                return (
                  <li key={item.id || item.text}>
                    <Accordion type="multiple">
                      <AccordionItem value={item.text}>
                        <AccordionTrigger className="p-0 [&[data-state=open]>svg]:rotate-180 gap-4 outline-none hover:no-underline">
                          <div
                            className={cn('text-xl font-normal', { 'font-medium': subMenuHrefs.includes(pathname) })}
                          >
                            {item.text}
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-0 pb-0 pt-4 flex flex-col gap-2">
                          {item.subMenu.map((subItem) => {
                            const subItemHref = subItem.marks?.href || PATHS.main;
                            const isSubItemActive =
                              subItemHref === PATHS.main ? pathname === subItemHref : pathname.startsWith(subItemHref);

                            return (
                              <Link
                                key={subItemHref || subItem.text}
                                href={subItemHref}
                                className={cn('size-full font-normal pl-4', {
                                  'font-medium': isSubItemActive,
                                  'group-hover:underline': !isSubItemActive,
                                })}
                              >
                                {subItem.text}
                              </Link>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                );
              }

              return (
                <li key={item.id || item.text} className="flex flex-col group w-fit">
                  <Link
                    type="button"
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn('text-granite transition-none !text-xl', {
                      'text-black font-semibold': isActive,
                      'group-hover:text-black': !isActive,
                    })}
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </nav>
    </Fragment>
  );
}
