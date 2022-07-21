import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-04-07",
  "title": "PhD2 Still Open for Applications",
  "description": "A PhD scholarship deadline coming up",
  "featured": false
};
const Phd2_deadline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>With one month to go until the deadline (May 2nd to be precise) for applications for our second PhD scholarship, we wanted to take the time to elaborate further on why this position is so exciting to us, and how it will contribute to our project.</p>
<p>Our lab began work in September 2021 designing intelligent musical instruments, and by September 2022 when our second PhD researcher will start their research, we expect to have developed a good collection of instruments.</p>
<p>In addition to contributing to further development of these instruments and user test them, role of this second PhD researcher will be to take these instruments and insert them into real musical contexts: bands, ensembles, orchestras, studios, concerts, gigs, recording projects, exhibitions, workshops and more.</p>
<p>This PhD researcher will research the relationships that musicians and audiences create with intelligent instruments, investigating everything from how people initially encounter and perceive them, to how they eventually customise the instrumental intelligence through teaching them to adapt in different ways. The PhD researcher will also design their own instruments or systems, and make variations of the ones we have already.</p>
<p>The position will involve developing relationships across the musical culture of Iceland and beyond, and working with the most exciting venues in the country from Mengi to Harpa. It will also involve developing and curating outlets such as Intelligent Instrument Records to facilitate further musical interactions and discourses.</p>
<p>In short, this will be an extremely fun and unique position, that puts the researcher at the nexus of where new intelligent instruments meet musical culture.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/sigga-4884.jpg",
        alt: "A young woman with a fiddle stick sitting in front of four proto-langspil trichord instruments, some are connected with electrical wires. Behind her is a yellow shelving system with musical instruments and electronic parts.",
        caption: "Our research intern Sigga exploring the proto-langspil at the Intelligent Instruments Lab."
      }, {}, {})}
<p>The deadline is May 2nd. This position is for three years and it is expected that the candidate will start on September 1st, 2022.</p>
<p>If you have any questions about this position, please do reach out to us at <a href="${"mailto:iil@lhi.is"}">iil@lhi.is</a> - we are excited to hear from you!</p>
<p>Read our original announcement here: <a href="${"http://iil.is/news/phd2"}" rel="${"nofollow"}">http://iil.is/news/phd2</a></p>
<p>Further information on the\xA0Iceland University of Arts website: <a href="${"https://www.lhi.is/en/intent-phd-scholarship"}" rel="${"nofollow"}">https://www.lhi.is/en/intent-phd-scholarship</a></p>`;
    }
  })}`;
});
export {
  Phd2_deadline as default,
  metadata
};
