---
layout: researchproject
title: "Notochord"
description: "Notochord is a prababilistic model for MIDI performance."
featured: true
authors: ["Victor Shepardson"]
highlight_image: "research/projects/notochord-action.png"
highlight_caption: "Interacting with the Notochord model using a MIDI controller"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/mkBKAyudL0A" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Notochord is a machine learning model for MIDI data: once trained on a corpus of MIDI files, it can generate music. 
What makes Notochord interesting compared to similar MIDI models 
(like Magenta's <a href="https://magenta.tensorflow.org/performance-rnn" title="PerformanceRNN">PerformanceRNN</a> 
or the Metacreation Lab's <a href="https://jeffreyjohnens.github.io/MMM/" title="MMM">MMM</a>) 
is that it can generate one event at a time with very little delay, while allowing precise interventions into the note, timing, velocity, and instrumentation of each event. 
This makes Notochord a kind of <a href="https://en.wikipedia.org/wiki/Notochord" title="wiki">backbone</a> for building intelligent MIDI instruments. An application can query Notochord to provide accompaniment, harmonization, AI improvisation, or weirder forms of MIDI mangling -- see our video above for examples.

You can also read the <a href="https://zenodo.org/record/7088404" title="paper">AIMC paper</a> describing Notochord, or grab the code and model checkpoints from our <a href="https://github.com/Intelligent-Instruments-Lab/iil-python-tools" title="repo">GitHub repository</a>.

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

<CaptionedImage
  src="research/projects/notochord-diagram.png"
  alt="A block diagram describing the Notochord model architecture."
  caption="Architecture of the Notochord model (from the paper)."/>