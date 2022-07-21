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
  default: () => Gsoc2022,
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
  "date": "2022-05-20",
  "title": "Welcoming Ezra Pierce, GSOC 2022 contributor!",
  "description": "Ezra will work on ",
  "featured": true
};
const Gsoc2022 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Congratulations to Ezra Pierce, our first ever <a href="${"https://summerofcode.withgoogle.com/"}" target="${"_blank"}">Google Summer of Code</a> contributor, who is joining us via the <a href="${"https://beagleboard.org/"}" target="${"_blank"}">BeagleBoard</a> foundation.</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "images/people/ezra.jpeg",
        alt: "Ezra Pierce.",
        caption: "Ezra Pierce"
      }, {}, {})}
<p>Ezra\u2019s project will investigate \u201CRunning Machine Learning Models on <a href="${"https://bela.io/"}" target="${"_blank"}">Bela</a>\u201D to support intelligent instrument designers:</p>
<p>\u201CThe goal of this project is to improve the tooling surrounding embedded machine learning on the BeagleBone Black(BBB)/Bela to aid its community in experimenting with machine learning applications for their projects. The specific developer tools chosen for this project are an inference benchmarking tool as well as a perf-based profiler developed for the BBB/Bela platform.</p>
<p>Bela is a platform built upon the BeagleBone Black, consisting of an audio cape and a custom real-time Linux image using the Xenomai framework. This platform provides a low-latency computing environment ideal for use in audio applications. There already exists a large community surrounding the Bela, as it is an increasingly popular platform for use in educational settings as well as musical instrument design and maker communities. This project aims to extend the Bela platform to include tools and documentation for machine learning projects, with the goal of simplifying the process of integrating machine learning models into real-time embedded Bela projects. As the Bela platform has been adopted by a wide range of users, from artists to engineers, this project will aim to provide tooling that caters to this broad userbase.\u201D</p>
<p>Read Ezra\u2019s full project proposal here: <a href="${"https://elinux.org/BeagleBoard/GSoC/2022_Proposal/Running_Machine_Learning_Models_on_Bela"}" rel="${"nofollow"}">https://elinux.org/BeagleBoard/GSoC/2022_Proposal/Running_Machine_Learning_Models_on_Bela</a></p>`;
    }
  })}`;
});
