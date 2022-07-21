import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { P as People } from "../../../_app/immutable/chunks/People-ffe3e5f6.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
async function load({ fetch }) {
  const res = await fetch(`/people/people.json`);
  const people = await res.json();
  return { props: { people } };
}
const People_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { people } = $$props;
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  return `${validate_component(People, "People").$$render($$result, { people }, {}, {})}`;
});
export {
  People_1 as default,
  load
};
