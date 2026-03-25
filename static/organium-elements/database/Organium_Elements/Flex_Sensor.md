# Flex Sensor

Type: Resistor, Sensor
Added: January 9, 2023 3:47 PM
Senses: bend, breath, flicking, vibration
Actuates: Analog Voltage Signal (e.g. to microcontroller ADC input)
Connection: Minijack
Status: Done
Voltage: 3.3-5V
Panel: Analog Inputs/Sensors

![flex-removebg-preview.jpg](flex-sensor-1.jpg)

**Name**: Flex Sensor 

Note: (sensors with red bands have built in voltage divider with 10k pull-down resistors)

**Type**: This device is a resistor.

**Principle:**  Resistive. Resistance changes with bend angle - resistance increases as bend increases.

**Function**: Variable resistor that changes resistance based on bend angle (also known as bend sensor). Outputs analog voltage (0-5V) proportional to degree of flexion.

**Voltage**: 3.3-5V operating voltage, 0-5V analog output range

**Typical use:** People have used this sensor in data gloves, wearable computing, gestural instruments (as part of instruments where you have a hand free or move parts of the instrument). This could also be used as a wind sensor, where a flip is put onto the sensor and the user blows onto it. 

This sensor can easily be tacked onto an existing control interface (keyboard key, slide, levers of various kinds) to get a digital response to a mechanical action.

**Good for**:

- Gestural control interfaces
- Detecting finger/joint movement
- Breath sensing (with flap attachment)
- Augmenting existing mechanical controls
- Wearable applications
- Simple, robust bend detection

**Bad for**:

- High mechanical stress scenarios
- Precise angle measurement (better for relative bend detection)
- Repeated extreme bending (can degrade over time)
- Applications requiring very fast response times

**Links**: [https://sensorwiki.org/sensors/flexion?s[]=flex](https://sensorwiki.org/sensors/flexion?s%5B%5D=flex) 

**Mini Jack connection diagram**:

![flex_bb.svg](hall-effect-sensor-2.svg)

![flex_schem.svg](hall-effect-sensor-3.svg)

**Buy**:

- [Long Flex Sensor - Adafruit](https://www.adafruit.com/product/182)

**Make instructions**: N/A (commercial component)

**Use instructions/Tutorials**:

1. Connect to analog input with voltage divider circuit (if not built-in)
2. Read analog values to detect bend
3. Map values to desired parameter range
4. Can be attached to surfaces with double-sided tape or sewn into fabric

**Arduino IDE sketches**: Standard analogRead() from analog pin

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Note**: Some flex sensors in the lab already include integrated pull-down resistors, indicated by red stripe around mini jack connector or insulation cover.

**Specifications**:

- Operating voltage: 3.3-5V
- Analog output range: 0-5V
- Resistance range: ~10kΩ (flat) to ~50kΩ (bent 90°)
- Typical operating angle: 0-90°
- Response time: <1ms

**Creative applications**:

- Wind sensor: attach flap to sensor, blow on flap
- Instrument triggers: attach to keys or sliders for hybrid analog/digital control

![thumbnail_IMG_1318.jpeg](flex-sensor-2.jpeg)

![thumbnail_IMG_1319.jpeg](flex-sensor-3.jpeg)