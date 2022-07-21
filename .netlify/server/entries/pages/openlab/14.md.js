import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 14,
  "theme": "Moving Strings reflections",
  "description": "Open discussion and feedback about this week's events",
  "date": "2021-12-10"
};
const _14 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>This week we will discuss Moving Strings: <a href="${"https://iil.is/events/moving-strings"}" rel="${"nofollow"}">https://iil.is/events/moving-strings</a></p>
<p>Followed by a Magnetic Resonator Piano workshop in Skipholt.</p>`;
    }
  })}`;
});
export {
  _14 as default,
  metadata
};
