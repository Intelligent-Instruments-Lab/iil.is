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

We study creative AI from a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists in key international institutions. We explore the emerging language and discourse of creative AI, addressing how notions such as agency, autonomy, authenticity, authorship, creativity and originality change with these new technologies.

Our technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn and evolve in the hands of the performer. Our theoretical approach is to collaborate with researchers, artists and the public across in key studies of how creative AI alter our relationship with technology, social interaction and knowledge production.  

The ii Lab is located at the Iceland University of the Arts, where we work on designing, building and testing new instruments in collaboration with other researchers, music students and local artists. We have access to the advanced workshops and labs as well as the artistic infrastructure of the university. We seek to maintain a strong public engagement, for example through our Friday Open Labs, symposia and musical events.

<CaptionedImageRow srcs={row1_srcs} alts={alts} captions={captions}/>

<CaptionedImageRow srcs={row2_srcs} alts={alts} captions={captions}/>

<CaptionedImageRow srcs={row3_srcs} alts={alts} captions={captions}/>

Intelligent Instruments Lab er þverfagleg rannsóknarstofa sem skoðar hlutverk gervigreindar í nýjum hljóðfærum. Tónlist er fagið sem við vinnum okkar rannsóknir innan, en umfang og áhrif munu teygja sig lengra. Við skoðum hvernig tæki tónlistarinnar geta verið notuð sem vísindatól, til dæmis með hljóðgervingu. 

Við rannsökum skapandi gervigreind á sviði hugvísinda í víðum skilningi í samstarfi við fræðifólk innan tónlistar, tölvunarfræði, hugrænum vísindum og heimspeki sem starfa við helstu lykilstofnanir heims í þessum vísindagreinum. Við skoðum hvernig orðræðan á bak við skapandi gervigreind þróast og út frá fyrrnefndum tækninýjungum könnum viðhorf fólks til hugtaka eins og atbeina, sjálfstæði, höfundardeili, höfundarverk, sköpun og frumleika. 

Tæknileg nálgun okkar er að þróa nýtt vélanám í hljóðfærum. Við finnum upp hljóðfæri sem geta lært og þróast í höndum hljóðfæraleikarans þannig að hljóðfærið og spilarinn virka gagnkvæmt hvort á annað. Fræðileg nálgun okkar er að stunda náið samstarf við rannakendur, listafólk og almenning á fræðasviðum sem skoða hvernig skapandi gervigreind hefur áhrif á samband okkar við tækni, félagsleg samskipti og þekkingarframleiðslu. 

IIL rannsóknarstofan er staðsett í Listaháskóla Íslands, þar sem við vinnum að hönnun, smíði og prófunum á nýjum hljóðfærum í samstarfi við aðra rannsakendur, tónlistarnemendur og listafólk. Við höfum aðgang að fullbúnum verkstæðum og góðri rannsóknaraðstöðu sem og listrænum innviðum háskólans. Við viljum efla tengsl okkar við almenning og sem dæmi má nefna Open Lab viðburðina okkar á föstudögum þar sem dyrnar okkar standa opnar fyrir hvern sem vill kynna sér starfið betur. Einnig tökum við þátt og stöndum fyrir fræðslufundum, málþingum og tónlistarviðburðum. 

<!-- <CaptionedImageGrid srcs={rows} alts={alts} captions={captions}/> -->