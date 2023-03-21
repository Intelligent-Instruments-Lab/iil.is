---
layout: about
title: "About"
slug: "about"
description: "About the Intelligent Instruments Lab"
---

<script>
  import CaptionedImageRow from "../components/Images/CaptionedImageRow.svelte"
  import CaptionedImageGrid from "../components/Images/CaptionedImageGrid.svelte"

  let row1_srcs = [
    "./stock/sophie-textile-5393.jpg",
    "./stock/organolib-6366.jpg",
    "./stock/raflost.jpeg"
  ]
  let row2_srcs = [
    "./stock/science_fair1.jpg",
    "./stock/science_fair2.jpg",
    "./stock/science_fair3.jpg"
  ]
  let row3_srcs = [
    "./stock/sean-5724.jpg",
    "./stock/sean-5732.jpg",
    "./stock/sigga_intern.jpeg"
  ]
  let rows = [
    "./stock/sophie-textile-5393.jpg",
    "./stock/organolib-6366.jpg",
    "./stock/raflost.jpeg",
    "./stock/science_fair1.jpg",
    "./stock/science_fair2.jpg",
    "./stock/science_fair3.jpg",
    "./stock/sean-5724.jpg",
    "./stock/sean-5732.jpg",
    "./stock/sigga_intern.jpeg"
  ]
  let alts = [
    "Alt","Alt","Alt","Alt","Alt","Alt","Alt","Alt","Alt"
  ]
  let captions = ['','','','','','','','','']
</script>

The Intelligent Instruments Lab is an interdisciplinary research lab that investigates the role of artificial intelligence in new musical instruments. Music is our research base, but the reach and impact is wider and we explore how musical interfaces can be applied as scientific instruments, for example through sonification.

<CaptionedImageRow srcs={row1_srcs} alts={alts} captions={captions}/>

We study creative AI from a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists in key international institutions. We explore the emerging language and discourse of creative AI, addressing how notions such as agency, autonomy, authenticity, authorship, creativity and originality change with these new technologies.

<CaptionedImageRow srcs={row2_srcs} alts={alts} captions={captions}/>

Our technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn and evolve in the hands of the performer. Our theoretical approach is to collaborate with researchers, artists and the public across in key studies of how creative AI alter our relationship with technology, social interaction and knowledge production.  

<CaptionedImageRow srcs={row3_srcs} alts={alts} captions={captions}/>

The ii Lab is located at the Iceland University of the Arts, where we work on designing, building and testing new instruments in collaboration with other researchers, music students and local artists. We have access to the advanced workshops and labs as well as the artistic infrastructure of the university. We seek to maintain a strong public engagement, for example through our Friday Open Labs, symposia and musical events.

<!-- <CaptionedImageGrid srcs={rows} alts={alts} captions={captions}/> -->