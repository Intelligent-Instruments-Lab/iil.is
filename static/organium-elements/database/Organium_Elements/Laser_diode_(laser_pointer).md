# Laser diode (laser pointer)

Type: Actuator
Added: January 17, 2023 3:03 PM
Senses: N/A
Actuates: Red laser light (650nm)
Connection: minijack
Status: Done
Voltage: 2.8 - 5.2V
Panel: Analog Actuators

![Laser-removebg-preview.jpg](laser-diode-laser-pointer-1.jpg)

[Laser Diode - 5mW 650nm Red](https://www.adafruit.com/product/1054)

**Name**: 650nm Red Laser Diode Module (5mW)

**Type**: Actuator

**Principle**: Semiconductor laser diode produces coherent, focused 650nm red light beam through stimulated emission.

**Function**: Emits visible red laser beam that can be modulated for beam-break detection or audio transmission.

**Voltage**: 2.8-5.2V DC, 25mA max current

**Typical use**: Laser harps (beam break detection), laser microphones (modulated audio transmission), optical triggers, light beam instruments, interactive installations.

**Good for**:

- Visible beam-break detection with photodetector
- Audio signal transmission (modulated beam)
- Alignment and positioning
- Interactive light installations
- Long-distance triggering (with detector)

**Bad for**:

- Direct eye exposure (safety hazard)
- Reflected beam eye contact
- General illumination
- High-power cutting/engraving

**Mini Jack connection diagram**: Red wire (+), Black wire (-)

**Component diagram**: DC power → Current-limiting resistor → Laser diode

**Links**:

- [https://en.wikipedia.org/wiki/Laser_harp](https://en.wikipedia.org/wiki/Laser_harp)
- [https://en.wikipedia.org/wiki/Laser_microphone](https://en.wikipedia.org/wiki/Laser_microphone)

**Buy**:

- [Laser Diode 5mW 650nm Red - Adafruit #1054](https://www.adafruit.com/product/1054)

**Make instructions**: N/A (use with current-limiting resistor)

**Use instructions/Tutorials**:

1. **Safety first**: Never point at eyes or reflective surfaces
2. Use current-limiting resistor (calculate for 25mA max)
3. For beam-break: Pair with  [Solar cell](Solar%20cell%20c684ed7dfe71478aa6ee790091aad483.md)  or photodiode
4. For modulation: Modulate power supply for audio transmission
5. Secure mounting to prevent accidental eye exposure

**Arduino IDE sketches**:
Control via digital pin (on/off) or PWM for intensity modulation

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: 650nm wavelength, 5mW output, 2.8-5.2V input, 25mA max current, 10mm diameter, 31mm length, 100mm+ wire length, operating temp -10°C to 40°C

**Safety**: Class 3R laser - avoid direct/reflected beam eye contact. Can cause eye damage with prolonged exposure.

**Applications**:

- **Laser harp**: Multiple beams with photodetectors create virtual strings
- **Laser microphone**: Beam reflects off vibrating surface, detector reads modulation
- **Beam break**: Detector triggers when beam is interrupted