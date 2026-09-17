import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "../../packages/shared-data/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: '#060a11',
        surface: '#0b1220',
        line: '#1d2b3f',
        signal: '#3ae0c6',
        'signal-dim': '#1a6f66',
        ink: '#e8eefa',
        muted: '#8194ae',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    },
  },
  plugins: [],
} satisfies Config;
