# iil.is

Based on [hagura-sveltekit](https://github.com/sharu725/hagura-sveltekit) and deployed to Netlify.

## Editing

### Header & Footer

- Header and Footer sitemap links come from `./src/routes/pages.json`
- Footer contact links come from `./src/routes/contact.json`

### Home, About, Collaborate

- Edit `./src/routes/[home|about|collaborate].md`

### Team, Research, Open Lab, News

Each of these pages follows the same method:
- A layout described in the `./src/layouts` folder.
- Corresponding Markdown files in each folder `./src/routes/[page]/*.md` for the page items (team members, research projects, Open Labs, and news items).

Once you understand how one of these pages works, you will be able to understand the rest.

For example, this is how you would add/edit team members, and the team page itself:

- To add a new member, create a file in `./src/routes/team/[firstname].md`
- See other members in the same `team` folder for examples.
- The order they appear on the page with is described in `./src/routes/team/order.json`
- To edit the page itself, go to `./src/layouts/Team.svelte`

## Installation

Run the following commands.

`git clone https://github.com/intelligent-instruments-lab/iil/is`

Use node 16

`npm install` to install

`npm run dev` for development

`npm run build` for production

`npm run preview` to preview a production build
