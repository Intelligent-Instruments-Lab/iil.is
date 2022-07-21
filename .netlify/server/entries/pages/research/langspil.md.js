import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { R as ResearchProject } from "../../../_app/immutable/chunks/ResearchProject-50c047b7.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "researchproject",
  "title": "Proto-Langspil",
  "description": "The Proto-Langspil is a feedback instrument with intelligent behaviour.",
  "featured": true,
  "authors": ["Thor Magnusson", "Jack Armitage", "Halldor Ulfarsson", "Victor Shepardson"],
  "highlight_image": "research/projects/protolangspil.jpg",
  "highlight_caption": "The ii lab Proto-Langspil"
};
const Langspil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The Proto-Langspil is our first prototype instrument, made in the first week of the lab, made out of plywood, cut out in the lasercutter in the LHI lab downstairs. We experimented with some versions and are in collaboration with performers who are interested in working with the instrument.</p>
<p>The Langspil is a traditional Icelandic instrument with an interesting, albeit vague history. We are interested in exploring the cultural connotations of the instrument, studying the cultural reception of it as it becomes used and played as part of musical practice. It also extends the millennia old practice - perhaps first documented in the work of Greek philosopher Pythagoras - of using a monochord to study acoustics and music theory.</p>
<p>The Proto-Langspil is an ongoing work in progress where we implement various types of adaptive behaviour in the instrument, ranging from feedback to user gestures, and where we investigate how performers interact with the instrument. A simple object that has triggered a lot of interesting conversations and ideas!</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "research/projects/protolangspil2.jpg",
        alt: "An image of the proto-langspil with the electronics drawer removed.",
        caption: "The proto-langspil."
      }, {}, {})}`;
    }
  })}`;
});
export {
  Langspil as default,
  metadata
};
