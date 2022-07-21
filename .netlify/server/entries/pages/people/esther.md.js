import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Esther Thorvalds",
  "type": "Member",
  "role": "Project Manager",
  "email": "esther@lhi.is",
  "image": "images/people/esther.jpg",
  "links": {
    "instagram": "estherthorvalds",
    "twitter": "estherthorvalds"
  },
  "pronouns": "she/her",
  "bio": "I studied culture and communication, creative writing and comparative literature. I have been working in the music and culture industry for a decade; managing, planning and promoting all sorts of music projects, artists, festivals and conferences in Iceland as well as abroad. I'm passionate about connecting with and designing for all sorts of users and promoting equality and diversity."
};
const Esther = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Esther as default,
  metadata
};
