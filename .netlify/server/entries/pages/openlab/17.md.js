import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 17,
  "theme": "Omicron",
  "description": "The open lab is a closed lab this week",
  "date": "2022-01-14"
};
const _17 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Unfortunately, because of the rise of the Covid Omicron variant in Iceland we are not running an open lab this week. Looking forward to start again soon. </p>
<p>If anyone wants to make an appointment with us on an individual basis on anything, please reach out to us. You might want to look into some of our instruments or you have your own idea.</p>`;
    }
  })}`;
});
export {
  _17 as default,
  metadata
};
