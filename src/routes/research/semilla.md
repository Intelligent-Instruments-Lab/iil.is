---
layout: researchproject
title: "Semilla AI"
slug: "semilla"
description: "A Mexican instrument of sonic clairvoyance"
featured: true
authors: ["Moises Horta Valenzuela"]
highlight_image: "research/projects/semilla1.jpg"
highlight_caption: "A picture of the instrument"
---

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

SEMILLA AI, authored by Moisés Horta Valenzuela under the pseudonym 𝔥𝔢𝔵𝔬𝔯𝔠𝔦𝔰𝔪𝔬𝔰, delves into the world of divination, a technique used for interpretative pattern recognition across ancient and contemporary cultures. This practice, ranging from the Chinese I Ching's casting of fifty yarrow stalks to Tarot card readings, involves decoding seemingly random arrangements and symbolism to predict the future. These divinatory traditions have deep historical roots in magic and proto-scientific fields, like alchemy, all sharing a common goal of unraveling intricate patterns in reality to make life more manageable.

SEMILLA AI is a project that explores the techno-poetics of Mesoamerican divination through "maiz throwing" and positions it as an interface for uncovering and exploring the "latent space" or hyperdimensional data distribution within a generative neural network for audio synthesis.

<CaptionedImage
  src="research/projects/semilla3.jpg"
  alt="A picture of the Semilla interface"
  caption="The Semilla interface"/>

The project takes its name, SEMILLA AI, from the word "seed," drawing a poetic parallel between the Deep Learning practice of using "seeds" (integer numbers to generate pseudo-random numbers) and the Mesoamerican Mixe ancient-contemporary divination practice known as "Mook pajk wëjwë". In this context, "Mook" signifies maize, "pajk" refers to a seed, and "wëjwë (or wëjpë)" means to divine (Rojas, 2016). The divinatory practice serves as an interface to inject real-world randomness into the process of synthesizing new sounds using neural networks for sound synthesis.

The SEMILLA AI instrument employs computer vision techniques to translate the coordinates of the thrown maize in the "world-space" interface and utilizes knobs to scale their values. The synthesis engine runs on a GPU-powered micro-computer, a Jetson Nano, enabling real-time audio inference. This neural audio synthesis engine is based on the open-source architecture called 'RAVE: Realtime Variational Autoencoder' developed by Antoine Caillon at acids-IRCAM. It adopts a 'decoder-only' approach, where the coordinates of the maize captured by the computer vision module are directly mapped into the 'latent space,' with each seed kernel corresponding to a specific 'dimension' in the VAE's decoder.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_2C3XeQgGtY?si=TP69qtf42LStzius" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This ongoing artistic-research project aims to re-enchant the typically cold and statistical culture of Machine Learning poetics by looking beyond the Western paradigm of 'optimized' interfaces. Instead, it focuses on indigenous epistemologies, redirecting the research gaze to consider how these can reshape our relationship with predictive systems, such as modern-day AI.

# Links:
[http://semilla.ai](http://semilla.ai)
[http://moiseshorta.audio](http://moiseshorta.audio)
[http://hexorcismos.bandcamp.com](http://hexorcismos.bandcamp.com)
