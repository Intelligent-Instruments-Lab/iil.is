import { writable } from "svelte/store";

export const seo = writable({
  title: "Intelligent Instruments Lab",
  description: "The Intelligent Instruments Lab designs instruments embedded with creative AI for musical performance. Our aim is to understand ourselves as users of intelligent technologies.",
  url: "/",
  image: "/seo/ogimage.jpg",
});
