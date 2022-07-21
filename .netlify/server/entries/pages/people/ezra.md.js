import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Ezra Pierce",
  "type": "Associate",
  "role": "Google Summer of Code Contributor",
  "email": "ezrapierce@cmail.carleton.ca",
  "image": "images/people/ezra.jpeg",
  "links": { "": null },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a recent BEng graduate in the Computer Systems program at Carleton University. I have previously worked on various embedded software projects, working with microcontrollers, sensors, and electronics. Recently, I have been learning about the music technology space which led me to my project for the summer: developing software tools to aid in the exploration of embedded machine learning possibilities on the Bela computers. I will be working on this project with support from Google Summer of Code, the BeagleBoard foundation and IIL, hopefully ending with some tools, tips and tricks for others looking to use machine learning with the Bela platform."
};
const Ezra = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Ezra as default,
  metadata
};
