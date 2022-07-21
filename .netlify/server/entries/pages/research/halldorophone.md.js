import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { R as ResearchProject } from "../../../_app/immutable/chunks/ResearchProject-50c047b7.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
import "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
const metadata = {
  "layout": "researchproject",
  "title": "Halldorophone",
  "description": "The Halldorophone is a musical instrument.",
  "featured": true,
  "authors": ["Halldor \xDAlfarsson"],
  "highlight_image": "research/projects/halldorophone.jpg",
  "highlight_caption": "The Halldorophone by Halldor \xDAlfarsson."
};
const Halldorophone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The halldorophone (Icelandic: d\xF3r\xF3f\xF3nn) is a cello-like electronic instrument created by artist and designer Halld\xF3r \xDAlfarsson.
The halldorophone is designed specifically to feedback the strings and the instrument gained some recognition in early 2020 when composer Hildur Gu\xF0nad\xF3ttir won the Academy Award for her original soundtrack to the movie Joker, some of which was composed with a halldorophone.</p>`;
    }
  })}`;
});
export {
  Halldorophone as default,
  metadata
};
