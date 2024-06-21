/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/packages/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#3e2486",
        "brand-purple-dark": "#22144a",
        "brand-purple-light": "#9747ff",
        "brand-green": "#1ad69c",
        "brand-yellow": "#f3c449",
        "brand-red": "#e00303",
        "brand-red-dark": "#b00d2a",
        "brand-blue": "#2850e5",
        "brand-gray": "#d9d9d9",
        "brand-white": "#f7f7f7",
      },
      fontFamily: {
        vt323: ["var(--vt323-regular)", "monospace"],
        robotoRegular: ["var(--roboto-regular)", "monospace"],
        robotoCondensed: ["var(--roboto-condensed)", "monospace"],
      },
      boxShadow: {
        "custom-green": "4px 4px 4px #1AD69C",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
  plugins: [],
};
