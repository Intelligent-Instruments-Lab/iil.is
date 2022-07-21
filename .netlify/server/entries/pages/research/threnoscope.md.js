import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { R as ResearchProject } from "../../../_app/immutable/chunks/ResearchProject-50c047b7.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
import "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
const metadata = {
  "layout": "researchproject",
  "title": "Threnoscope",
  "description": "The Threnoscope is a live coding environment for long durations.",
  "featured": true,
  "authors": ["Thor Magnusson"],
  "highlight_image": "research/projects/threnoscope.png",
  "highlight_caption": "The Threnoscope by Thor Magnusson."
};
const Threnoscope = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ResearchProject, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The <a href="${"https://thormagnusson.github.io/threnoscope/"}" title="${"Threnoscope"}">Threnoscope</a> is a live coding system focusing on three key areas of music: spatial sound, timbre and texture, and tunings and scales. It has affordances that result in long durational notes that can move around in space, change timbre (through filtering, resonance frequencies and waveforms) and pitch according to implementation of numerous tunings and scales.</p>
<p>The Threnoscope was intitially intended to be a musical piece, but became an expressive system, an investigation into spatial sound, wave interferences and the relationship of harmonic ratios and tuning systems from the world\u2019s various musical systems.</p>
<p>Implementing the Scala tuning library standard, the Thrensocope has access over 5000 tuning systems and scales, and it contains an application for creating your own microtonal tunings and scales.</p>`;
    }
  })}`;
});
export {
  Threnoscope as default,
  metadata
};
