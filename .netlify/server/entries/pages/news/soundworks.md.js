import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-02-04",
  "title": "Sound Works: An Orpheus Institute Publication",
  "description": "A research article about the Threnoscope",
  "featured": false
};
const Soundworks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Thor Magnusson\u2019s text <i>Designing the Threnoscope, or, How I Wrote One of My Pieces</i> has just been published in a new Orpheus Institute Publicaton called <a href="${"https://orpheusinstituut.be/en/publications/sound-work"}" target="${"_blank"}">Sound Work</a>. </p>
<p>Download the chapter here: <a href="${"http://users.sussex.ac.uk/~thm21/thor/pdfs/Magnusson_SoundWork.pdf"}" target="${"_blank"}">PDF</a></p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/soundwork.png",
        alt: "The front cover of the Sound Works book",
        caption: "A picture of medieval musicians"
      }, {}, {})}
<p>The Threnoscope live coding system started as a musical piece exploring ideas of microtonal music, surround sound, and long duration time frames. During its compositional design process the piece evolved into a live coding performance system, a hybrid of an instrument and a compositional system. The unfolding of the work took place in a context of live performances, audience feedback, user comments, and ideas that developed in concert with how the body of code grew and stabilised.</p>
<p>This chapter introduces the system, the research underpinning it, and describes how the bricoleur approach to programming served as a platform for asking questions that materialised in the engagement with the code, the physical properties of sound, and compositional ideas. The piece is a good example of a practice-based research, involving questions in the fields of music, human-computer interaction, programming language design, and user studies. </p>
<p>The chapter reflects on the nature of artistic research and how music software development goes hand in hand with music research. I demonstrate how the digital system\u2019s requirements for specifications and completeness inevitably forces a strong understanding of the source domain, namely the physical nature of sound. Such musical practice, when expressed through performance or composition, derives from a rigid research process, yet exists separately from it. </p>`;
    }
  })}`;
});
export {
  Soundworks as default,
  metadata
};
