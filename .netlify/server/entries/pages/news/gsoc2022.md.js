import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-05-20",
  "title": "Welcoming Ezra Pierce, GSOC 2022 contributor!",
  "description": "Ezra will work on ",
  "featured": true
};
const Gsoc2022 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Congratulations to Ezra Pierce, our first ever <a href="${"https://summerofcode.withgoogle.com/"}" target="${"_blank"}">Google Summer of Code</a> contributor, who is joining us via the <a href="${"https://beagleboard.org/"}" target="${"_blank"}">BeagleBoard</a> foundation.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
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
export {
  Gsoc2022 as default,
  metadata
};
