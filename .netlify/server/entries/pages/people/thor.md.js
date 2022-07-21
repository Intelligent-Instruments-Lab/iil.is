import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Thor Magnusson",
  "type": "Member",
  "role": "Principal Investigator",
  "email": "thor.magnusson@lhi.is",
  "image": "images/people/thor.jpg",
  "links": {
    "twitter": "thormagnusson",
    "github": "thormagnusson",
    "scholar": "cCgOZ_gAAAAJ",
    "website": "thormagnusson.github.io"
  },
  "projects": ["sonicwriting"],
  "pronouns": "he/him",
  "bio": "I\u2019m a professor of future music in the Music Department at the University of Sussex and a research professor at the Iceland University of the Arts. I\u2019ve recently served as an Edgard-Var\xE8se guest professor at the Technische Universit\xE4t Berlin. My research interests include musical performance, improvisation, new technologies for musical expression, live coding, musical notation, artificial intelligence and computational creativity."
};
const Thor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Thor as default,
  metadata
};
