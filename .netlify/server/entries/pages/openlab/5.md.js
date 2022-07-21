import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 5,
  "theme": "The gonzo guide to loudspeaker systems",
  "description": "Josh Wilkinson and Sean Patrick O'Brien talk speaker building.",
  "date": "2021-10-08"
};
const _5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>In this open lab we had two presentations by people building loudspeakers. </p>
<a href="${"http://joshuawilkinsonsd.com/"}" target="${"_blank"}">Josh Wilkinson</a> offered his &quot;gonzo guide&quot; to building efficient and portable sound systems ready for festivals in the middle of the desert.
<br>
<a href="${"http://instagram.com/foreverywhere"}" target="${"_blank"}">Sean Patrick O&#39;Brien</a> discussed experiments with building speakers in various sizes and materials.
<p>Josh and Sean also collaborated on building the sound system for <a href="${"https://www.facebook.com/the.post.house.venue/"}" target="${"_blank"}">P\xF3st-H\xFAsi\xF0</a>.</p>
<br>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/openlab_5_roundtable.jpeg",
        alt: "People sitting around a table. Young man holding a metalic prototype of an instrument. Linnstrument, computers, pedal, coffee mug and monochord prototype are among the things on the table.",
        caption: "Jack trying out a prototype by Hjalti Nordal Gunnarsson, a student of LH\xCD. Photo by Esther."
      }, {}, {})}`;
    }
  })}`;
});
export {
  _5 as default,
  metadata
};
