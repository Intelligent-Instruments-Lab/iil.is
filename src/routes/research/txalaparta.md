---
layout: researchproject
title: "Txalaparta"
description: "The txalaparta is an ancient Basque percussion instrument."
featured: false
authors: ["Karl Jóhann Jóhannsson", "Victor Shepardson", "Enrique Hurtado", "Thor Magnusson"]
highlight_image: "news/karl.jpeg"
highlight_caption: "The Txalaparta by Karl Jóhann Jóhannsson et al."
---


The txalaparta is an ancient Basque instrument of the idiophone family. It is typically a solo instrument consisting of wooden planks and special batons that are played by two or more people. It is one of few musical instruments in the world that cannot be played by one person, as its playing is about a call-and-response communication, an improvisational practice of percussive conversation. 

In this project we are teaching a computer to play the txalaparta. Since the instrument is played by two players improvising, our goal is to get a computer to play along with a human player, having trained a neural network to learn from the performance of expert players. We achieve this by placing sensors on the planks and the batons to abstract the human playing into data. The data is then fed into a system that processes it, learns its patterns, and responds with a prediction of when the next hit should be and which player will perform it. 

We have already done some work on the digital txalaparta and we reported on that in Computer Music Journal in the following articles: <a href="http://users.sussex.ac.uk/~thm21/thor/pdfs/HurtadoMagnussonRekalde.pdf">Digitizing the Txalaparta: Computer-Based Study of a Traditional Practice</a> and <a href="http://users.sussex.ac.uk/~thm21/thor/pdfs/Hurtado_Magnusson_TENOR_2016.pdf">Notating the non-notateable: digital notation of txalaparta practice</a>.

The next step in this research is to use Victor Shephardson's <a href="/research/notochord">Notochord</a> low-latency machine learning system for real-time interaction. Having trained the model on recorded txalaparta performances we can now interact with it, sending one player's performance to the machine, which responds as if it was another human player. If all goes well, the computer will play along with a human txalaparta player in a convincing manner.

For those of you who don't know the instruments, here are some cool videos we found on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/XaSYiBaqLwA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
&nbsp;

<iframe width="560" height="315" src="https://www.youtube.com/embed/qwnAnB57H2k?start=485" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
&nbsp;