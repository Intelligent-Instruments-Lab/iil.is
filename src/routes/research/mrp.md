---
layout: researchproject
title: "Magnetic Resonator Piano"
slug: "mrp"
description: "Projects with Atli Örvarsson & Arca, installations & more"
featured: true
authors: ["Jack Armitage", "Victor Shepardson", "Thor Magnusson"]
highlight_image: "research/projects/mrp-arca.jpg"
highlight_caption: "Arca performing on the MRP. Courtesy of Pinault Collection. Photo: Léonard Méchineau."
---

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

## Magnetic Resonator Piano (MRP)

The [magnetic resonator piano](https://andrewmcpherson.org/project/mrp) (MRP) is an augmented piano which uses electromagnets to elicit new sounds from the strings of a grand piano. 
The MRP extends the sonic vocabulary of the piano to include infinite sustain, crescendos from silence, harmonics, pitch bends and new timbres, all produced acoustically without the use of speakers. 
The Augmented Instruments Laboratory website features more details about the [research and technology](https://instrumentslab.org/research/mrp.html) behind the MRP.

Our [iimrp](https://intelligent-instruments-lab.github.io/iimrp/) repository contains a Python package of the same name, that implements the MRP's MIDI-over-OSC protocol.
The repo also includes MRP clients for Max/MSP and TidalCycles, and a simulator for SuperCollider.
Examples can be found in our [iil-examples](https://github.com/Intelligent-Instruments-Lab/iil-examples/tree/main/iimrp) repo.

## Atli Örvarsson's BAFTA Award-Winning Apple TV+ Silo Soundtrack

[Jack Armitage](/people#jack-armitage) collaborated with [Atli Örvarsson](https://en.wikipedia.org/wiki/Atli_%C3%96rvarsson) on the soundtrack for Silo on Apple TV+.
The pair installed the MRP in Atli's studio in Akureyri in summer 2022, just as the first Silo sessions were taking place, and the instrument became a notable part of the composition process and final score.
In 2024, Atli won the Original Music: Fiction BAFTA.

Press:
- RÚV: https://www.ruv.is/frettir/menning-og-daegurmal/2024-04-28-atli-orvarsson-hlaut-bafta-verdlaun-411487
- Iceland Review: https://www.icelandreview.com/culture/composer-atli-orvarsson-receives-bafta-award/
- Reykjavík Grapevine: https://grapevine.is/news/2024/04/29/atli-orvarsson-receives-bafta-award/
- Icelandic Film Centre: https://www.icelandicfilmcentre.is/news/atli-orvarsson-receives-bafta-award

<iframe width="500" height="315" src="https://www.youtube.com/embed/rhCFHrrFwNw" title="Atli Örvarsson wins the Original Music: Fiction BAFTA for Silo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Augmenting Notochord for Arca's "The Light Comes in the Name of the Voice" MRP Installation (AIMC 2024)

Generative MIDI models are increasingly prevalent as creative compositional aids and musical performance tools, learning from large MIDI datasets to offer completions, continuations, in-painting and more. 
However, their expressive capabilities are limited by the low fidelity and dimensionality of the MIDI protocol itself, and don't perform as well in unstructured improvisatory scenarios due to being trained mainly on structured and bar-aligned compositions. 
We present an approach to overcoming these limitations, which emerged out of a collaboration with the artist [Arca](https://en.wikipedia.org/wiki/Arca_(musician)) where her Magnetic Resonator Piano (MRP) performances were turned into a seven-hour installation. 
The real-time probabilistic model [Notochord](/researc/notochord) learned in-context from Arca's playing, and via further structural constraints improvised new MIDI continuations.
Arca's continuous gestural data from the MRP were then re-mapped onto the new MIDI notes, creating endless renditions that retained gestural subtlety.
We reflect on the various uncanny aspects of the installation and how this approach could be taken further, and share code and notebooks documenting our process for others to build on.

- AIMC 2024: https://aimc2024.pubpub.org/pub/0lh6s86c
- Pinault Collection: https://www.pinaultcollection.com/en/boursedecommerce/arca-presents-light-comes-name-voice

## Strengjavera (AIMC 2023)

[Strengjavera](https://nordichouse.is/en/event/strengjavera-by-jack-armitage/) (“string being”) is an installation that delves into the concept of self-organising systems through the interaction of artificial life programs created via [Tölvera](/research/tolvera) with an acoustic grand piano. 
Viewers are invited to witness the unpredictable yet mesmerising patterns that emerge as the piano’s strings are set into motion by electromagnetism, controlled by biomimetic simulations. 
The piece explores the potential for agential systems to adapt and evolve in real-time, creating a dynamic and ever-changing soundscape that reflects the complexity and beauty of natural systems. 
By blurring the boundaries between technology and nature, Strengjavera prompts viewers to reflect on the relationship between human agency and autonomous systems, while also celebrating the beautiful natural acoustics of the piano in novel and unheard ways.

- AIMC 2023 proceedings: https://aimc2023.pubpub.org/pub/83k6upv8

<iframe width="500" height="315" src="https://www.youtube.com/embed/W2c8vFmdANY" title="Strengjavera" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
