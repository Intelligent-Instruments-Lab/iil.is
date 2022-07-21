import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Victor Shepardson",
  "type": "Member",
  "role": "PhD Student",
  "email": "victor@lhi.is",
  "image": "images/people/victor.jpg",
  "links": {
    "instagram": "victorrileys",
    "twitter": "victorrileys",
    "website": "victor-shepardson.github.io"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a doctoral student in the Intelligent Instruments Lab at LHI. Previously I worked on neural models of speech as a machine learning engineer and data scientist. Before that I was an MA student in Digital Musics at Dartmouth College and and BA student in Computer Science at the University of Virginia. My interests include machine learning, artificial intelligence, generative art, audiovisual music and improvisation. My current project involves building an AI augmented looping instrument and asking what AI means to people, anyway."
};
const Victor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Victor as default,
  metadata
};
