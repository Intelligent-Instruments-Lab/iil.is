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
  R: () => ResearchProject
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
var import_seo_f675d5d9 = require("./seo-f675d5d9.js");
var import_pages_b2802677 = require("./pages-b2802677.js");
var import_Menu_d2b189d9 = require("./Menu-d2b189d9.js");
var import_CaptionedImage_6bbb271e = require("./CaptionedImage-6bbb271e.js");
const ResearchProject = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { title } = $$props;
  let { description } = $$props;
  let { layout } = $$props;
  let { date } = $$props;
  let { authors } = $$props;
  let { highlight_image } = $$props;
  let { highlight_caption } = $$props;
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.title = title, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.description = description, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.url = "/research", $seo);
  const methods = {
    authorString: (authors2) => {
      if (authors2.length === 1)
        return authors2[0];
      else if (authors2.length === 2)
        return authors2[0] + " and " + authors2[1];
      else {
        let s = "";
        for (var i = 0; i < authors2.length; i++) {
          if (i < authors2.length - 2)
            s = s + authors2[i] + ", ";
          else
            s = s + " and " + authors2[i];
        }
        return s;
      }
    }
  };
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.authors === void 0 && $$bindings.authors && authors !== void 0)
    $$bindings.authors(authors);
  if ($$props.highlight_image === void 0 && $$bindings.highlight_image && highlight_image !== void 0)
    $$bindings.highlight_image(highlight_image);
  if ($$props.highlight_caption === void 0 && $$bindings.highlight_caption && highlight_caption !== void 0)
    $$bindings.highlight_caption(highlight_caption);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${(0, import_index_85307065.e)("<-")} Back to Research</a></div>
    <div class="${"px-4 md:px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${(0, import_index_85307065.e)(title)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 text-primary-700"}">${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
    src: highlight_image,
    alt: highlight_caption,
    caption: highlight_caption
  }, {}, {})}
        <div class="${"font-hauser uppercase"}"><div class="${"text-md sm:text-lg md:text-xl"}">${(0, import_index_85307065.e)(description)}<br></div>
          <div class="${"text-sm sm:text-md md:text-lg mt-2"}">By ${(0, import_index_85307065.e)(methods.authorString(authors))}</div></div></div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${(0, import_index_85307065.e)("<-")} Back to Research</a></div></div>`}`;
});