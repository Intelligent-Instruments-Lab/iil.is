# Tactile Transducer

Type: Actuator, Transducer
Added: January 9, 2023 3:47 PM
Senses: N/A
Actuates: Vibrates surfaces to produce sound
Connection: minijack
Status: Done
Voltage: AC (from power amplifier)
Panel: Analog Outputs/Actuators

![transducer (1)-removebg-preview.jpg](tactile-transducer-3.jpg)

**Name**: Tactile Transducer (Bass Shaker / Audio Exciter)

**Type**: Actuator, Transducer

**Principle**: Electromagnetism. AC audio current drives voice coil in magnetic field, creating vibrations. "Membraneless speaker" - requires mounting surface to radiate sound.

**Function**: Converts audio signals into mechanical vibrations. Vibrates attached surface to produce sound. Requires audio amplifier to drive. Surface characteristics determine acoustic output.

**Voltage**: AC audio signal from power amplifier (variable power depending on transducer rating)

**Typical use**: Augmenting acoustic instruments, vibrating resonant surfaces (cardboard boxes, soundboards, tables), tactile feedback, experimental sound installations, haptic audio experiences.

**Good for**:

- Augmenting acoustic instruments
- Creating unusual sonic experiences
- Tactile/haptic feedback
- Vibrating large surfaces
- Experimental acoustics
- Turning objects into speakers

**Bad for**:

- High-fidelity audio reproduction (use speakers)
- Direct sound radiation without surface
- Precision audio playback
- Portable applications (requires mounting)

**Mini Jack connection diagram**: Connect to audio amplifier output (like speaker connection)

**Component diagram**: Audio amplifier → Tactile transducer → Mounted surface → Sound output

**Links**:

- [https://en.wikipedia.org/wiki/Tactile_transducer](https://en.wikipedia.org/wiki/Tactile_transducer)

**Buy**:

- [Monacor Weatherproof Exciter/Resonator](https://www.amazon.de/Monacor-16-2790-Weatherproof-Exciter-Resonator/dp/B0057G64HU/)
- Search: "tactile transducer" or "bass shaker"

**Make instructions**: N/A (commercial components)

**Use instructions/Tutorials**:

1. Select appropriate transducer power rating (20W, 50W, etc.)
2. Mount firmly to surface you want to vibrate
3. Connect to audio amplifier matching power rating
4. Send audio signal through amplifier
5. Experiment with different mounting positions
6. Test various surface materials for tonal characteristics

**Arduino IDE sketches**: N/A (requires audio amplifier)

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Power ratings**: Available in various ratings (20W, 50W, 100W+). Match transducer rating to amplifier capability. Heavier transducers require more powerful amplifiers.

**Mounting**: Secure mounting crucial for performance. Transducer transfers vibration to surface - poor mounting reduces efficiency and sound quality.

**Surface selection**: Light, stiff surfaces (guitar tops, drum skins) work well. Dense, heavy objects harder to excite effectively.

**Power matching**: 50W transducer needs 50W amplifier for full capacity. Using lower-power amplifier is safe but limits output. Using higher-power amplifier risks damage if driven too hard.

**Notes:**

Tactile transducers come with different ratings for how much power they can output, general rule of thumb is that the heavier the transducer the more powerful amplifier you need to drive it to full capacity. The one in the image below is rated for 50W so you would ideally match it with an amplifier capable of outputting 50W of power.

![324811778_1279435405953582_2981139425139505308_n.jpg](tactile-transducer-2.jpg)

The one below here is lighter and can handle less power over time (20Ws) so if you where to connect it to a 50W amplifier there is a risk at blowing it out (figuratively speaking, the wire in the coil inside the device would burn through and it no longer functions).

![324396439_933314021378127_4630662554271186169_n.jpg](tactile-transducer-1.jpg)