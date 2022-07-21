import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component, a as subscribe, h as set_store_value, d as each } from "./index-85307065.js";
import { s as seo } from "./seo-f675d5d9.js";
import { L as Layout } from "./pages-b2802677.js";
import { M as Menu } from "./Menu-d2b189d9.js";
const Photo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"hidden lg:block flex-none self-center sm:w-72 sm:h-72 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src, 0)}${add_attribute("alt", name, 0)}></div>`;
});
const Thumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"lg:hidden self-start w-32 h-32 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src, 0)}${add_attribute("alt", name, 0)}></div>`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `

<div class="${"border-dashed border-primary-700 border-2 rounded-lg"}"><a class="${"h-9 flex items-center justify-center bg-primary-700 p-3 text-white"}"${add_attribute("href", url, 0)} target="${"_blank"}">${escape(label)}</a></div>`;
});
const Links = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-2 mt-4 "}">${links.website ? `${validate_component(Link, "Link").$$render($$result, {
    url: "http://" + links.website,
    label: "Website"
  }, {}, {})}` : ``}
  ${links.twitter ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://twitter.com/" + links.twitter,
    label: "Twitter"
  }, {}, {})}` : ``}
  ${links.instagram ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://instagram.com/" + links.instagram,
    label: "Instagram"
  }, {}, {})}` : ``}
  ${links.github ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://github.com/" + links.github,
    label: "GitHub"
  }, {}, {})}` : ``}
  ${links.scholar ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://scholar.google.com/citations?user=" + links.scholar,
    label: "Scholar"
  }, {}, {})}` : ``}
  ${links.website2 ? `${validate_component(Link, "Link").$$render($$result, {
    url: "http://" + links.website2,
    label: links.website2
  }, {}, {})}` : ``}</div>`;
});
const Person = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { person } = $$props;
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  return `<div class="${"flex"}"><div class="${"flex lg:space-x-10"}">${validate_component(Photo, "Photo").$$render($$result, { src: person.image, name: person.name }, {}, {})}
    <div><div class="${"flex flex-wrap"}">${validate_component(Thumbnail, "Thumb").$$render($$result, { src: person.image, name: person.name }, {}, {})}
        <div class="${"flex flex-col sm:ml-4 lg:ml-0"}"><h1 class="${"font-hauser text-secondary text-3xl mt-4"}">${escape(person.name)}
            <span class="${"font-sans text-secondary-500 text-lg ml-1"}">(${escape(person.pronouns)})
            </span></h1>
          <h3 class="${"text-primary-900 text-1xl px-2 mt-2"}">${escape(person.role)}</h3>
          <p class="${"text-primary-700 text-sm px-2 mt-1"}"><a${add_attribute("href", "mailto:" + person.email, 0)}${add_attribute("title", "Email " + person.name, 0)}>${escape(person.email)}</a></p></div></div>
      <div class="${"px-2 mb-16 "}"><p class="${"mt-2 sm:mt-4 mb-6 md:max-w-xl lg:max-w-1xl "}">${escape(person.bio)}</p>
        ${validate_component(Links, "Links").$$render($$result, { links: person.links }, {}, {})}</div></div></div></div>`;
});
let title = "People";
let description = "Meet the Intelligent Instruments Lab members and associates!";
const People = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { people } = $$props;
  let members = [];
  let associates = [];
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/people", $seo);
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4 w"}"><div class="${"py-8 px-4 sm:p-12 md:p-14 max-w-6xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">Members
      </h1>
      <div class="${"p-2 sm:p-4"}"><div>${each(members, (member, index) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Person, "Person").$$render($$result, { person: member.metadata }, {}, {})}
            </div>`;
  })}</div></div>
      <h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">Associates
      </h1>
      <div class="${"p-2 sm:p-4"}"><div>${each(associates, (associate, index) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Person, "Person").$$render($$result, { person: associate.metadata }, {}, {})}
            </div>`;
  })}</div></div></div></div>`}`;
});
export {
  People as P
};
