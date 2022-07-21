import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "name": "Kit Braybrooke",
  "type": "Member",
  "role": "Postdoctoral Research Fellow (2023-onwards)",
  "email": "k.braybrooke@tu-berlin.de",
  "image": "images/people/kit.jpg",
  "links": {
    "twitter": "codekat",
    "instagram": "codekiit",
    "website": "kitfox.org",
    "website2": "studiowe.net"
  },
  "projects": [""],
  "pronouns": "she/they",
  "bio": "I'm a digital anthropologist and artist-designer whose work explores how we navigate culture, identity and belonging across virtual and physical terrains. I am a Director of Studio We & Us, which helps civil society orgs foster sustainable development through creative participation, and a Senior Researcher with Habitat Unit at Technische Universit\xE4t Berlin. I have lead co-design programmes at organisations like Mozilla and the Open Knowledge Foundation, and conducted ethnographic fieldwork on commoning, open source cultures, creative spaces and multispecies ethics of care across Asia, Europe & Canada. I have a PhD in Media & Cultural Studies from University of Sussex for 'Hacking the Museum', a study of the UK's first museum makerspaces at Tate, British Museum and Wellcome Collection."
};
const Kit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(People, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Kit as default,
  metadata
};
