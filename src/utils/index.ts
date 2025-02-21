import { PATHS } from '@/app/urls';
import { buildMenu } from '@/utils/build-menu';
import { formatCurrency } from '@/utils/format-currency';
import { styles } from '@/utils/style-function';
import { transformObject } from '@/utils/transform-object';

export { styles, transformObject, formatCurrency, buildMenu };

export function isOdd(n: number) {
  return Math.abs(n % 2) === 1;
}

export const createMenuFromDescription = ({
  description,
}: {
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: 'span';
      _key: string;
    }>;
    style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';
    listItem?: 'bullet' | 'number';
    markDefs?: Array<{
      href?: string;
      _type: 'link';
      _key: string;
    }>;
    level?: number;
    _type: 'block';
    _key: string;
  }>;
}) => {
  return description?.map((e) => {
    const doesntHaveHref = !e.markDefs?.length;

    return {
      label: e.children?.[0]?.text || 'Unlabeled',
      href: e.markDefs?.[0]?.href || PATHS.main,
      children: doesntHaveHref ? [] : null,
    };
  });
};
