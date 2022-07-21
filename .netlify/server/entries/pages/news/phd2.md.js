import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-03-03",
  "title": "PhD Scholarship Opportunity",
  "description": "Open for applications",
  "featured": false
};
const Phd2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "stock/phd2advert.jpeg",
        alt: "A smiling young woman sitting in front of a laptop and a midi-keyboard. In the background there are yellow and blue shelves with instruments and fabrication devices.",
        caption: "Want to join the team? Application details below."
      }, {}, {})}
<p>The Intelligent Instruments Lab at the Iceland University of the Arts, in collaboration with the Department of Comparative Cultural Studies at the University of Iceland, invites applications for a PhD scholarship as part an European Research Council funded project called \u201CIntelligent Instruments: Understanding 21st Century AI Through Creative Music Technologies.\u201D </p>
<p>We seek applications from highly qualified and motivated people to perform research on musical performance with intelligent instruments. The successful candidate will undertake a 3-year PhD programme working on individual research within the frame of the ERC project. The project explores how artificial intelligence is embedded in musical instruments and conducts a study in the phenomenology of such instruments, the psychology of performing, and how we can foster an understanding of the internals of new intelligent technologies. </p>
<p>The candidate will have a musical background (formal or not), experience in curating diverse musical events and collaborations, as well as an experience in the analysis and evaluation of musical performance.</p>
<p>The position is for three years and it is expected that the candidate will start on September 1st, 2022.</p>
<p>Director of Studies: Prof. Thor Magnusson.</p>
<p>Further information on the <a href="${"https://www.lhi.is/en/intent-phd-scholarship"}">Iceland University of Arts website</a>.</p>`;
    }
  })}`;
});
export {
  Phd2 as default,
  metadata
};
