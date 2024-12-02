import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: '#117dc2',
        secondary: '#1e1e1e',
        accent: '#1b75bb',
        text: '#333',
        muted: '#888888',
        border: '#e0e0e0',
        danger: ' #ec1c24',
        'tag-success': 'rgba(0, 254, 30, 0.2)',
        'tag-primary': ' rgba(0, 254, 251, 0.2)',
        'tag-special': 'rgba(236, 28, 36, 0.2)',
        rating: '#ffc107',
        'book-now': '#c3996b',
      },

      fontFamily: {
        default: ['var(--font-overpass)', ...fontFamily.sans],
        secondary: ['var(--font-kapelka)', ...fontFamily.sans],
      },
      screens: {
        '3xl': '2056px',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },

  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.animate': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
        },
        '.animate-longer': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '500ms',
        },
        '.centered': {
          top: '50%',
          left: '50%',
          '--tw-translate-x': '-50%',
          '--tw-translate-y': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-bottom': {
          bottom: '0',
          left: '50%',
          '--tw-translate-x': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-top': {
          top: '0',
          left: '50%',
          '--tw-translate-x': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-left': {
          top: '50%',
          left: '0',
          '--tw-translate-y': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-right': {
          top: '50%',
          right: '0',
          '--tw-translate-y': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
        '.centered-horizontal': {
          left: '50%',
          '--tw-translate-x': '-50%',
          transform:
            'translate(var(--tw-translate-x), var(--tw-translate-y)) ' +
            'rotate(var(--tw-rotate)) ' +
            'skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
            'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
        },
      });
    }),
    require('tailwindcss-motion'),
  ],
} satisfies Config;

export default config;
