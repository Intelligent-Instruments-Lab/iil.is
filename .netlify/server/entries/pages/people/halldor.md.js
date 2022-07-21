import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Halldor \xDAlfarsson",
  "type": "Member",
  "role": "Fabricator",
  "email": "hau@lhi.is",
  "image": "images/people/halldor.jpg",
  "links": {
    "instagram": "halldorophone",
    "website": "halldorophone.info"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am the inventor of the halldorophone, an electro acoustic string instrument intended for working with string based feedback. For the past decade I have been seeking out and working with musicians to make music with halldorophones and noting their thoughts and feelings on the process to inform further development. I am currently working on a PhD documenting and expanding on this work under the supervision of Thor Magnusson and Chris Kiefer at the University of Sussex. Besides working on this project I am currently funded by an innovation grant from the Icelandic Technology Development Fund on further development of halldorophones. I enjoy using my skills as a fabricator to collaborate with musicians and instrument makers in the NIME context."
};
const Halldor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Halldor as default,
  metadata
};
