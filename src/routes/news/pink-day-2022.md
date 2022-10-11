---
layout: news
date: "2022-10-13"
title: "Studying the BRCA2 gene on the Pink Day"
description: "Using sonification to listen to Esther’s mutation"
featured: true
---

<script>
import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

On October 14th, we will celebrate the Pink Day in Iceland, a day dedicated to raising breast cancer awareness. People wear pink and buy the pink ribbon. By doing so they are supporting the Cancer Association and showing solidarity to all those who have been diagnosed with breast cancer.

Unfortunately, I won’t be able to join my lab mates during Pink Day. I am out sick, writing this from home as I recover from one of my adventures associated with my bilateral prophylactic mastectomy with reconstruction. Five months ago, I had a risk-reducing operation where a surgeon removed as much breast tissue as he possibly could to reduce the risk of breast cancer. This is done in the absence of malignancy. It may sound like an odd thing to put your body through when there is no cancer to be found, but in my case, it was the right thing to do. 

<br />

<CaptionedImage
src="news/esther_pink.jpg"
alt="A young woman standing in front of a pink shelving system in the laboratory"
caption="Esther Thorvalds at the Yellow Lab turned pink for the day"/>

Turns out, breast cancer was not only written in the stars for me, but it was also written in my DNA. More precisely, it was written in my BRCA2 gene. The genetic counselors at the hospital calculated an 81,2% risk of breast cancer after reviewing my family history. All the women in my family who tested positive (and did not have a mastectomy) got cancer associated with this mutation. Breast cancer in all but one cases. The youngest died at age 36. I had no intention of living with those chances hanging over me, so after careful consideration and a lot of thinking, I chose surgery.

Genetics have weighed heavily on my mind for some time now and I have felt a strong need see and understand my genetic code. What better way to do so than with sonification!

DNA is the molecule that contains the genetic code of all organisms. The DNA has sections called genes and those contain instructions that tell cells what proteins to make. Its structure looks like a twisted ladder, a spiral, and each step of the ladder contains a pair of nucleotides. There are four types of nucleotides; A, T, C and G, so when we’re looking at DNA data, we’ll see sequences built with these letters. The letters make up the DNA code that tells the cell what to do, which amino acids to build which will eventually become the protein for that gene. There are 22 amino acids, and the code is read in threes. 

A genetic sequence looks something like this:
AAT AAT CAC AGG CAA ATG TTG A...

In this project, we will be looking at this code as the foundation of musical notations, waiting to be assigned sonic roles. Working with me on the project is musician Hrafnkell ‘Keli’ Guðjónsson, my partner who helps me through my surgeries and the whirlwind the diagnosis has caused. And IIL associate Robin Morabito, whose background is not only in data sonification for artistic purposes, but also biotech. The DNA sequencing will be done by Laboratory of Cell Biology at the National University Hospital, with the help of Rósa Björk Barkardóttir and other scientists. This project would not have been possible if it hadn’t been for the help of genetic counselor Eirný Þöll Þórólfsdóttir at the National University Hospital, who is a fountain of wisdom when it comes to genetics and what it means to be diagnosed with a mutation.


<br />

<CaptionedImage
src="news/keli_pink_small.jpg"
alt="A young man with afro setting up a drum kit in a musical pink lit studio"
caption="Hrafnkell Örn Guðjónsson at Sundlaugin Studio, also turned pink for the day"/>

It is a common misconception to think that people are “diagnosed with the BRCA gene”. Maybe it’s because the full name is “BReast CAncer genes”, indicating that the gene itself causes breast cancer. That is not the case. In fact, everyone has two genes with those names, BRCA1 and BRCA2. Those are two magnificent genes that help your body make the protein that fights abnormal cellular growths in your body, growths that often can turn into cancer. Meaning the genes prevent cancer, they do not cause it. Having them isn’t a bad thing. The BRCA1 and BRCA2 genes contain the blueprint of the proteins that forms the enzymes that destroy the bad cells. A more accurate description would be “the ANTI-breast cancer genes”.

