---
layout: researchproject
title: "Sophtar"
slug: "sophtar"
description: "The Sophtar is a networkable feedback string instrument with embedded machine learning"
featured: true
authors: ["Federico Visi"]
highlight_image: "research/projects/sophtar-thumbnail-web.jpg"
highlight_caption: "The Sophtar."
---


<script>
    import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
    import YouTube from "../../components/Video/EmbedYouTube.svelte"
</script>

The Sophtar is a tabletop string instrument with an embedded system for digital signal processing, networking, and machine learning. It features a pressure-sensitive fretted neck, two sound boxes, and controlled feedback capabilities by means of bespoke interface elements. The design of the instrument is informed by [Federico Visi](https://iil.is/people#federico-visi)'s practice with hyperorgan interaction in networked music performance.

<YouTube
  id="8jfT23OIyD0" 
  caption="Exploring the Sophtar at the Intelligent Instruments Lab."/>

Visi designed the Sophtar and built it in collaboration with Sukandar Kartadinata. At IIL, the Sophtar was extended with actuators, on-board DSP, and machine learning models to make it respond to the player in ways that are not easy to predict yet meaningful and inspiring. 

In particular:

- we built an extension that allows the instrument to self-play by means of solenoids; 
- we implemented a per-string filtering system to control feedback for specific harmonics for each string;
- we embedded [Notochord](https://iil.is/research/notochord) models to activate the solenoids and tune the filters. This allows the Sophtar to respond to human playing as well as to play itself autonomously using generative approaches.

A study on Sophtar performance and interaction with symbolic models is currently underway.


<CaptionedImage
  src="research/projects/sophtar-solenoids.jpg"
  alt="A 3D-printed mount holding a set of solenoids over the strings of the Sophtar instrument."
  caption="The solenoids mount designed for the Sophtar by [Halldor Úlfarsson](https://iil.is/people#halldor-úlfarsson) and [Federico Visi](https://iil.is/people#federico-visi)"/>


The Sophtar was presented at the [NIME 2024](https://www.nime2024.org/) conference in Utrecht, Netherlands, where it was also part of an improvised session with other instruments; at a [dedicated IIL Open Lab](https://iil.is/openlab/88); and the 
[IIL Diffractive Sonic Dialogues](https://iil.is/news/sonicdialogues) live performance evening at [MENGI](https://mengi.net) in Reykjavik.

Further information on [the Sophtar page](https://www.federicovisi.com/the-sophtar/).


## References

- _The Sophtar: a networkable feedback string instrument with embedded machine learning_. Federico Visi. *Proceedings of the International Conference on New Interfaces for Musical Expression 2024 ([NIME 2024](https://www.nime2024.org/))*, Utrecht, Netherlands. [DOI: 10.5281/zenodo.13904810](https://doi.org/10.5281/zenodo.13904810), [pdf](http://iil.is/pdf/2024_nime_visi_sophtar.pdf)

