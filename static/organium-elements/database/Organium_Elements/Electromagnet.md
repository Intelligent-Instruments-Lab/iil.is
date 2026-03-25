# Electromagnet

Type: Sensor, Transducer
Added: January 17, 2023 10:44 AM
Senses: Can sense ferromagnetic objects (like a pickup, but not optimized)
Actuates: Vibrates/attracts ferromagnetic materials
Connection: Minijack
Status: Done
Voltage: AC as an audio exciter (with amplifier) or 12V DC if used as magnet.
Panel: Analog Outputs/Actuators

![Electromagnet.jpg](electromagnet-1.jpg)

**Name**: Electromagnet

**Type**: Actuator, Transducer (but can work as a crappy pickup if needed).

**Principle**: Creates magnetic field when charged. Copper coil wrapped around iron/ferrite core generates electromagnetic field proportional to current. Can attract ferromagnetic materials or vibrate them with AC signal.

**Function**: Attracts ferromagnetic objects when energized (it will release them when no longer charged), or vibrates metal strings/objects when driven with audio-frequency AC signal (E-bow effect). 

**Voltage**: 12V DC (for magnetic holding), AC audio signal with amplifier (for string vibration)

**Typical use**: Vibrating strings (E-bow style sustain), actuating ferromagnetic objects, electromagnetic preparation of instruments, temporary magnetic holding, experimental sound generation.

**Good for**:

- String vibration/sustain (E-bow applications)
- Brief grabbing/releasing metallic objects
- Electromagnetic string excitation
- Non-contact actuation of ferromagnetic materials
- DIY instrument sustainers

**Bad for**:

- Holding very heavy objects
- Long-duration holding (overheating risk, magnet may burn if kept charged for ages)
- Sensing (use pickups instead)
- High-fidelity audio reproduction through vibration

**Mini Jack connection diagram**:

- For DC (holding): 12V power supply → Electromagnet coil
- For AC (vibration): Audio amplifier output → Electromagnet coil
- Polarity doesn't matter for AC; matters for DC attraction direction

**Component diagram**: 

Audio signal → Amplifier → Electromagnet → Vibrates ferromagnetic string/object

**Links**:

- [EBow - Wikipedia](https://en.wikipedia.org/wiki/EBow)
- [Physics Forums: Electromagnetic String Vibration](https://www.physicsforums.com/threads/help-with-electromagnetic-musical-instrument-design.828979/)

**Buy**:
Example: [Amazon.de Electromagnet](https://www.amazon.de/-/en/Heschen-Elektromagneten-Magnetic-Solenoid-Valve/dp/B078KX52SW/)

Various sizes/strengths available from electronics suppliers

**Make instructions**:
Can wind your own: copper wire around iron core. More turns = stronger field but higher resistance. See: 

[Seancoils](Seancoils%2003cf2d33e9fe4ddabdf4505516b5657f.md)

notes for DIY coil development.

**Use instructions/Tutorials**:

**For string vibration (E-bow style):**

1. Position electromagnet ~1cm from ferromagnetic string
2. Feed amplified audio signal (AC) through coil
3. Optional: Add small neodymium magnet to core tip for increased effect
4. Signal frequency should match/relate to string's resonant frequency
5. Creates sustained vibration without physical contact

**For magnetic holding:**

1. Apply 12V DC to energize
2. Place ferromagnetic object against pole
3. Object held while powered
4. Release by cutting power
5. Don't leave energized for extended periods (overheating)

**Arduino IDE sketches**:
Control with relay, transistor, or motor driver for on/off. Use PWM for variable strength. Audio signals require amplifier circuit.

**Relevant software files**:
Motor driver libraries if using H-bridge control

**Extra and gratuitous information and images**:

**Specifications (typical):**

- Common resistance: 8-10Ω
- Holding force: Varies by size/power
- Overheating risk if continuously powered at high current
- Can reverse as crude pickup but not optimized

**String vibration tips:**

- Works best with ferromagnetic strings (steel guitar strings)
- Position matters - experiment with distance and location along string
- Adding permanent magnet to core increases efficiency
- Can create infinite sustain like E-bow
- Useful for experimental string instruments, electromagnetic piano preparation

**Safety:** Don't leave energized continuously - can overheat and potentially melt. Use appropriate power supply and heat management.

![electromagnet.jpeg](electromagnet-2.jpeg)

Workspace:

[Coils with core - Notes](Seancoils/Coils%20with%20core%20-%20Notes%2023dd30160edf45a3afbde6667ffe382c.md) 

[2023 Electromagnets/coils dev notes](Electromagnet/2023%20Electromagnets%20coils%20dev%20notes%207973f09bb5324ee1867d21a39b5c8da2.md)