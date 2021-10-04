const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");
const colors = require('tailwindcss/colors');

module.exports = {
  mode: "aot",
  purge: {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    options: {
      defaultExtractor: (content) => [
        // If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group
        ),
      ],
    },
    safelist: [/^svelte-[\d\w]+$/],
  },
  theme: {
    extend: {},
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '0': '0',
      '45': '45deg',
      '90': '90deg',
      '135': '135deg',
      '180': '180deg',
      '270': '270deg',
    },
    fontFamily: {
      sans: ["Friedrich-Book"],
      hauser: ["SMHauser-60"]
    },
    colors: {
      primary: {
        DEFAULT: '#9cb5b0',
        50:  '#f5f8f7',
        100: '#e1e9e7',
        200: '#cedad8',
        300: '#bacbc8',
        400: '#a6bcb8',
        500: '#7d918d',
        600: '#5e6d6a',
        700: '#4e5b58',
        800: '#3e4846',
        900: '#2f3635',
      },
      secondary: {
        DEFAULT: '#ffed00',
        50:  '#fffde6',
        100: '#fffbcc',
        200: '#fff899',
        300: '#fff466',
        400: '#fff133',
        500: '#e6d500',
        600: '#ccbe00',
        700: '#b3a600',
        800: '#998e00',
        900: '#807700',
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
