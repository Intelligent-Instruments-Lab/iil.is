import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Jonathan Chaim Reus",
  "type": "Associate",
  "role": "Associate",
  "email": "j.reus@sussex.ac.uk",
  "image": "images/people/jonr.jpg",
  "links": {
    "twitter": "_jchaim",
    "instagram": "jchai.me",
    "website": "jchai.me"
  },
  "projects": [""],
  "pronouns": "he/she/it",
  "bio": "I am a homeostatic animal experimenting within a vibrant ecosystem of cultures and tools. I co-founded the instrumentinventorsinitiative (iii) and Platform for Thought in Motion in The Hague, and worked for many years on artist-led research at the former Studio for Electro-Instrumental Music (STEIM). I am currently exploring what it means to have a voice."
};
const Jon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Jon as default,
  metadata
};
