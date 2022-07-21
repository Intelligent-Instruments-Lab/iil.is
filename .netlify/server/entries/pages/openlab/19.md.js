import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 19,
  "theme": "Steve Symons presents his work.",
  "description": "Sound sculptures and art in the field of creative technology.",
  "date": "2022-05-13"
};
const _19 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Steve Symons is a <a href="${"https://iil.is/news/steve-residency"}">current researcher in residence</a> at the lab and will be presenting his work at Open Lab this week.</p>`;
    }
  })}`;
});
export {
  _19 as default,
  metadata
};
