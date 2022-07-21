var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  P: () => People
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
var import_seo_f675d5d9 = require("./seo-f675d5d9.js");
var import_pages_b2802677 = require("./pages-b2802677.js");
var import_Menu_d2b189d9 = require("./Menu-d2b189d9.js");
const Photo = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"hidden lg:block flex-none self-center sm:w-72 sm:h-72 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${(0, import_index_85307065.b)("src", src, 0)}${(0, import_index_85307065.b)("alt", name, 0)}></div>`;
});
const Thumbnail = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"lg:hidden self-start w-32 h-32 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${(0, import_index_85307065.b)("src", src, 0)}${(0, import_index_85307065.b)("alt", name, 0)}></div>`;
});
const Link = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `

<div class="${"border-dashed border-primary-700 border-2 rounded-lg"}"><a class="${"h-9 flex items-center justify-center bg-primary-700 p-3 text-white"}"${(0, import_index_85307065.b)("href", url, 0)} target="${"_blank"}">${(0, import_index_85307065.e)(label)}</a></div>`;
});
const Links = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-2 mt-4 "}">${links.website ? `${(0, import_index_85307065.v)(Link, "Link").$$render($$result, {
    url: "http://" + links.website,
    label: "Website"
  }, {}, {})}` : ``}
  ${links.twitter ? `${(0, import_index_85307065.v)(Link, "Link").$$render($$result, {
    url: "https://twitter.com/" + links.twitter,
    label: "Twitter"
  }, {}, {})}` : ``}
  ${links.instagram ? `${(0, import_index_85307065.v)(Link, "Link").$$render($$result, {
    url: "https://instagram.com/" + links.instagram,
    label: "Instagram"
  }, {}, {})}` : ``}
  ${links.github ? `${(0, import_index_85307065.v)(Link, "Link").$$render($$result, {
    url: "https://github.com/" + links.github,
    label: "GitHub"
  }, {}, {})}` : ``}
  ${links.scholar ? `${(0, import_index_85307065.v)(Link, "Link").$$render($$result, {
    url: "https://scholar.google.com/citations?user=" + links.scholar,
    label: "Scholar"
  }, {}, {})}` : ``}
  ${links.website2 ? `${(0, import_index_85307065.v)(Link, "Link").$$render($$result, {
    url: "http://" + links.website2,
    label: links.website2
  }, {}, {})}` : ``}</div>`;
});
const Person = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { person } = $$props;
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  return `<div class="${"flex"}"><div class="${"flex lg:space-x-10"}">${(0, import_index_85307065.v)(Photo, "Photo").$$render($$result, { src: person.image, name: person.name }, {}, {})}
    <div><div class="${"flex flex-wrap"}">${(0, import_index_85307065.v)(Thumbnail, "Thumb").$$render($$result, { src: person.image, name: person.name }, {}, {})}
        <div class="${"flex flex-col sm:ml-4 lg:ml-0"}"><h1 class="${"font-hauser text-secondary text-3xl mt-4"}">${(0, import_index_85307065.e)(person.name)}
            <span class="${"font-sans text-secondary-500 text-lg ml-1"}">(${(0, import_index_85307065.e)(person.pronouns)})
            </span></h1>
          <h3 class="${"text-primary-900 text-1xl px-2 mt-2"}">${(0, import_index_85307065.e)(person.role)}</h3>
          <p class="${"text-primary-700 text-sm px-2 mt-1"}"><a${(0, import_index_85307065.b)("href", "mailto:" + person.email, 0)}${(0, import_index_85307065.b)("title", "Email " + person.name, 0)}>${(0, import_index_85307065.e)(person.email)}</a></p></div></div>
      <div class="${"px-2 mb-16 "}"><p class="${"mt-2 sm:mt-4 mb-6 md:max-w-xl lg:max-w-1xl "}">${(0, import_index_85307065.e)(person.bio)}</p>
        ${(0, import_index_85307065.v)(Links, "Links").$$render($$result, { links: person.links }, {}, {})}</div></div></div></div>`;
});
let title = "People";
let description = "Meet the Intelligent Instruments Lab members and associates!";
const People = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { people } = $$props;
  let members = [];
  let associates = [];
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.title = title, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.description = description, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.url = "/people", $seo);
  if ($$props.people === void 0 && $$bindings.people && people !== void 0)
    $$bindings.people(people);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_85307065.e)(title)}</title>`, ""}<meta name="${"description"}"${(0, import_index_85307065.b)("content", description, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4 w"}"><div class="${"py-8 px-4 sm:p-12 md:p-14 max-w-6xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">Members
      </h1>
      <div class="${"p-2 sm:p-4"}"><div>${(0, import_index_85307065.d)(members, (member, index) => {
    return `<div class="${"md:py-6 md:px-2"}">${(0, import_index_85307065.v)(Person, "Person").$$render($$result, { person: member.metadata }, {}, {})}
            </div>`;
  })}</div></div>
      <h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">Associates
      </h1>
      <div class="${"p-2 sm:p-4"}"><div>${(0, import_index_85307065.d)(associates, (associate, index) => {
    return `<div class="${"md:py-6 md:px-2"}">${(0, import_index_85307065.v)(Person, "Person").$$render($$result, { person: associate.metadata }, {}, {})}
            </div>`;
  })}</div></div></div></div>`}`;
});
