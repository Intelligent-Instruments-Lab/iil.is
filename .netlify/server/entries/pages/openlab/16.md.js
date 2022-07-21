import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 16,
  "theme": "New year and new instruments",
  "description": "Discussion about future developments at the ii lab",
  "date": "2022-01-07"
};
const _16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>In this open lab we welcome people to discuss the work we will be doing in 2022, seeking input and conversation with people and brainstorming future developments.</p>`;
    }
  })}`;
});
export {
  _16 as default,
  metadata
};
