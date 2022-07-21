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
  default: () => Collaborate,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../_app/immutable/chunks/index-85307065.js");
var import_seo_f675d5d9 = require("../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../_app/immutable/chunks/Menu-d2b189d9.js");
const Collaborate$1 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { title } = $$props;
  let { description } = $$props;
  let { layout } = $$props;
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo = { title, description }, $seo);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${(0, import_index_85307065.e)(title)}</h1>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div></div>`}`;
});
const metadata = {
  "layout": "collaborate",
  "title": "Collaborate",
  "slug": "collaborate",
  "description": "Collaborate with us"
};
const Collaborate = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(Collaborate$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The Intelligent Instruments Lab is open for collaborations with artists and scientists on experimental projects, equally as part of our work programme and as collaborations with other projects. We work with various research institutions around the world.</p>
<p>We also run a visiting researcher scheme. We welcome people to come and work with us in our wonderful Reykjavik lab over a specified period of time. The aim with this scheme is to enable artists, composers and musicians to develop technologies for their musical expression, but in turn the collaboration will help us answer our research questions. </p>
<p>Please get in touch with the Principal Investigator, Thor Magnusson, or the lab members you\u2019d like to work with - all the relevant contact information can be found in our <a href="${"/team"}">Team Page</a>.</p>
<p>We also have a <a href="${"https://discord.gg/Z5HZ5quk"}">public channel</a> on Discord for any questions or conversation. We also have an <a href="${"https://discord.gg/UTFPmHgA"}">Open Lab</a> Discord Channel. </p>`;
    }
  })}`;
});
