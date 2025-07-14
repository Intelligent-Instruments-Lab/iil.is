---
layout: researchproject
title: "Notochord"
slug: "notochord"
description: "Notochord is a MIDI model for live performance."
featured: true
authors: ["Victor Shepardson"]
highlight_image: "research/projects/notochord-homunculus.png"
highlight_caption: "Using the notochord homunculus terminal app with fluidsynth."
---

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

## <a href="https://intelligent-instruments-lab.github.io/notochord/" title="documentation">Python Package Documentation</a>  |  <a href="https://github.com/Intelligent-Instruments-Lab/notochord" title="repo">GitHub Repository</a>

Notochord is a machine learning model for MIDI data: once trained on a corpus of MIDI files, it can generate music. 
What makes Notochord interesting compared to similar MIDI models 
(like Magenta's <a href="https://magenta.tensorflow.org/performance-rnn" title="PerformanceRNN">PerformanceRNN</a> 
or the Metacreation Lab's <a href="https://jeffreyjohnens.github.io/MMM/" title="MMM">MMM</a>) 
is that it can generate one event at a time with very little delay, while allowing precise interventions into the note, timing, velocity, and instrumentation of each event. 
This makes Notochord a kind of software <a href="https://en.wikipedia.org/wiki/Notochord" title="wiki">backbone</a> for building intelligent MIDI instruments which you can touch with your hands. An application can query Notochord to provide accompaniment, harmonization, AI improvisation, or weirder forms of MIDI mangling -- see our videos for examples:

## ICMC 2025 demo paper on Notochord Homunculus
<a href="../pdf/2025_icmc_notochord_homunculus.pdf" title="homunculus demo paper">PDF link</a>

demo video:

<iframe width="100%" height="500" src="https://www.youtube.com/embed/u1ntK2Qg8vo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- homunculus demo ICMC -->

## Original AIMC 2022 Paper
<a href="https://zenodo.org/record/7088404" title="paper">Zenodo link</a>
<!-- <figure> -->

<CaptionedImage
  src="research/projects/notochord-diagram.png"
  alt="A block diagram describing the Notochord model architecture."
  caption="Architecture of the Notochord model (from the paper)."/>

<iframe width="100%" height="500" src="https://www.youtube.com/embed/mkBKAyudL0A" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- <figcaption>AIMC 2022 video presentation</figcaption> -->
<!-- </figure> -->

## AIMC 2024 Paper with Magetic Resonator Piano and Arca 
<a href="https://aimc2024.pubpub.org/pub/0lh6s86c/release/1" title="paper">PubPub link</a>

## ICMC 2025 Paper with Morse Code and LLMs
<a href="../pdf/2025_icmc_dit_dah_delta_token.pdf" title="paper">PDF link</a>

<iframe width="100%" height="500" src="https://www.youtube.com/embed/JLA901xCn4w?si=YlAwmN0VP3JHRBCw&amp;start=1137" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## AIMC 2023 Performance with Nicola Privato and Scramble

<iframe width="100%" height="500" src="https://www.youtube.com/embed/xpN5Bxvkq08?si=8t2yIQvq5To0uxWE&amp;start=1315" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!-- <CaptionedImage
  src="research/projects/notochord-action.jpg"
  alt="A screenshot of multiple code windows and video capture of a hand playing on a MIDI controller."
  caption="Using notochord with a MIDI controller and SuperCollider"/> -->

