# Infrared (IR) proximity senso

Type: Sensor
Added: January 13, 2023 10:50 AM
Senses: distance 10-80cm
Actuates: analog voltage output
Connection: minijack
Status: Done
Voltage: 4.5 - 5.5 V, 0-3V
Panel: Digital Inputs/Sensors

![imageedit_63_9079981069-removebg-preview.jpg](infrared-ir-proximity-senso-1.jpg)

**Name**: Sharp IR Distance Sensor (GP2Y0A21YK)

**Type**: Sensor

**Principle**: Infrared triangulation. Emits IR beam, measures reflected light angle using position-sensitive detector. Closer objects reflect at different angles than distant objects.

**Function**: Measures distance to objects within 10-80cm range by bouncing IR light off surfaces. Outputs analog voltage inversely proportional to distance.

**Voltage**: 4.5-5.5V operating, 0-3V analog output (voltage decreases with distance)

**Typical use**: Distance/proximity detection, object presence sensing, touchless switches, motion detection, collision avoidance, energy-saving wake/standby switching, gestural interfaces.

**Good for**:

- Non-contact distance measurement (10-80cm range)
- Fast response time (~40ms)
- Works with most surfaces
- Immune to ambient light interference
- Simple analog output

**Bad for**:

- Very close proximity (<10cm)
- Long distances (>80cm) - use ultrasonic instead
- Transparent/reflective surfaces (glass, mirrors)
- Precise measurements (±2cm accuracy)
- Very dark or IR-absorbing materials

**Mini Jack connection diagram**:

Show Image

![infrared distance sensor_bb.svg](infrared-ir-proximity-senso-2.svg)

![infrared distance sensor_schem.svg](infrared-ir-proximity-senso-3.svg)

**Component diagram**: N/A

**Links**:

- [https://en.wikipedia.org/wiki/Proximity_sensor](https://en.wikipedia.org/wiki/Proximity_sensor)

**Buy**:

- [IR Distance Sensor with Cable (10-80cm) - Adafruit #164](https://www.adafruit.com/product/164)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect to 5V power and analog input
2. Read analog voltage (0-3V range)
3. Convert voltage to distance using datasheet curve or calibration
4. Lower voltage = farther distance (inverse relationship)
5. Average multiple readings for stability

**Arduino IDE sketches**: N/A

**Relevant software files**: https://github.com/guillaume-rico/SharpIR

**Extra and gratuitous information and images**:

**Specs**: Range 10-80cm, response time 40ms, supply current ~30mA, beam angle ~6°, output voltage inversely proportional to distance

**Note**: Output is non-linear - voltage doesn't scale linearly with distance. Use lookup table or polynomial approximation for accurate distance conversion.