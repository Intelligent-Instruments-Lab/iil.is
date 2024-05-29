---
layout: researchproject
title: "iipyper"
slug: "iipyper"
description: "Fast OSC and MIDI in Python"
featured: true
authors: ["Victor Shepardson", "Jack Armitage"]
highlight_image: "research/projects/iipyper.png"
highlight_caption: "iipyper OSC and MIDI examples."
---

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

`iipyper` is a Python package for fast creation of [Open Sound Control](https://en.wikipedia.org/wiki/Open_Sound_Control) (OSC) and MIDI-based event loops.
It can be installed via `pip install iipyper`.
`iipyper` is being used in many of our projects, including [Notochord](/research/notochord), [Living Looper](/research/livinglooper), [Organium](/research/organium) and [Tölvera](/research/tolvera).

There is widespread interest across music in exploring real-time interaction with artificial intelligence models and processes.
However, since most tools in this space reside in the Python ecosystem, this presents a challenge to creative coders in setting up communications protocols, and real-time event-loops.
Though many Python-based Open Sound Control (OSC) and MIDI libraries exist, they are alien to those with only machine learning backgrounds, and slow to get started with in a domain where rapid iteration is crucial, even for seasoned music technologists.
To address these issues, we introduce `iipyper`, a Python library optimised for rapid exploration of real-time music interaction with artificial intelligence.
`iipyper` makes trivial the creation of event-loop servers that communicate over OSC and MIDI, using highly flexible Python decorators for routing a variety of data types including sending and receiving n-dimensional arrays.
<!-- We show a multitude of `iipyper` examples including integrations with various clients including Max/MSP, Pure Data, and SuperCollider, and describe future work for improving the library. -->

Learn more and start using `iipyper` via the [iipyper website](https://intelligent-instruments-lab.github.io/iipyper/)

For examples and tutorials of how to use `iipyper`, see the [iil-examples](https://github.com/Intelligent-Instruments-Lab/iil-examples/tree/main/iipyper) repo.
