import { ContentBlock } from '@/sanity/sanity.types';

interface SubMenu {
  text: string;
  marks?:
    | {
        href?: string;
        _type: 'link';
        _key: string;
      }
    | undefined;
}

interface MenuItem extends SubMenu {
  id: number;
  subMenu: SubMenu[];
}

export const buildMenu = (description?: ContentBlock['description'] | null, type: string = 'h3') => {
  return description?.reduce<MenuItem[]>((acc, desc, index) => {
    const child = desc.children?.[0];
    const markKey = child?.marks?.[0];
    const mark = desc.markDefs?.find((mark) => mark._key === markKey);

    if (desc.style === type && child) {
      acc.push({
        id: index,
        text: child.text || '',
        marks: mark,
        subMenu: [],
      });
    } else if (desc.listItem === 'bullet' && child) {
      const parentMenu = acc[acc.length - 1];
      parentMenu?.subMenu.push({ text: child.text || '', marks: mark });
    }

    return acc;
  }, []);
};
