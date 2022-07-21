import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-04-04",
  "title": "The Google Summer of Code",
  "description": "Mentorship opportunity for students",
  "featured": false
};
const Google_summer_of_code = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Students, work with us this summer! We are offering Google Summer of Code mentorship in partnership with Bela Platform and Beagleboard. </p>
<p>In an exciting change to the policy in 2022, projects are now open to anyone who is new to open source and would like to gain experience of contributing code to an open source project.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
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
export {
  Google_summer_of_code as default,
  metadata
};
