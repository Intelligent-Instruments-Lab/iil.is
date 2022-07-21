import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-06-09",
  "title": "Robin joins the IIL, turning weather data into music",
  "description": "On Robin's project this summer",
  "featured": true
};
const Robin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>We\u2019re happy to have Robin Morabito join us this summer for an internship supported by the Student Innovation Fund. He\u2019ll be working on a very exciting project, transforming weather data into sound! Here you can read all about him and his project, in his own words\u2026</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/robin_device.jpeg",
        alt: "A young man holding an unusual device. Yellow shelving system in the background.",
        caption: "Robin Morabito designed an interactive sonification instrument."
      }, {}, {})}
<p>I\u2019m Robin, recently graduated from Composition - New Media at the Iceland University of the Arts. I\u2019ve played music since I was a kid, starting with guitar and slowly extending to violin, vocal studies, computer music and sound engineering. These last few years I got increasingly interested in sonification, which is an awesome way to make music out of raw data and learn what information those data contain. </p>
<p>I did some experiments with real-time Icelandic weather data during the past couple of years, culminating in two pieces: Ve\xF0urhorni\xF0 (an interactive performance using weather data and Facebook reactions in real-time to generate an extended French horn score) and Ve\xF0urg\xEDtarar (a Max patch using real-time weather data to produce generative music).
\xA0</p>
<p>Ve\xF0urhorni\xF0:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/B3oXS7LfJ2I"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<p>Ve\xF0urg\xEDtarar:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/vr4iij3tnBw"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<p>In my last piece, presented on May the 17th in Reykjav\xEDk (Dynjandi hall), I used a Bela sensor board to embed a generative Pure Data music patch inside of a sculpture suspended in the middle of the air; audience could interact with the object and the soundscape produced via 6 sensors placed on the body of the sculpture. This interactive sound installation, obscurely titled \u201CThe only object they could retrieve from Earth\u2019s lost civilization\u201D, anticipates the project I hope to keep developing at the Intelligent Instrument Lab: an interactive sonification instrument, capable of adapting to the person using it and to the kind of dataset chosen. </p>
<p>\xA0
The Only Object They Could Retrieve from Earth\u2019s Lost Civilization</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/nAro0fELOv8"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
\xA0
<p>Sonification is becoming more and more popular to portray large multidimensional datasets, which can be perfectly represented with music. While our technology becomes increasingly complex, we have to find instruments to relate to the data that we produce and study: that\u2019s why sonification is so exciting, and why I wanted to spend three months in the lab learning more about it while learning how to perfect this process, to ultimately provide the community of people interested with additional resources for augmented sonification and sonification tools.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/schermata2.png",
        alt: "A strange metalic instrument, a hand close to it.",
        caption: "Robin's instrument."
      }, {}, {})}`;
    }
  })}`;
});
export {
  Robin as default,
  metadata
};
