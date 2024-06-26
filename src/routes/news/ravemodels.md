---
layout: news
date: "2023-10-18"
slug: "ravemodels"
title: "Release of RAVE Models Repository"
description: "IIL releases trained RAVE neural synthesis models from various projects."
featured: true
highlight_image: "news/rave-iil.jpg"
---

<script>
import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

<CaptionedImage
src="news/rave-iil.jpg"
alt="The RAVE logo in IIL colors"
caption="The RAVE logo in IIL colors"
/>

Check out the Hugging Face repo [here](https://huggingface.co/Intelligent-Instruments-Lab/rave-models)!

[RAVE](https://github.com/acids-ircam/RAVE) (which stands for Realtime Audio Variational autoEncoder) is a popular neural synthesis model designed by Antoine Caillon and the ACIDS research group at IRCAM, Paris. When you train a RAVE model on some audio data, it learns an encoder which extracts compressed features from the audio, and also a decoder which takes them back to sound. You can either use the decoder by itself as a unique kind of synthesizer, or run new audio through the encoder-decoder pair, transforming it to sound more like the training data.

What's great about RAVE is that it can run in real time on a laptop and is well supported in software like [Max/MSP, Pure Data](https://github.com/acids-ircam/nn_tilde) and [SuperCollider](https://github.com/elgiano/nn.ar/). We have also developed and released our own [SuperCollider](https://github.com/victor-shepardson/rave-supercollider) and [TidalCycles](https://github.com/jarmitage/tidal-rave) integrations. However, training new RAVE models takes some familiarity with machine learning workflows and also a fair amount of GPU time. Over the past 18 months, we've been training RAVE models for projects like the [Magnetic Scores](../research/magnetic-scores), [Pluma](../research/pluma), [Living Looper](../research/livinglooper), [Tölvera](../research/agential-scores), and now we're releasing them to the public.

<iframe width="100%" height="400" aspect-ratio="16/9" src="https://www.youtube.com/embed/ii-dmCbHmos?si=0I5SAU1NIVHLCh1X&amp;start=684" title="Live Coding RAVE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<i>IIL postdoc Jack Armitage live coding speech RAVE models at Algorithmic Art Assembly 2022.</i><br><br>

[Hugging Face](https://huggingface.co/huggingface) is a hub for open-source and community machine learning projects -- sort of a Github for ML. We decided to put our RAVE models in a Hugging Face repo for discoverability -- it's an obvious place to search for models -- and it provides a nice user interface and storage while letting us manage the repo via git.

Our new Hugging Face repo contains models of guitar, saxophone, church organ, [magnetic resonator piano](https://andrewmcpherson.org/project/mrp), speaking and singing voices, water, birds, whales, and we'll keep adding more. All our RAVE models inherit the Creative Commons Noncommercial license required by the ACIDS software, meaning you can do just about anything with them except sell the models themselves as part of a product.

The repo also includes some model checkpoints which can be used with our [fork of the RAVE code](https://github.com/victor-shepardson/RAVE) to speed up training via transfer learning.

<iframe width="100%" height="400" aspect-ratio="16/9" src="https://www.youtube.com/embed/kuxYIYgPrTs?si=YYkFYpJbooMpcuFm&amp;start=2540" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<i>MIT Media Lab's Jessica Shand & Manuel Cherep perform MOTHERBIRD with IIL postdoc Jack Armitage at TENOR 2023, using flute and bird RAVE models.</i><br><br>

<iframe width="100%" height="400" src="https://www.youtube.com/embed/4qbK3cw3E5M" title="TouTube video player" frameBorder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe>

<i>Nicola Privato performing Mouija, a piece using Stacco and Thales, two magnetic instruments developed at IIL. The video features magnets, water, speech, choir, organ RAVE models</i><br><br>
If use our models, let us know! And remember to cite using:

```
@misc {intelligent_instruments_lab_2023,
	author       = { {Intelligent Instruments Lab} },
	title        = { rave-models (Revision ad15daf) },
	year         = 2023,
	url          = { https://huggingface.co/Intelligent-Instruments-Lab/rave-models },
	doi          = { 10.57967/hf/1235 },
	publisher    = { Hugging Face }
}
```

Happy synthesizing!