<br />

<CaptionedImage
src="news/robin_pink.jpg"
alt="A young person sitting in front of a laptop and a computer monitor by a pink desk filled with books and technical elements, on their hand is an electronic glove with loads of chords plugged in"
caption="Robin Morabito working hard on their sonification project this summer at the Yellow Lab – turned pink of course"/>

It is only when there’s something wrong with the genes that you get a medical “diagnosis”. That would mean that one of your BRCA genes has a mutation, it is faulty, which causes the gene to make unstable proteins that can’t fight cancer even if their life depended upon it … which it does. This is called a mutation. Genetic mutations aren’t bad in general but if someone says they have a mutation in one of their BRCA genes, it means it’s bad. 

The mutation we’re working with is referred to as BRCA2-c.8796delC by geneticists. This is my mutation. The name implies that one C nucleotide has been deleted from the sequence, rendering the gene pretty much useless. The name of the mutation implies that in row 8796, there’s a missing C. So what happens when one C is taken out of the equation? Everything is moved up one letter and everything that comes after that is wrong and not helpful at all for the body to build a healthy BRCA2 protein.

Normal: AAT AAT CA<em>C</em> AGG CAA ATG TTG A... <br />
My delC mutation: AAT AAT CAA GGC AAA TGT TGA ...
<br />

These are the amino acids that the cell is supposed to make for the BRCA2 protein: <br />
AAT=N (asparagine)<br />
AAT=N (asparagine)<br />
CA<em>C</em>=H (histidine)<br />
AGG=R (arginine)<br />
CAA=Q (glutamine)<br />
ATG=M (methionine)<br />
TTG=L (leucine)<br />
 
The normal amino acid sequence is NNHRQM and then it continues. 
 
In my case, everything becomes disorganised aftur C is deleted. The gene starts telling the cell to create a different sequence of amino acids: <br />
AAT AAT CA<em>A GGC AAA TGT TGA</em>
 
AAT=N (asparagine)<br />
AAT=N (asparagine)<br />
CAA=Q (glutamine)<br />
GGC=G (glycine)<br />
AAA=K (lysine)<br />
TGT=C (cysteine)<br />
TGA=Stop<br />
 
So the amino acid sequence is NNQGKC. Because the TGA tells the cell to stop producing amino acids, the amino sequence will stop there regardless of the nucleotides that follow. 

That‘s a lot of biology for today! Anyone reading this blog post on the IIL website probably can imagine the endless possibilities of music we can make with these codes. What would happen if the strings of a grand piano were to be assigned different keys mid-concert? How would the mutated gene sound in comparison to a healthy gene? It's not the first time sonification has been used to read DNA sequences and we're currently looking at all the possiblities. That‘s the adventure Keli, Robin and I will be embarking upon.

Many other mutations have been discovered in the BRCA1/2 genes and the cancer risk associated with them varies. When comparing the effect of this mutation to another type of mutation in the same gene, BRCA2-999del5 or “the settler’s mutation”, where five nucleotides are missing, the results are inconclusive. The protein products in both cases are considered extremely unstable, one is not better (or worse) to have than the other one. Therefore, genetic counselors prefer looking at family history rather than the missing nucleotides to calculate the cancer risks for us mutants. My mutation is very rare and is only found in one family in Iceland, my family. Since my genetic code is so special, I thought it would be a great candidate for sonification. We still have not decided on methods or research questions which means we have no idea what the audio outcome will be. Maybe it will be quite musical, maybe it will be sonic nonsense. In any case, we’re sure it will be interesting and a good way to elucidate how important a tiny little nucleotide can be for people’s health.

Missing everyone already. Can’t wait to be back at work! <br />
Your project manager,<br />
Esther

Read more about the pink ribbon here:  <br />
https://www.bleikaslaufan.is/

Special thanks to the BRCA Iceland association for being a part of this project: <br />
https://www.brca.is/ 
