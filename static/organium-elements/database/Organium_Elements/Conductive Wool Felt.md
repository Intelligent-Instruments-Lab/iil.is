# Conductive Wool Felt

Type: Connector, Material, Resistor, Sensor
Added: January 19, 2023 5:03 PM
Senses: Pressure, Force
Actuates: Analog Voltage Signal (variable resistance) (e.g. to microcontroller ADC input)
Connection: Conductive Thread, Alligator Clips
Status: Done
Voltage: 3.3-5V for connected circuits
Panel: E-textiles
Published: Yes

![wool.jpeg](conductive-wool-felt-2.jpeg)

**Name**: Conductive Wool Felt

**Type**: Connector, Material, Resistor, Sensor

**Principle**: Stainless steel wool fibers blended with sheep wool and felted together. The steel fibers create conductive paths through the material. Resistance decreases when compressed (more contact between fibers).

**Function**: Pressure-sensitive resistive material that changes resistance based on applied force. Can be cut into any shape for flexible sensors, buttons, connectors, or grounding surfaces.

**Voltage**: 3.3-5V

**Typical use**: DIY pressure/force sensors, soft buttons, capacitive touch electrodes, flexible connectors, electrical grounding pads, wearable sensors.

**Good for**:

- Custom-shaped pressure sensors
- Soft, flexible tactile interfaces
- Capacitive touch applications
- Electrical grounding in soft projects
- Quick prototyping with scissors
- Low-cost custom sensors

**Bad for**:

- High voltage applications
- Precise/repeatable resistance values
- Permanent outdoor installations (wool degrades)
- High-current paths (relatively high resistance)

**Mini Jack connection diagram**:
N/A - Attach using conductive thread, alligator clips, or sew directly to circuits. Can sandwich between fabric layers with connections at edges.

**Component diagram**:
For pressure sensor: Vcc → Resistor (10kΩ) → Conductive felt → GND, with ADC reading voltage at junction (voltage divider principle).

**Links**:
Tutorial coming soon (per your notes)

**Buy**:
Created in-house at IIL

**Make instructions**:
Tutorial in development. Basic process: blend stainless steel wool with sheep wool, wet-felt or needle-felt to create conductive fabric.

**Use instructions/Tutorials**:
Use as variable resistor in voltage divider circuit. Apply pressure to decrease resistance and increase voltage reading on ADC. Test with multimeter to characterize pressure-to-resistance response.

**Arduino IDE sketches**:
Standard analogRead() for pressure sensing in voltage divider configuration.

**Relevant software files**:
N/A - standard Arduino ADC

**Extra and gratuitous information and images**:

**Properties:**

- Variable resistance based on compression
- Soft, cuttable, shapeable
- Insulating when uncompressed (high resistance)
- Can be sewn or glued into projects
- Biodegradable base material (wool)

**Resistance characteristics:** Highly variable - test each piece. Decreases significantly under pressure, useful range depends on steel-to-wool ratio.

![BDF07317-1E70-480A-909E-CA75BEBD72AA.jpeg](conductive-wool-felt-1.jpeg)
