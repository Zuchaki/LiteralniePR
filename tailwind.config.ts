import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        heading: ['40px', { lineHeight: '70.4px', fontWeight: 600 }],
        'body-l': ['18px', { lineHeight: '27px', fontWeight: 400 }],
        'body-m': ['16px', { lineHeight: '25.6px', fontWeight: 400 }],
        'body-s': ['14px', { lineHeight: '18.2px', fontWeight: 400 }],
      },
      colors: {
        primary: {
          '50': '#f6f6f9',
          '100': '#ededf1',
          '200': '#d7d8e0',
          '300': '#b4b6c5',
          '400': '#8b8da5',
          '500': '#6d708a',
          '600': '#575972',
          '700': '#47485d',
          '800': '#3e3f4e',
          '900': '#363744',
          '950': '#19191f',
        },
        // Neutral Colors
        neutral: {
          100: '#F4F4F4',
          200: '#E0E0E0',
          300: '#CCCCCC',
          400: '#B8B8B8',
          500: '#A3A3A3',
          600: '#8F8F8F',
          700: '#7A7A7A',
          800: '#666666',
          900: '#515151',
          1000: '#3D3D3D',
        },
        error: { DEFAULT: '#782424', light: '#fce4e4' },
        success: '#166517',
        warning: '#c47c1b',
      },
    },
  },
  plugins: [],
};
export default config;
