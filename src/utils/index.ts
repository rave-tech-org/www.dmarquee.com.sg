import { buildMenu } from '@/utils/build-menu';
import { formatCurrency } from '@/utils/format-currency';
import { styles } from '@/utils/style-function';
import { transformObject } from '@/utils/transform-object';

export { styles, transformObject, formatCurrency, buildMenu };

export function isOdd(n: number) {
  return Math.abs(n % 2) === 1;
}
