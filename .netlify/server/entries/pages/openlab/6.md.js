import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 6,
  "theme": "Electric Langspil and Sea weed instrument",
  "description": "Linus Orri and Design students presenting their new instruments.",
  "date": "2021-10-15"
};
const _6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Folk music expert, Linus Orri presented his electric Langspil and LHI product design students, Arngr\xEDmur Gu\xF0mundsson, Birna S\xEDs\xED J\xF3hannsd\xF3ttir og J\xF3n S\xF6lvi Walderhaug Eir\xEDksson demonstrating their new instrument based on 3D scanning sea weed.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6a.jpg",
        alt: "A picture of Linus Orri talking about his electric langspil. The instrument is in front of him on the table.",
        caption: "Linus Orri talking about his electric langspil. Photo by Thor."
      }, {}, {})}
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6b.jpg",
        alt: "A picture of the langspil. A wooden block with three strings, a jack and two knobs.",
        caption: "The electric langspil. Photo by Thor."
      }, {}, {})}
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6c.jpg",
        alt: "A group of people discussing the instrument.",
        caption: "A group of people discussing the instrument. Photo by Thor."
      }, {}, {})}`;
    }
  })}`;
});
export {
  _6 as default,
  metadata
};
