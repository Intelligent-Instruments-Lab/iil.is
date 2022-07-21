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
  default: () => Root_workshop_2022,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_NewsItem_d440c00e = require("../../../_app/immutable/chunks/NewsItem-d440c00e.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "layout": "news",
  "date": "2022-05-10",
  "title": "Presentation at CERN Workshop",
  "description": "On creative misuse of ROOT.",
  "featured": true
};
const Root_workshop_2022 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>On Tuesday May 10th 2022, lab member Jack Armitage will give a presentation at the European Organization for Nuclear Research (<a href="${"https://cern.ch"}" target="${"_blank"}">CERN</a>) ROOT Users Workshop. <a href="${"https://root.cern"}" target="${"_blank"}">ROOT</a> is the technology stack that powers scientific computing at CERN, and has been instrumental in all scientific practice there, including the <a href="${"https://root.cern/gallery/#higgs-plots"}" target="${"_blank"}">discovery of the Higgs boson</a>.</p>
<p>See below for the title and abstract of the talk.</p>
<h1 id="${"creative-misuse-of-root"}"><a href="${"#creative-misuse-of-root"}">Creative Misuse of ROOT</a></h1>
<p>From Steinway and Helmholtz, to Max Mathews and Bell Labs, to Google Magenta, scientists and musicians have long been natural collaborators, with innovations and inventions passing in both directions. Over the years, a select few creative coders have been quietly reappropriating ROOT technologies, particularly for musical applications. In one such example, Cling has been used as the basis for a C++ based live coding synthesiser [1]. In another example, Cling has been installed on a BeagleBoard to bring live coding to the Bela interactive audio platform [2]. More recently, embedded digital musical instrument designers are experimenting with machine learning for gesture recognition and audio synthesis with the SOFIE library [3]. What would happen if the ROOT community were to embrace and encourage creative misuse of Cling, SOFIE and other powerful CERN technologies? Could musical innovation and invention inspire and benefit scientific practice at CERN? This short talk proposes to review the examples and explore the questions above, with the aim of promoting discourse between ROOT technologists, CERN researchers, and creative technologists.</p>
<p>[1] tiny spectral synthesizer with livecoding support <a href="${"https://github.com/nwoeanhinnogaehr/tinyspec-cling"}" rel="${"nofollow"}">https://github.com/nwoeanhinnogaehr/tinyspec-cling</a></p>
<p>[2] Using the Cling C++ Interpreter on the Bela Platform
<a href="${"https://gist.github.com/jarmitage/6e411ae8746c04d6ecbee1cbc1ebdcd4"}" rel="${"nofollow"}">https://gist.github.com/jarmitage/6e411ae8746c04d6ecbee1cbc1ebdcd4</a></p>
<p>[3] Test running ONNX models on Bela via ROOT@CERN\u2019s SOFIE inference code generator
<a href="${"https://gist.github.com/jarmitage/0ac53dfecee8ed03e9f235d3e14ec9a2"}" rel="${"nofollow"}">https://gist.github.com/jarmitage/0ac53dfecee8ed03e9f235d3e14ec9a2</a></p>
<p>Full details: <a href="${"https://indico.fnal.gov/event/23628/contributions/240304/"}" rel="${"nofollow"}">https://indico.fnal.gov/event/23628/contributions/240304/</a></p>`;
    }
  })}`;
});
