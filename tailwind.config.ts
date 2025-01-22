import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8D579E',
        'primary-disabled': '#76308c',
        muted: '#333333',
        'muted-light': '#F2F2F2',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontSize: {
        h1: 'clamp(1.5rem, 3.5vw, 2.5rem)',
        h2: 'clamp(1.375rem, 3vw, 2.125rem)',
        h3: 'clamp(1.25rem, 2.5vw, 1.875rem)',
        h4: 'clamp(1.125rem, 2vw, 1.625rem)',
        h5: 'clamp(1rem, 1.75vw, 1.375rem)',
        h6: 'clamp(0.875rem, 1.5vw, 1.125rem)',
        body: 'clamp(0.85rem, 1.5vw, 1rem)',
        small: 'clamp(0.75rem, 1.25vw, 0.875rem)',
        xs: 'clamp(0.625rem, 1vw, 0.75rem)',
      },
      borderWidth: {
        '1': '1px',
      },
      fontFamily: {
        'brandon-grotesque': ['var(--font-brandon-grotesque)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.component-wrapper': {
          '@apply max-w-[393px] md:max-w-[1560px] mx-auto': {},
        },
        '.component-wrapper-small': {
          '@apply max-w-[393px] md:max-w-[1200px] mx-auto': {},
        },

        '.main-padding': {
          '@apply px-6 lg:px-10 py-8 lg:py-12': {},
        },
        '.main-padding-x': {
          '@apply px-6 lg:px-10': {},
        },

        '.main-padding-y': {
          '@apply py-8 lg:py-12': {},
        },

        '.main-padding-t': {
          '@apply pt-8 lg:pt-12': {},
        },

        '.gap-text': {
          '@apply gap-6': {},
        },

        '.gap-text-longer': {
          '@apply gap-[2rem]': {},
        },
        '.space-padding': {
          '@apply space-y-8 lg:space-y-12': {},
        },

        '.space-text': {
          '@apply space-y-6': {},
        },
        '.space-text-longer': {
          '@apply space-y-[2rem]': {},
        },

        '.animate': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
        },
        '.animate-longer-2': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '500ms',
        },
        '.animate-longer-3': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '1000ms',
        },

        // for absolute, sticky, or fixed positions
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
    require('tailwindcss-animate'),
  ],
} satisfies Config;

export default config;
