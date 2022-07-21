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
  default: () => Nime_2022_workshop,
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
  "date": "2022-05-03",
  "title": "Workshop on Embedded AI at NIME 2022",
  "description": "Call for Workshop Abstracts on Embedded AI for NIME: Challenges and Opportunities.",
  "featured": true
};
const Nime_2022_workshop = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>We are welcoming submissions for the workshop Embedded AI for NIME: Challenges and Opportunities (<a href="${"https://embedded-ai-for-nime.github.io/"}" rel="${"nofollow"}">https://embedded-ai-for-nime.github.io/</a>) that will take place during the (online) NIME 2022 Conference (28th June - 1st July 2022).</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "research/projects/protolangspil2.jpg",
        alt: "The proto-langspil digital musical instrument with Bela hardware platform inside.",
        caption: "The Intelligent Instrument Lab's proto-langspil instrument with a Bela inside."
      }, {}, {})}
<h1 id="${"deadline"}"><a href="${"#deadline"}">Deadline</a></h1>
<p>3 June 2022 Anywhere on earth (AoE) UTC-12</p>
<h1 id="${"abstract"}"><a href="${"#abstract"}">Abstract</a></h1>
<p>Despite recent advancements in low-resource computing hardware, such as microcontrollers or single board computers, the deployment of machine learning or symbolic artificial intelligence (AI) techniques still presents several technical challenges and higher-level design constraints. With this workshop, we aim to: (1) bring together a body of research practitioners that face such challenges in the context of NIME, (2) articulate these challenges and identify the tools and strategies being currently used to overcome them, (3) forge a community of practitioners of embedded AI for NIME and (4) discuss critical approaches on the use of embedded AI for musical expression.</p>
<h1 id="${"embedded-ai-for-nime"}"><a href="${"#embedded-ai-for-nime"}">Embedded AI for NIME</a></h1>
<p>Cutting edge embedded systems have always been a part of NIME\u2019s practices. Low-resource computing hardware, such as microcontrollers or single-board computers, can be embedded into digital musical instruments or interfaces to perform specific functions such as real-time digital signal processing of sensor data and sound. Simultaneously, an interest in exploiting the creative potentials of artificial intelligence (AI) for instrument design and musical expression has been growing within the NIME community in the past years. Recent advancements in embedded computing have allowed for faster and more intensive computation capabilities. However, the deployment of machine learning or symbolic AI techniques still presents several technical challenges (e.g., data bandwidth, memory handling) and higher-level design constraints. Some of these challenges are general to embedded systems, while others are specific to musical interaction, particularly questions regarding real-time performance and latency. Deploying AI models on embedded systems is an emerging and fast-changing field. A workshop is an excellent opportunity for practitioners to present works in progress and collaboratively identify shared challenges. We expect this workshop to serve as the starting point for an embedded AI NIME community and as future reference to help researchers get started with embedded AI.</p>
<h1 id="${"submissions"}"><a href="${"#submissions"}">Submissions</a></h1>
<p>The workshop will run as part of the NIME 2022 conference, and participants will need to be registered in NIME (<a href="${"https://nime2022.org/registration.html"}" rel="${"nofollow"}">https://nime2022.org/registration.html</a>, scholarships are available here: <a href="${"https://auckland.au1.qualtrics.com/jfe/form/SV_efCpUL21iYGZFKC"}" rel="${"nofollow"}">https://auckland.au1.qualtrics.com/jfe/form/SV_efCpUL21iYGZFKC</a>). Presenters will give a 10-minute talk. After each set of 2-3 talks, we will have a panel discussion with presenters, organisers and attendees. We aim to accommodate participants in different time zones by running two sessions spaced 5-7 hours apart. We are welcoming proposal submissions in the form of extended abstracts. The extended abstract should describe the format of the talk, briefly summarise its contents, and explain its relevance to the workshop. Successful submissions\u2019 abstracts will be published in online proceeding (participants will have the opportunity to edit the abstract for the camera-ready version). The proposal can be for a demo, a poster presentation, a progress report, a short paper presentation\u2026 anything of relevance to the topic of Embedded AI for NIME that fits in 10 minutes. The proposal should have an extension of 400-600 words and can be submitted <a href="${"https://docs.google.com/forms/d/e/1FAIpQLSf45SRpbpJyWKkbibhp4UDZ1MwQW_NKTohkwAvAsaCB4tFx8g/viewform"}">here</a>.</p>
<h1 id="${"topics-include-but-are-not-limited-to"}"><a href="${"#topics-include-but-are-not-limited-to"}">Topics include, but are not limited to:</a></h1>
<ul><li>Any technical prototype or concrete implementation of resource-constrained systems using AI in the context of NIME</li>
<li>Design strategies and conceptual frameworks for embedded AI</li>
<li>Interaction paradigms for systems using embedded AI</li>
<li>Embedded and real-time neural audio synthesis methods (e.g., neural, artificial life, statistical methods, etc.)</li>
<li>AR/MR/VR systems using AI in the context of NIME</li>
<li>Mobile computing systems using AI in the context of NIME</li>
<li>Musical uses of AI in embedded platforms</li>
<li>Workflows for improving AI implementations between laptop, embedded/real-time and HPC platforms</li>
<li>Development environments for interactive machine learning in embedded context, particularly those targeting non-expert users</li>
<li>Values, biases, ethical and philosophical issues with embedded AI in musical performance</li>
<li>Inclusivity and diversity in emerging embedded AI communities</li></ul>
<h1 id="${"organisers"}"><a href="${"#organisers"}">Organisers</a></h1>
<p>Augmented Instruments Lab, Queen Mary University of London: Teresa Pelinski, Franco Santiago Caspe, Ad\xE1n L Benito Temprano, Andrew McPherson</p>
<p>Intelligent Instruments Lab, Iceland University of the Arts: Victor Shepardson, Jack Armitage, Thor Magnusson</p>
<p>Experimental Music Technologies Lab, University of Sussex: Steve Symons, Chris Kiefer</p>
<p>Creative Computing Institute, University of the Arts London: Rebecca Fiebrink</p>
<p>For additional information or questions, you can contact Teresa Pelinski (<a href="${"mailto:t.pelinskiramos@qmul.ac.uk"}">t.pelinskiramos@qmul.ac.uk</a>).</p>`;
    }
  })}`;
});
