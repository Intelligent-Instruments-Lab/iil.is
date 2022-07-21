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
  default: () => Good_start,
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
  "date": "2021-10-07",
  "title": "Off to a good start...",
  "description": "What we have been up to in the first month.",
  "featured": false
};
const Good_start = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>On September 1st, our team met for the first time in real life. Thor, Halld\xF3r, Jack, Victor and Esther came together in the basement Iceland University of the Arts to plot the first steps of the five-year-long journey we have ahead of us now.
This marks the start of the project where we will study the impact of creative AI, conducted in the research domain of music, with a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists.
The university has generously provided us with two different spaces for labs. We call them the Blue Lab, which is in the basement and will serve as a recording studio, and the Yellow Lab, which is on 4th floor and is used as an office and a space for prototyping.</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "stock/empty_lab_yellow.jpg",
        alt: "A panorama photo of a large class room what only has one table and a few blue chairs scattered around in a disorganised way. In the middle, a young man sitting in a corner with a laptop.",
        caption: "The first picture taken at the Yellow Lab. In the middle you'll see Victor. Photo by Jack."
      }, {}, {})}
<p>Through a streamlined research collaboration protocol, we seek to explore the language and discourse of creative AI, addressing our changed notions of, for example, agency, autonomy, authenticity, authorship, creativity and originality.</p>
<p>In order to achieve this goal, the technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn, and evolve in the hands of the performer. The instruments become boundary objects, studied by collaborators from a range of sciences and the general public.</p>
<p>We used September to prototype a monochord (Icelandic <em>langspil</em>) \u2026 which by the end of the month had ended up with three chords. </p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "stock/prototype_langspil_cardboard.jpg",
        alt: "A simple cardboard prototype of a long box-shaped instrument.",
        caption: "Our first prototype."
      }, {}, {})}
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "stock/prototype_langspil_plywood_1.jpg",
        alt: "A plywood prototype of a long box-shaped instrument.",
        caption: "Our second prototype."
      }, {}, {})}
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "stock/prototype_langspil_plywood_2_electrical_chords.jpg",
        alt: "A complex prototype of a long box-shaped instrument with audio and electric cables connected.",
        caption: "And our third prototype."
      }, {}, {})}
<p>Through technology development we will create the conditions to study higher level theoretical questions on the meaning of creative AI in contemporary culture. This project takes a pioneering leap in research about AI by answering how new creative AI transforms our relationships with technology and other people. Grounded equally in technology development and the humanities, the project will benefit diverse disciplines by developing a theoretical framework of creative AI, initiating a discourse around human-centred creative AI, and defining principles of human-AI relations in services and products.</p>
<p>Our next steps include summoning artists to experiment with the prototype and researchers from diverse disciplines to conduct frontier science on intelligent instruments as boundary objects. </p>
<p>So stay tuned!</p>`;
    }
  })}`;
});
