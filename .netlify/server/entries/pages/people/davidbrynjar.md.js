import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Dav\xED\xF0 Brynjar Franzson",
  "type": "Associate",
  "role": "Associate",
  "email": "david.brynjar@gmail.com",
  "image": "images/people/davidbrynjar.JPG",
  "links": {
    "github": "franzson",
    "website": "franzson.com"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am a freelancing composer based in Los Angeles. My work explores the overlap between the experience of performing and the experience of listening, attempting to break down the barriers between listener and performer, audience and artist. My work with machine learning is focused on the application of autoencoders as generative synthesis tools, and their use as a ghost-in-the-machine inside augmented and intelligent instruments and architectural spaces, altering and amplifying variation in how the instruments and spaces respond to the performer. On the side I co-run Carrier Records--a label for new and experimental music--with Sam Pluta, Katie Young, and Jeff Snyder."
};
const Davidbrynjar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Davidbrynjar as default,
  metadata
};
