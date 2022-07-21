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
  default: () => Karl,
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
  "date": "2022-07-04",
  "title": "Karl J\xF3hannsson joins IIL this summer",
  "description": "An intelligent txalaparta percussion instrument is born",
  "featured": true
};
const Karl = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>A warm welcome to Karl J\xF3hannsson who is working with us this summer researching a percussion instrument called txalaparta. </p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "news/karl.jpeg",
        alt: "Man sitting in front of a wooden percussion instrument, holding large wooden sticks. Yellow and blue shelving system in the background.",
        caption: "Karl J\xF3hannsson with his work in progress."
      }, {}, {})}
<h1 id="${"about-karl"}"><a href="${"#about-karl"}">About Karl</a></h1>
<p>My name is Karl and I am a MSc student in Computer Science at Reykjav\xEDk University, as well as studying at the F\xCDH school of music. I have a BA degree in psychology and philosophy from the University of Iceland and, subsequently, worked in software development for 14 years, ranging from web design to app development.</p>
<h1 id="${"about-the-project"}"><a href="${"#about-the-project"}">About the project</a></h1>
<p>My main project this summer will be teaching a computer to play an ancient Basque percussion instrument named txalaparta. It is typically played simultaneously by two players improvising in a call-and-response fashion and the goal is to get a computer to play along with a human txalaparta player. The instrument consists of a few long wooden planks that are beaten by special batons, which we have placed sensors on to abstract the human playing into data. The data is then fed into a system that processes it, learns its patterns, and responds with a prediction of when the next hit should be and which player will perform it. If all goes well, the computer will play along with a human txalaparta player in a convincing manner.</p>
<h1 id="${"what-is-txalaparta"}"><a href="${"#what-is-txalaparta"}">What is txalaparta</a></h1>
<p>We\u2019re very excited to see how that turns out as we will continue working with this idiophone instrument this year, studying the planks and sticks as well as the system that Karl is now working on. For those of you who don\u2019t know the instruments, here are some cool videos we found on Youtube:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/XaSYiBaqLwA"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/qwnAnB57H2k?start=485"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
`;
    }
  })}`;
});
