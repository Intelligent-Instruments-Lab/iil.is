import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Robin Morabito",
  "type": "Associate",
  "role": "Research Intern",
  "email": "robin19@lhi.is",
  "image": "images/people/robin.jpg",
  "links": {
    "instagram": "bob.hermit",
    "website": "linktr.ee/bobhermit"
  },
  "projects": [""],
  "pronouns": "he/him, they/them",
  "bio": "I'm a graduating student in Composition - New Media at LHI. My interests involve sonification, sonic interaction design and DIY approaches to multimedia creation. Previously I studied Biotechnologies at La Sapienza University of Rome, and before then I studied guitar, violin, and sound engineering. I release music as Bob Hermit since 2016 and co-founded the transnational label BohReal? Records in 2020. In my work and in my music, I explore what it means to be a human and to be communicating in an information-overloaded world; I use abjections, discomfort and displacement to investigate human responses to aesthetic patterns. Currently I'm experimenting with sensors and Bela boards to create interactive sculptures and wearable music instruments. I'm going to work with IIL all summer, it's going to be great!"
};
const Robin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Robin as default,
  metadata
};
