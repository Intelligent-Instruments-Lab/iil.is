---
layout: news
date: "2023-01-09"
title: "How Michael's Brain Plays the Sax"
slug: "michaels_brain_sax"
description: "Real time bio-sensors to drive generative algorithms"
featured: false
---

<script>
import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

We've had the great pleasure of working with and befriending saxophonist Michael Maria Ott last semester, where he was spending some time at the Iceland University of the Arts as an exchange student. In addition to playing the saxophone, Michael is a composer and audio-visual artist. He combines improvisation with generative algorithms, machine learning, brain-computer interfaces and sonification of bio-signals. He studies jazz saxophone at the Mannheim University of Music and Performing Arts and says he was very happy to be able to work with the us at the lab during his Erasmus semester in Reykjavik.
<br />

# Michael's Journey

My interest in generative, data-driven music and composition started when I had to take off multiple months from playing saxophone due to an injury. Having always been interested in the interplay between machines and humans in music, I started to explore combining generative algorithms with improvised music. With life happening increasingly online due to COVID, I also tried to translate parts of the human experience, that are hard or impossible to perceive without physical proximity, into sound. This led me to use real time bio-sensors to drive generative algorithms, making the physical, mental and emotional state of the wearer audible and visible.

In live performances it allows the musician to enter into a conversation with their state of being, creating a feedback-loop between musicians, machines and sound. In the context of interactive audio-visual installations audience-members are able to intuitively explore this feedback-loop.

<CaptionedImage
src="news/michaelsax2.jpg"
alt="Two men playing music together, one standing with a saxaphone and a headband, the other one sitting in front of a laptop with an electric guitar."
caption="Combining pulse sonification and free improvisation with Nicola Privato at Iceland Airwaves."/>
<br />

During my time at the Intelligent Instruments Lab, I was able to explore the potential of using consumer- grade EEG headsets to control aspects of a composition, score or instrument with the mental state of the performer. I started developing an augmentation for saxophones that sonifies the brain state of the performer based on the strength of brain activity in different frequency bands. A speaker-mount designed with the help of Halldor Úlfarsson allows a speaker to be mounted on the bell of the saxophone. This allows for the sound to be projected into the saxophone, adding a naturally occurring filtering effect based on the open/closed tone holes and altering the sound of the saxophone. 

With the sonification being incorporated as a part of the instrument, it stops being an independent musical element the performer reacts to and instead becomes part of the performers sound. The processed data influences the sound similar to the way the shape of the oral cavity influences the voice
of a singer or sound of a woodwind player.

It became clear that, due to the movement of facial muscles while playing a wind instrument, the data output resulting from consumer-grade EEG headsets is governed by artifacts introduced by those muscle movements. Looking forward I want to explore using a larger number of electrodes and different electrode placements combined with AI-aided analysis of the data to solve this problem.

<CaptionedImage
src="news/michaelsax1.jpg"
alt="Young man with a saxaphone and a headband with a device in the middle"
caption="Demonstrating the saxophone augmentation at Nordic Music Days."/>
<br />

With the help of Jack Armitage I was also able to start developing a brain computer interface for the Magnetic Resonator Piano. For the first experiments I controlled the piano solely through the EEG headset and generative algorithms, requiring no physical actions at all, to minimize the occurrence of artifacts in the data. I am currently working on the next version of the interface, where the piano will be played by the artist, while the sound-intensity and harmonics of the strings will be determined through the magnetic resonators by the EEG data.
