// import { sveltekit } from '@sveltejs/kit/vite';
// /** @type {import('vite').UserConfig} */
// const config = {
// 	plugins: [sveltekit()]
// };
// export default config;


import { sveltekit } from '@sveltejs/kit/vite';
import mdsvex from 'mdsvex';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      // MDsveX options
      onwarn: (warning, handler) => {
        // Print warning details
        console.warn(warning);

        // Print offending file
        if (warning.loc && warning.loc.file) {
          console.warn(`Error in file: ${warning.loc.file}`);
        }

        handler(warning);
      }
    })
  ]
};

export default config;
