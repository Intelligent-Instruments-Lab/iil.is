import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 13,
  "theme": "Proto-Langspil Pilot Study 1",
  "description": "Soliciting feedback about the Proto-Langspil",
  "date": "2021-12-03"
};
const _13 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Call for study participants during Open Lab tomorrow (Dec 3rd) 15:00-17:00.</p>
<ul><li>Spend time with the Proto-Langspil and answer a brief survey</li>
<li>4x 30 minute slots available between 15:00-17:00</li>
<li>Do not attend if you have had COVID symptoms in the past 2 weeks</li></ul>
<p>To book a session, contact <a href="${"mailto:jack@lhi.is"}">jack@lhi.is</a>.</p>`;
    }
  })}`;
});
export {
  _13 as default,
  metadata
};
