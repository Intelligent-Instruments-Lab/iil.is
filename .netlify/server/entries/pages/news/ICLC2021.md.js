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
  default: () => ICLC2021,
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
  "date": "2021-12-21",
  "title": "ICLC 2021 Panel",
  "description": "Thor Magnusson presents work at a panel session at ICLC 2021",
  "featured": false
};
const ICLC2021 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The International Conference on Live Coding took place in Chile this year, but was held primarily online. The programme was diverse and excting with participants around the globe and can be found <a href="${"https://iclc.toplap.org/2021/"}">here</a>.</p>
<p>The panel with Iris Saladino and Thor Magnusson</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/4GVMkly5QUk?start=10881"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>The ICLC conferences have been running since 2015, the first one being part of an AHRC network that was run by Alex McLean (Leeds) and Thor Magnusson (Sussex). It\u2019s been great to see the conference developing and maturing as the field of live coding does. More on this later, but the MIT Press will soon publish a book which Alex and Thor co-wrote with Emma Cocker, Alan Blackwell and Geoff Cox, on live coding. </p>
<p>At the Intelligent Instruments Lab, we don\u2019t focus on live coding, but it has become an integral part of everything we do. The philosophy of modularity, liveness, resistance to definitions, and redesinging things whilst they are in operation are part of our core thinking. There is no question how deeply live coding philosophy underpins this mindset, and indeed it perhaps supports the statement Thor wrote in his Herding Cats article:</p>
<quote>Considering that live coding as a performance method represents a propitious and natural way
of engaging with notation or instructions in real time, we might question whether the approach
of defining live coding as a specific category is necessary from a longer-term perspective. At least we might rethink in which contexts it might be beneficial to maintain the category, because when the novelty wears off and the naturalization process has fully taken place, we may find the method blends so effortlessly into the diverse art forms that we don\u2019t need to talk about live coding anymore. In this future scenario, live coding simply becomes one of the most pertinent approaches among avail- able performance techniques that allow for real-time composition and improvisation.</quote>
<p>REF: <a href="${"https://direct.mit.edu/comj/article/38/1/8/94447/Herding-Cats-Observing-Live-Coding-in-the-Wild"}" rel="${"nofollow"}">https://direct.mit.edu/comj/article/38/1/8/94447/Herding-Cats-Observing-Live-Coding-in-the-Wild</a></p>`;
    }
  })}`;
});
