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
  default: () => Google_summer_of_code,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_NewsItem_d440c00e = require("../../../_app/immutable/chunks/NewsItem-d440c00e.js");
var import_CaptionedImage_6bbb271e = require("../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "layout": "news",
  "date": "2022-04-04",
  "title": "The Google Summer of Code",
  "description": "Mentorship opportunity for students",
  "featured": false
};
const Google_summer_of_code = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Students, work with us this summer! We are offering Google Summer of Code mentorship in partnership with Bela Platform and Beagleboard. </p>
<p>In an exciting change to the policy in 2022, projects are now open to anyone who is new to open source and would like to gain experience of contributing code to an open source project.</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "news/bela.png",
        alt: "A small Bela hardware surrounded by pieces of hardware.",
        caption: "A Bela Board."
      }, {}, {})}
<p>Our project is to do TinyML embedded machine learning on Bela using Pytorch to enable intelligent embedded musical instruments. </p>
<p>Deadline: April 19th</p>
<p>This is a great opportunity for learning and sharing knowledge. Don\u2019t let it pass you by!</p>
<p>Full details here: <a href="${"https://elinux.org/BeagleBoard/GSoC/Ideas-2022#Beagle_Bone_Audio_Applications"}" rel="${"nofollow"}">https://elinux.org/BeagleBoard/GSoC/Ideas-2022#Beagle_Bone_Audio_Applications</a></p>`;
    }
  })}`;
});
