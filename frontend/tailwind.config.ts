import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.html',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
      screens: {
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },

    fontFamily: {
      'lato': ['Lato', 'sans-serif'],
      'nunito-sans': ['Nunito Sans', 'sans-serif'],
    },
    fontSize: {
      '2xs': ['0.625rem', '1'], // 10px
      'xs': ['0.75rem', '1.2'], // 12px
      'sm': ['0.875rem', '1.4'], // 14px
      'base': ['1rem', '1.5'], // 16px
      'lg': ['1.125rem', '1.55'], // 18px
      'xl': ['1.25rem', '1.55'], // 20px
      '2xl': ['1.5rem', '1.35'], // 24px
      '3xl': ['1.75rem', '1.43'], // 28px
      '4xl': ['2rem', '1.33'], // 32px
      '5xl': ['2.25rem', '1.33'], // 36px
      '6xl': ['3rem', '1.25'], // 48px
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      light: '#FCFCFC',
      white: '#FFFFFF',
      dark: {
        50: '#F3F3F3',
        100: '#E8E8E8',
        200: '#D1D1D1',
        300: '#B9B9B9',
        400: '#A2A2A2',
        500: '#868686',
        600: '#747474',
        700: '#5D5D5D',
        800: '#454545',
        900: '#2E2E2E',
        DEFAULT: '#171717',
      },
      red: {
        50: '#FEF6F6',
        100: '#FCEDED',
        200: '#FADCDB',
        DEFAULT: '#E44E4D',
      },
      yellow: {
        50: '#FFFCF5',
        100: '#FFF9EB',
        200: '#FFF3D6',
        DEFAULT: '#FFC434',
      },
      green: {
        dark: {
          50: '#F5F9F4',
          100: '#ECF3EA',
          200: '#D9E8D5',
          300: '#C6DCC0',
          400: '#B2D1A',
          500: '#9FC596',
          600: '#8CBA80',
          700: '#79AE6B',
          800: '#67A158',
          900: '#598C4D',
          DEFAULT: '#4C7741',
        },
        light: {
          50: '#FBFCF5',
          100: '#F7F8EB',
          200: '#F0F2D6',
          300: '#E8EBC2',
          400: '#E0E5AE',
          500: '#D8DE99',
          600: '#D1D785',
          700: '#C9D171',
          800: '#C1CA5C',
          900: '#BAC448',
          DEFAULT: '#ACB63B',
        },
      },
      // colors from shadcn, please do not use
      border: '#A2A2A2',
      input: '#E0E5AE',
      ring: '#D1D785',
      background: '#FCFCFC',
      foreground: '#171717',
      primary: {
        DEFAULT: '#4C7741',
        foreground: '#FCFCFC',
      },
      secondary: {
        DEFAULT: '#ACB63B',
        foreground: '#171717',
      },
      destructive: {
        DEFAULT: '#747474',
        foreground: '#171717',
      },
      muted: {
        DEFAULT: '#747474',
        foreground: '#171717',
      },
      accent: {
        DEFAULT: '#747474',
        foreground: '#171717',
      },
      popover: {
        DEFAULT: '#FCFCFC',
        foreground: '#171717',
      },
      card: {
        DEFAULT: '#FCFCFC',
        foreground: '#171717',
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config