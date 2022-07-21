import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { R as ResearchProject } from "../../../_app/immutable/chunks/ResearchProject-50c047b7.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
import "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
const metadata = {
  "layout": "researchproject",
  "title": "Stenophone",
  "description": "The Stenophone is a musical instrument for live coding.",
  "featured": true,
  "authors": ["Jack Armitage"],
  "highlight_image": "research/projects/stenophone.jpg",
  "highlight_caption": "The Stenophone by Jack Armitage."
};
const Stenophone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The <a href="${"https://github.com/jarmitage/Stenophone"}" target="${"_blank"}" title="${"Stenophone"}">Stenophone</a> is a musical instrument combining stenotype and live coding.</p>
<p>Though laptop live coders are known to use other devices and instruments and play with other musicians, laptop live coding generally shares the common physical interface of the QWERTY keyboard. This project seeks to provide a means to explore alternatives to the QWERTY keyboard as a physical interface to laptop live coding. This project proposes a live coding keyboard which is also a digital musical instrument, called the Stenophone. </p>
<p>The Stenophone is an augmented stenotype or chorded keyboard, which permits continuous gestural control of keys and features an ergonomic design. These capabilities are exploited to enable the manipulation of algorithms and their parameterisation simultaneously.</p>`;
    }
  })}`;
});
export {
  Stenophone as default,
  metadata
};
