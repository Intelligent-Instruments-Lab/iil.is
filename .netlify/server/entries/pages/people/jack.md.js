import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Jack Armitage",
  "type": "Member",
  "role": "Postdoctoral Research Fellow",
  "email": "jack@lhi.is",
  "image": "images/people/jack.jpg",
  "links": {
    "twitter": "jdkarmitage",
    "github": "jarmitage",
    "scholar": "APvoBhUAAAAJ",
    "instagram": "jdkarmitage",
    "website": "jackarmitage.com"
  },
  "projects": [""],
  "pronouns": "he/him, they/them",
  "bio": "I have a doctorate in Media and Arts Technologies from Queen Mary University of London, where I studied in Prof. Andrew McPherson's Augmented Instruments Lab. During my PhD I was a Visiting Scholar at Georgia Tech under Prof. Jason Freeman. Before then, I was a Research Engineer at ROLI after graduating with a BSc in Music, Multimedia & Electronics from the University of Leeds. My research interests include embodied interaction, craft practice and design cognition. I also produce, perform and live code music as Lil Data, as part of the PC Music record label."
};
const Jack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Jack as default,
  metadata
};
