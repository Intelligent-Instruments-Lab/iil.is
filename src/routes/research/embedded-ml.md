---
layout: researchproject
title: "Embedded Machine Learning on Bela"
description: "Enabling next-generation embedded instruments."
featured: false
authors: ["Ezra Pierce", "Victor Shepardson", "Jack Armitage"]
highlight_image: "research/projects/embedded-ml-trace.png"
highlight_caption: "Tracing low-level IREE operations running on Bela."
---

The goal of this project is to improve the tooling surrounding embedded machine learning on the BeagleBone Black(BBB)/Bela to aid its community in experimenting with machine learning applications for their projects. The specific developer tools chosen for this project are an inference benchmarking tool as well as a perf-based profiler developed for the BBB/Bela platform.

Bela is a platform built upon the BeagleBone Black, consisting of an audio cape and a custom real-time Linux image using the Xenomai framework. This platform provides a low-latency computing environment ideal for use in audio applications. There already exists a large community surrounding the Bela, as it is an increasingly popular platform for use in educational settings as well as musical instrument design and maker communities. This project aims to extend the Bela platform to include tools and documentation for machine learning projects, with the goal of simplifying the process of integrating machine learning models into real-time embedded Bela projects. As the Bela platform has been adopted by a wide range of users, from artists to engineers, this project will aim to provide tooling that caters to this broad userbase.

- Project Proposal: https://elinux.org/BeagleBoard/GSoC/2022_Proposal/Running_Machine_Learning_Models_on_Bela
- GSoC public page: https://summerofcode.withgoogle.com/programs/2022/projects/ky4Dpka9
- Weekly Reports: https://forum.beagleboard.org/t/weekly-progress-report-machine-learning-on-bela/32366
- Final GSOC writeup: https://gist.github.com/ezrapierce000/af89fdab4dac376f21f2a836807c6c62

