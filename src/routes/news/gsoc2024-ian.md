---
layout: news
date: "2024-05-24"
slug: "gsoc2024-ian"
title: "Welcoming Ian Clester, GSOC 2024 contributor!"
description: "Project: Differentiable Logic for Interactive Systems and Generative Music"
highlight_image: "people/ian.jpg"
featured: true
---

<script> import CaptionedImage from "../../components/Images/CaptionedImage.svelte" </script>

Congratulations to [Ian Clester](/people#ian-clester), our second <a href="https://summerofcode.withgoogle.com/" target="_blank">Google Summer of Code</a> contributor, who is joining us via the <a href="https://beagleboard.org/" target="_blank">BeagleBoard</a> foundation.
Ian is a PhD student in Music Technology at Georgia Tech in the [Computational Music for All lab](https://gtcmt.gatech.edu/computational-music-for-all).
Ian will be mentored by [Dr Jack Armitage](/people#jack-armitage) from the Intelligent Instruments Lab, and [Dr Chris Kiefer](https://profiles.sussex.ac.uk/p208667-chris-kiefer) from the [Experimental Music Technologies (Emute) Lab](https://www.emutelab.org/), University of Sussex, UK.

Read about Ian's project below.

<CaptionedImage
  src="people/ian.jpg"
  alt="Ian Clester"
  caption="Ian Clester"/>

## Differentiable Logic for Interactive Systems and Generative Music

The general aim of this project is to enable the development of models that are suitably efficient for use in real-time interactive applications on embedded systems (particularly the BeagleBone-based [Bela](http://bela.io)). At the project’s core is [difflogic](https://github.com/Felix-Petersen/difflogic), a recent technique that employs sparsely-connected network composed of basic logic gates (rather than densley-connected neurons with complex activation functions) to obtain small models and fast inference. Thus, the first and foremost goal of the project is to enable a convenient workflow for developing difflogic models and running them on the Bela. The expected use case is developing and training models on a larger machine (e.g. a laptop, desktop, or server), followed by exporting the model to C and cross-compiling it for the BeagleBone - either the main CPU (ARM Cortex-A8) or the PRUs. To support this workflow, I will develop wrappers for exporting compiled difflogic models for use in the various languages supported on Bela (C++, Pure Data, SuperCollider, Csound). These wrappers will likely take inspiration from other projects that bring machine learning into computer music environments, such as nn~ and FluCoMa. This first goal, along with profiling and benchmarking the performance of difflogic models on both the main CPU and the PRUs, constitutes roughly the first half of the project.

Read Ian's full project proposal [on the BeagleBoard website](https://gsoc.beagleboard.io/proposals/ijc.html), and follow his weekly updates [on the BeagleBoard Forum](https://forum.beagleboard.org/t/weekly-progress-report-differentiable-logic-for-interactive-systems-and-generative-music/38486). 
