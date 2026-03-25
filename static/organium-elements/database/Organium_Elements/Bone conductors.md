# Bone conductors

Type: Transducer
Added: January 17, 2023 10:33 AM
Senses: N/A
Actuates: Vibrations transmitted through solid materials (bone, surfaces, liquids)
Connection: Minijack
Status: Done
Voltage: 3-5v, 1 watt RMS / 2 watt max
Panel: Analog Outputs/Actuators
Published: No

![Bone.jpeg](bone-conductors-1.jpeg)

**Name**: Bone Conductor Transducer (8Ω, 1W

(sensors with red bands have built in voltage divider with 10k pull-down resistors)

**Type**: Transducer

**Principle**: Electromagnetic voice coil wrapped around a metal rod. When current pulses through the coil, the magnetic field causes the metal to expand and contract, creating vibrations that transmit through solid materials rather than air.

**Function**: Converts audio signals into mechanical vibrations that conduct through bones and solid materials to create sound perception without using air as the medium. The skull or contact surface acts as the resonating cavity.

**Voltage**: 3-5V, 1 watt RMS / 2 watt max

**Typical use**: Bone conduction headphones (pressed against jaw/ear bone), waterproof headphones, turning surfaces into speakers (tables, walls, cups), private listening, wearable audio devices, experimental musical interfaces.

**Good for:** 

- Creating "internal" sound only the user hears
- Waterproof applications (can be sealed in plastic)
- Novel transmission experiments (pressing it against your elbow bone and sticking a finger in your ear to hear the audio transmitted through your arm.)
- Turning surfaces into speakers
- Lightweight wearable audio

**Bad for:** 

- High-fidelity sound reproduction
- Loud sound applications
- Deep bass reproduction
- Long-distance projection without resonating surface

**Mini Jack connection diagram:**

- Red wire (or marked wire) → Positive voltage (typically from motor driver output) connect to Tip terminal of the minijack input
- Black/Blue wire → Negative/Ground (from motor driver output) connect to Sleeve terminal of the minijack input

**Component diagram**:
Audio Source → Amplifier (8Ω output) → Bone Conductor (pressed against bone/surface)

**Links**:

- [Adafruit Product Page](https://www.adafruit.com/product/1674)

**Buy link:** 

[Bone Conductor Transducer with Wires - 8 Ohm 1 Watt](https://www.adafruit.com/product/1674)

**Make instructions**: N/A (commercial component)

**Use instructions/Tutorials**:
Connect like a standard 8Ω speaker to audio amplifier output (Red = positive, Black = ground). **Requires audio amplifier** - compatible with TPA2012, MAX98306, or any 8Ω speaker amp. For prolonged skin contact, cover transducer with Sugru or heat shrink to prevent electrical shorting through sweat.

**How to use:**

- **Bone conduction**: Press firmly against jaw or mastoid bone (behind ear)
- **Arm transmission**: Press against elbow bone, plug ear - sound transmits through arm
- **Surface speaker**: Press against table, wall, or plastic cup
- **Waterproof audio**: Seal in waterproof housing

**Arduino IDE sketches**: N/A
**Relevant software files**: N/A

![Bone.jpeg](bone-conductors-1.jpeg)
