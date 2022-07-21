import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 18,
  "theme": "Library of Technical Elements",
  "description": "We are planning a collection of parts for fast instrument prototyping",
  "date": "2022-04-22"
};
const _18 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Open lab is on for this coming Friday at 15.00. We are having a conversation with friends and collaborators about projects in the same vain as our Library of Technical Elements, a collection of ready-off-shelf, plug-and-play sensors and actuators we are starting to develop. These are intended to have at hand in the lab for fast, physical instrument experimentation and will eventually also include AI and ML tools for integrated systems.</p>
<p>Coffee will be hot, all are welcome.</p>`;
    }
  })}`;
});
export {
  _18 as default,
  metadata
};
