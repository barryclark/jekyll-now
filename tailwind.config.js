import fs from "fs";

/** @type {import('tailwindcss').Config} */

let theme = {};
try {
  const themePath = "./theme.json";

  if (fs.existsSync(themePath)) {
    theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));
  }
} catch (err) {
  console.error('failed to parse custom styles', err)
}
const defaultTheme = {
  container: {
    center: true,
    padding: "2rem",
  },
  extend: {
    screens: {
      coarse: { raw: "(pointer: coarse)" },
      fine: { raw: "(pointer: fine)" },
      pwa: { raw: "(display-mode: standalone)" },
    },
    colors: {
      neutral: {
        1: "var(--color-neutral-1)",
        2: "var(--color-neutral-2)",
        3: "var(--color-neutral-3)",
        4: "var(--color-neutral-4)",
        5: "var(--color-neutral-5)",
        6: "var(--color-neutral-6)",
        7: "var(--color-neutral-7)",
        8: "var(--color-neutral-8)",
        9: "var(--color-neutral-9)",
        10: "var(--color-neutral-10)",
        11: "var(--color-neutral-11)",
        12: "var(--color-neutral-12)",
        a1: "var(--color-neutral-a1)",
        a2: "var(--color-neutral-a2)",
        a3: "var(--color-neutral-a3)",
        a4: "var(--color-neutral-a4)",
        a5: "var(--color-neutral-a5)",
        a6: "var(--color-neutral-a6)",
        a7: "var(--color-neutral-a7)",
        a8: "var(--color-neutral-a8)",
        a9: "var(--color-neutral-a9)",
        a10: "var(--color-neutral-a10)",
        a11: "var(--color-neutral-a11)",
        a12: "var(--color-neutral-a12)",
        contrast: "var(--color-neutral-contrast)",
      },
      accent: {
        1: "var(--color-accent-1)",
        2: "var(--color-accent-2)",
        3: "var(--color-accent-3)",
        4: "var(--color-accent-4)",
        5: "var(--color-accent-5)",
        6: "var(--color-accent-6)",
        7: "var(--color-accent-7)",
        8: "var(--color-accent-8)",
        9: "var(--color-accent-9)",
        10: "var(--color-accent-10)",
        11: "var(--color-accent-11)",
        12: "var(--color-accent-12)",
        contrast: "var(--color-accent-contrast)",
      },
      "accent-secondary": {
        1: "var(--color-accent-secondary-1)",
        2: "var(--color-accent-secondary-2)",
        3: "var(--color-accent-secondary-3)",
        4: "var(--color-accent-secondary-4)",
        5: "var(--color-accent-secondary-5)",
        6: "var(--color-accent-secondary-6)",
        7: "var(--color-accent-secondary-7)",
        8: "var(--color-accent-secondary-8)",
        9: "var(--color-accent-secondary-9)",
        10: "var(--color-accent-secondary-10)",
        11: "var(--color-accent-secondary-11)",
        12: "var(--color-accent-secondary-12)",
        contrast: "var(--color-accent-secondary-contrast)",
      },
      fg: {
        DEFAULT: "var(--color-fg)",
        secondary: "var(--color-fg-secondary)",
      },
      bg: {
        DEFAULT: "var(--color-bg)",
        inset: "var(--color-bg-inset)",
        overlay: "var(--color-bg-overlay)",
      },
      "focus-ring": "var(--color-focus-ring)",
    },
    borderRadius: {
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      "2xl": "var(--radius-2xl)",
      full: "var(--radius-full)",
    },
  },
  spacing: {
    px: "var(--size-px)",
    0: "var(--size-0)",
    0.5: "var(--size-0-5)",
    1: "var(--size-1)",
    1.5: "var(--size-1-5)",
    2: "var(--size-2)",
    2.5: "var(--size-2-5)",
    3: "var(--size-3)",
    3.5: "var(--size-3-5)",
    4: "var(--size-4)",
    5: "var(--size-5)",
    6: "var(--size-6)",
    7: "var(--size-7)",
    8: "var(--size-8)",
    9: "var(--size-9)",
    10: "var(--size-10)",
    11: "var(--size-11)",
    12: "var(--size-12)",
    14: "var(--size-14)",
    16: "var(--size-16)",
    20: "var(--size-20)",
    24: "var(--size-24)",
    28: "var(--size-28)",
    32: "var(--size-32)",
    36: "var(--size-36)",
    40: "var(--size-40)",
    44: "var(--size-44)",
    48: "var(--size-48)",
    52: "var(--size-52)",
    56: "var(--size-56)",
    60: "var(--size-60)",
    64: "var(--size-64)",
    72: "var(--size-72)",
    80: "var(--size-80)",
    96: "var(--size-96)",
  },
  darkMode: ["selector", '[data-appearance="dark"]'],
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { ...defaultTheme, ...theme },
};
