import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Steve Symons",
  "type": "Associate",
  "role": "Associate",
  "email": "s.symons@sussex.ac.uk",
  "image": "images/people/steve_1500.jpg",
  "links": {
    "twitter": "stevemuio",
    "website": "http://muio.org",
    "website2": "owlproject.com"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I make interactive sound systems and instruments that I improvise with or exhibit for the public to play. I'm currently a music technology doctoral researcher at the Leverhulme Trust funded be.AI Centre (University of Sussex, Brighton, UK). My research explores enactive metaphors for collaborative musical instruments that enhance intra-dependant actions between human and non-human agents."
};
const Steve = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Steve as default,
  metadata
};
