# Speakers

Type: Actuator
Added: February 17, 2023 2:38 PM
Senses: AC current provided by a power amplifier
Actuates: An electro magnetic field which moves a membrane and pushes air to make sound.
Connection: minijack
Status: Done
Voltage: Up to around 50V from the D-Class amplifiers

![speaker-removebg-preview.jpg](speakers-1.jpg)

**Name**: Speakers (Loudspeakers)

**Type**: Actuator

**Principle**: Electromagnetism. AC current through voice coil creates oscillating magnetic field interacting with permanent magnet, moving membrane/cone to produce sound waves.

**Function**: Converts electrical audio signals into acoustic sound by vibrating membrane to push air. Requires audio amplifier to drive.

**Voltage**: AC audio signal from power amplifier (typically up to ~50V from D-Class amplifiers in lab)

**Typical use**: Audio playback, sound reproduction, monitoring, installations, musical instruments, acoustic feedback systems, multimedia projects.

**Good for**:

- Decent quality audio reproduction
- General sound output
- Standard audio applications
- Wide frequency response
- Direct sound radiation

**Bad for**:

- Super high-fidelity audio
- High SPL applications without proper amplification
- Direct microcontroller connection (requires amplifier)

**Mini Jack connection diagram**: Connect to audio amplifier output

**Component diagram**: Audio amplifier → Speaker terminals → Sound output

**Links**:

- [https://en.wikipedia.org/wiki/Loudspeaker](https://en.wikipedia.org/wiki/Loudspeaker)

**Buy**: Various suppliers, electronics retailers

**Make instructions**: N/A (commercial components)

**Use instructions/Tutorials**:

1. Connect speaker to audio amplifier output
2. Observe polarity (+ and - terminals)
3. Match speaker impedance to amplifier rating (typically 4Ω or 8Ω)
4. Do not exceed amplifier power rating
5. Start with low volume, increase gradually
6. Never connect directly to microcontroller (will damage both)

**Arduino IDE sketches**: Requires audio amplifier - cannot be driven directly from microcontroller

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Impedance**: Most common ratings are 4Ω or 8Ω. Match speaker impedance to amplifier specifications to avoid damage or poor performance.

**Power handling**: Check speaker power rating and ensure amplifier doesn't exceed it. Overdriving causes distortion and potential damage.