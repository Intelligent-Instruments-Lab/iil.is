module.exports = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [
    [
      require("remark-github"),
      {
        // Use your own repository
        repository: "https://github.com/svelte-add/mdsvex.git",
      },
    ],
    require("remark-abbr"),
  ],
  rehypePlugins: [
    require("rehype-slug"),
    [
      require("rehype-autolink-headings"),
      {
        behavior: "wrap",
      },
    ],
  ],
  layout: {
    about: "./src/layouts/About.svelte",
    collaborate: "./src/layouts/Collaborate.svelte",
    home: "./src/layouts/Home.svelte",
    news: "./src/layouts/NewsItem.svelte",
    openlab: "./src/layouts/OpenLabEvent.svelte",
    outputs: "./src/layouts/Outputs.svelte",
    researchproject: "./src/layouts/ResearchProject.svelte",
    team: "./src/layouts/Team.svelte",
    events: "./src/layouts/Events/Events.svelte",
    movingstrings: "./src/layouts/Events/MovingStrings.svelte"
  },
};
