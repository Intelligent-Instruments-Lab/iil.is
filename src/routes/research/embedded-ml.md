---
layout: researchproject
title: "Embedded ML on Bela"
slug: "embedded-ml"
description: "Enabling next-generation embedded instruments."
featured: false
authors: ["Ian Clester", "Ezra Pierce", "Chris Kiefer", "Jack Armitage", "Victor Shepardson"]
highlight_image: "research/projects/flucoma-bela-mrp.jpg"
highlight_caption: "Bela running FluCoMa inside a Magnetic Resonator Piano."
---

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

[Bela](http://bela.io) is a platform built upon the [BeagleBone Black](http://beagleboard.org), created by our collaborators at the [Augmented Instruments Lab](http://instrumentslab.org), consisting of an audio cape and a custom real-time Linux image using the Xenomai framework. 
This platform provides a low-latency computing environment ideal for use in audio applications. 
There already exists a large community surrounding the Bela, as it is an increasingly popular platform for use in educational settings as well as musical instrument design and maker communities. 
We have been working on a number of different projects aiming to make embedded ML on Bela more accessible and performant.

## Differentiable Logic for Interactive Systems and Generative Music

The general aim of this project is to enable the development of models that are suitably efficient for use in real-time interactive applications on embedded systems (particularly the BeagleBone-based [Bela](http://bela.io)). At the project’s core is [difflogic](https://github.com/Felix-Petersen/difflogic), a recent technique that employs sparsely-connected network composed of basic logic gates (rather than densley-connected neurons with complex activation functions) to obtain small models and fast inference. Thus, the first and foremost goal of the project is to enable a convenient workflow for developing difflogic models and running them on the Bela. The expected use case is developing and training models on a larger machine (e.g. a laptop, desktop, or server), followed by exporting the model to C and cross-compiling it for the BeagleBone - either the main CPU (ARM Cortex-A8) or the PRUs. To support this workflow, I will develop wrappers for exporting compiled difflogic models for use in the various languages supported on Bela (C++, Pure Data, SuperCollider, Csound). These wrappers will likely take inspiration from other projects that bring machine learning into computer music environments, such as nn~ and FluCoMa. This first goal, along with profiling and benchmarking the performance of difflogic models on both the main CPU and the PRUs, constitutes roughly the first half of the project.

Read Ian's full project proposal [on the BeagleBoard website](https://gsoc.beagleboard.io/proposals/ijc.html), and follow his weekly updates [on the BeagleBoard Forum](https://forum.beagleboard.org/t/weekly-progress-report-differentiable-logic-for-interactive-systems-and-generative-music/38486). 

<!-- 
<CaptionedImage
  src="research/projects/flucoma-bela-mrp.jpg"
  alt="Bela running FluCoMa inside a Magnetic Resonator Piano."
  caption="Bela running FluCoMa inside a Magnetic Resonator Piano."/> -->

## FluCoMa on Bela

The [Fluid Corpus Manipulation project (FluCoMa)](http://flucoma.org) instigates new musical ways of exploiting ever-growing banks of sound and gestures within the digital composition process, by bringing breakthroughs of signal decomposition DSP and machine learning to the toolset of techno-fluent computer composers, creative coders and digital artists.
This has been successfully used in conjunction with our [Magnetic Resonator Piano](/research/mrp) projects.

Visit our [flucoma-bela](https://github.com/jarmitage/flucoma-bela) repo to get started with FluCoMa on Bela.

## Bela-IREE: An Approach to Embedded Machine Learning for Real-Time Music Interaction (AIMC 2023)

The goal of this project is to improve the tooling surrounding embedded machine learning on the BeagleBone Black(BBB)/Bela to aid its community in experimenting with machine learning applications for their projects. The specific developer tools chosen for this project are an inference benchmarking tool as well as a perf-based profiler developed for the BBB/Bela platform.

<CaptionedImage
  src="research/projects/embedded-ml-trace.jpg"
  alt="Tracing low-level IREE operations running on Bela."
  caption="Tracing low-level IREE operations running on Bela."/>

This project aims to extend the Bela platform to include tools and documentation for machine learning projects, with the goal of simplifying the process of integrating machine learning models into real-time embedded Bela projects. As the Bela platform has been adopted by a wide range of users, from artists to engineers, this project will aim to provide tooling that caters to this broad userbase.

- AIMC 2023 paper: https://aimc2023.pubpub.org/pub/t2l10z49/
- Project Proposal: https://elinux.org/BeagleBoard/GSoC/2022_Proposal/Running_Machine_Learning_Models_on_Bela
- GSoC public page: https://summerofcode.withgoogle.com/programs/2022/projects/ky4Dpka9
- Weekly Reports: https://forum.beagleboard.org/t/weekly-progress-report-machine-learning-on-bela/32366
- Final GSOC writeup: https://gist.github.com/ezrapierce000/af89fdab4dac376f21f2a836807c6c62
