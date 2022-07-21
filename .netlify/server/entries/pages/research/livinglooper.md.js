import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { R as ResearchProject } from "../../../_app/immutable/chunks/ResearchProject-50c047b7.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
import "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
const metadata = {
  "layout": "researchproject",
  "title": "Living Looper",
  "description": "The musical looper as a network of intelligent processes.",
  "featured": true,
  "authors": ["Victor Shepardson"],
  "highlight_image": "research/projects/supercollider.png",
  "highlight_caption": "Living Looper by Victor Shepardson."
};
const Livinglooper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>A looper records a short segment of audio and plays it back in a loop. This can be used to set up a background drone or texture, or allow one musician to perform multiple parts. A multi-channel looper can hold the layers of a rich texture or a complex composition.</p>
<p>An intelligent looper might do more than repeat verbatim. It might loop without disruption at the loop boundary, or continue as a never-precisely-repeating texture, or as what might have sounded next. It might control itself, unburdening but surprising the musician. Multiple loops might become sensitive to one another, entraining rhythmically or modulating timbres. One loop might reference to the events of an another loop as well as its own memory when it decides how to continue. The looper would be elevated from an effect or tool to an intelligent instrument in itself. The musician would not direct the looper to achieve a particular effect, but listen to it, garden it, negotiate with it. </p>
<p>My project, the \u201Cliving looper\u201D, will explore these ideas. Performing with a looper involves carefully choosing the sounds in a loop and aligning loops precisely. With the living looper, instead the processes and interconnections between loops will be carefully assembled into a performance. Within the IIL, the living looper will be a point of convergence for machine listening, generative models, instruments and musicians. It will compose with our other instruments, and its intelligent modules will find other lives in other instruments.</p>`;
    }
  })}`;
});
export {
  Livinglooper as default,
  metadata
};
