import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Karl J\xF3hann J\xF3hannsson",
  "type": "Associate",
  "role": "Research Intern",
  "email": "karljohann@gmail.com",
  "image": "images/people/karl.png",
  "links": {
    "twitter": "karljohann",
    "instagram": "karljohann"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a MSc student in Computer Science at Reykjav\xEDk University, as well as studying at the F\xCDH school of music. I have a BA degree in psychology and philosophy from the University of Iceland and, subsequently, worked in software development for 14 years, ranging from web design to app development. My main interests in life and work are music, AI, UX, and creativity. I am currently working on teaching a computer to play the txalaparta at the Intelligent Instruments Lab. I have been playing and creating music for as long as I remember and am in a death metal band, although I have been involved in various different musical projects, as well as composing more experimental music in darkened rooms."
};
const Karl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Karl as default,
  metadata
};
