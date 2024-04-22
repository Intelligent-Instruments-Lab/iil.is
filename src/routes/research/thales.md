---
layout: researchproject
title: "Thales"
slug: "Thales"
description: "Magnetic Controllers for Neural Audio Synthesis"
featured: false
authors: ["Nicola Privato"]
highlight_image: "research/projects/thales.png"
highlight_caption: "Thales."
---

Thales is a composed instrument developed at the Intelligent Instruments Lab, based on two wireless controllers that interact with each other through their tangible magnetic fields. Its name comes from Thales of Miletus, the philosopher who described magnets as "having a soul".

In interaction design applications, it is common to use magnetometers to detect nearby magnets. But the novelty of Thales is that on top of the magnetometer is placed a stack of powerful magnets: as the discs detect nearby magnetic fields, the user tangibly interacts with them through the reciprocal attraction and repulsion of the magnets.

Each controller contains a stack of magnets, a magnetometer and a gyroscope. When the performer joins the controllers, these repel each other allowing him to play with the tangible manifestation of their opposing magnetic fields as a sort of invisible yet tangible entity, where the acceleration and orientation of the discs, intertwined with the position and strength of the magnetic fields, defines parameters of the sound. 

<CaptionedImage
  src="research/projects/thalesmagnets.png"
  alt="Thales' opposing magnetic fields"
  caption="Thales' opposing magnetic fields"/>

Thales can control any synthesis engine, but I developed it to investigate the design strategies around Neural Audio Synthesis (NAS). Thales uses RAVE, a NAS model for real-time interaction designed by Antoine Caillon at IRCAM in 2021. The model is trained on a dataset based on the sounds of magnets, bounced on each other or against wooden surfaces. Hence the composed nature of this instrument where the magnetic materiality defines the sound. This is combined with an FM synthesizer on the right controller's lifter and a pitch shifter on the left one.

Thales was featured at NIME 2023, Ars Electronica 2023, and is one of the winners at the Guthman Competition, 2024 edition, at Georgia Tech (3rd prize).

You can find Thales' code, building instructions and list of materials from our <a href="https://github.com/Intelligent-Instruments-Lab/Thales" title="repo">GitHub repository</a>.


<iframe width="560" height="315" src="https://www.youtube.com/embed/Oh6NB6967XY?si=pEkzucknf0Anw3VS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

