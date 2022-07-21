import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2021-10-18",
  "title": "In the Icelandic Media",
  "description": "Introductions to the project in Icelandic",
  "featured": false
};
const Icelandic_news = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Primary Investigator Thor Magnusson, has been asked on several occasions to present the Intelligent Instruments project in the Icelandic media. These are some of our favourite moments, note that all of the interviews are in Icelandic. </p>
<h2>An Article in \xDEr\xE6\xF0ir</h2>
<p>Atli Ing\xF3lfsson, an editor of \xDEr\xE6\xF0ir - the research journal of the Iceland University of the Arts Music Department - invited us to write an article on the Intelligent Instruments project.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/thraedir.png",
        alt: "A photo of graphics from Thraedir web page. At the top it says Listah\xE1sk\xF3li \xCDslands Iceland University of the Arts and at the bottom it says \xDEr\xE6\xF0ir. In the background, chaotic threads with motion blur.",
        caption: "A screen grab from the Thraedir website."
      }, {}, {})}
<p>The article discusses the baseline of the IIL research questions. The title in English is: Smart Instruments - Understanding 21st Century AI Through Creative Music Technologies. </p>
<p><a href="${"https://www.lhi.is/en/node/15311"}">Read full article here. </a></p>
<h2>An Interview in Hugarflug at the Start of the Project </h2>
<p>On February 12th 2021, Thor did a 60 minute live stream with the Hugarflug mini-conference hosted by the Iceland University of Arts. His aim was to answer the question of what meaning AI has for creative processes. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/hugarflug.png",
        alt: "Two men sitting in chairs by a table, having a discussion.",
        caption: "Thor being interviewed in the Hugarflug series."
      }, {}, {})}
<p><a href="${"https://hugarflug.lhi.is/Torhallur-Magnusson"}">Watch the Interview here. </a></p>
<h2>An Introduction in Fr\xE9ttabla\xF0i\xF0 </h2>
<p>On September 24th, mainstream media Fr\xE9ttabla\xF0i\xF0 published an interview with Thor about the project. There he explained the terms we\u2019re working with and answered questions such as \u201Cwhat is a smart-instrument\u201D, \u201Cdo composers use AI in their creations?\u201D and \u201Chow is the funding important for the topic?\u201D</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/frettabladid21.jpg",
        alt: "A man standing with a part of a speaker. Shelves in the background.",
        caption: "Photo by EY\xDE\xD3R/Fr\xE9ttabla\xF0i\xF0."
      }, {}, {})}
<p><a href="${"https://www.frettabladid.is/kynningar/nai-samband-vi-hljofri-me-gervigreind/"}">Read the full interview here. </a></p>
<h2>An Interview on the National Radio Broadcast Iceland </h2>
<p>Shortly after receiving the ERC grant, on December 10th 2020, Lestin, a cultural program of the National Radio Broadcast Services in Iceland (R\xDAV), interviewed Thor about what this means for the science behind AI and instruments. </p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/lestin2020.png",
        alt: "A screen grab from RUV\u2019s website. Man in the background on the left, on the right a silhouette of a man coding, a play button in the middle. Text at the bottom saying T\xEDmam\xF3tastyrkur til ranns\xF3knarverkefnis \xE1 velum LH\xCD.",
        caption: "A screenshot of R\xDAV\u2019s website."
      }, {}, {})}
<p><a href="${"https://www.ruv.is/frett/2020/12/10/timamotastyrkur-til-rannsoknarverkefnis-a-vegum-lhi"}">Listen and read the full interview here. </a></p>`;
    }
  })}`;
});
export {
  Icelandic_news as default,
  metadata
};
