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

<!-- <figure> -->
<iframe width="100%" height="500" src="https://www.youtube.com/embed/mkBKAyudL0A" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- <figcaption>AIMC 2022 video presentation</figcaption> -->
<!-- </figure> -->


## <a href="https://intelligent-instruments-lab.github.io/notochord/" title="documentation">Python Package Documentation</a>

## <a href="https://zenodo.org/record/7088404" title="paper">AIMC 2022 Paper</a>

## <a href="https://github.com/Intelligent-Instruments-Lab/notochord" title="repo">GitHub Repository</a>

Notochord is a machine learning model for MIDI data: once trained on a corpus of MIDI files, it can generate music. 
What makes Notochord interesting compared to similar MIDI models 
(like Magenta's <a href="https://magenta.tensorflow.org/performance-rnn" title="PerformanceRNN">PerformanceRNN</a> 
or the Metacreation Lab's <a href="https://jeffreyjohnens.github.io/MMM/" title="MMM">MMM</a>) 
is that it can generate one event at a time with very little delay, while allowing precise interventions into the note, timing, velocity, and instrumentation of each event. 
This makes Notochord a kind of software <a href="https://en.wikipedia.org/wiki/Notochord" title="wiki">backbone</a> for building intelligent MIDI instruments which you can touch with your hands. An application can query Notochord to provide accompaniment, harmonization, AI improvisation, or weirder forms of MIDI mangling -- see our video above for examples.

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

<CaptionedImage
  src="research/projects/notochord-diagram.png"
  alt="A block diagram describing the Notochord model architecture."
  caption="Architecture of the Notochord model (from the paper)."/>

<CaptionedImage
  src="research/projects/notochord-action.jpg"
  alt="A screenshot of multiple code windows and video capture of a hand playing on a MIDI controller."
  caption="Using notochord with a MIDI controller and SuperCollider"/>

## <a href="https://aimc2024.pubpub.org/pub/0lh6s86c/release/1" title="paper">AIMC 2024 Paper with Magetic Resonator Piano and Arca</a>