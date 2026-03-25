# Solar cell

Type: Power Supply, Sensor
Added: January 13, 2023 10:49 AM
Senses: Light intensity
Actuates: DC voltage/current output
Connection: minijack
Status: Done
Voltage: 5V output, 40mA max current
Panel: Analog Inputs/Sensors

![solar-removebg-preview.jpg](solar-cell-1.jpg)

**Name**: Solar Cell (Photovoltaic Panel)

**Type**: Sensor, Power Supply

**Principle**: Photovoltaic effect. Converts light energy directly into electrical current through semiconductor junction.

**Function**: Generates electrical current from light exposure. Output voltage/current proportional to light intensity. Can power low-consumption components or act as light sensor.

**Voltage**: 5V nominal output, 40mA max current (200mW max power)

**Typical use**: Light-to-sound conversion, light-controlled parameters, optical audio transmission (with laser/LED), low-power energy harvesting, light sensing, interactive light-responsive interfaces.

**Good for**:

- Intuitive light/no-light interface mapping
- Optical audio signal transmission (modulated light)
- Light beam interruption detection
- Low-power energy harvesting
- Light intensity sensing
- Simple on/off control via light blocking

**Bad for**:

- Detailed parameter control (non-linear response)
- High-power applications (limited current)
- Consistent power in varying light
- Precise light measurement (use calibrated sensor)
- Indoor use without strong light source

**Mini Jack connection diagram**:

- Positive (+): Red wire
- Negative (-): Black wire

**Component diagram**: Light → Photovoltaic cell → DC voltage output

**Links**:

- [https://en.wikipedia.org/wiki/Solar_cell](https://en.wikipedia.org/wiki/Solar_cell)

**Buy**:

- [Round Solar Panel Skill Badge 5V/40mA - Adafruit #700](https://www.adafruit.com/product/700)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect to load or microcontroller analog input
2. Expose to bright light for maximum output
3. Block light to reduce output
4. For sensing: Read voltage on analog input
5. For power: Use with battery charging circuit or directly power low-current devices
6. For optical transmission: Modulate light source (laser/LED), solar cell receives signal

**Arduino IDE sketches**: N/A

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: 5V nominal output, 40mA max current, 200mW max power, round form factor

**Optical transmission**: Can be paired with Laser diode or LED for audio signal transmission. Modulated light carries audio signal, solar cell receives and converts back to electrical signal.

**Applications**:

- Light beam break detector
- Optical audio receiver
- Simple light sensor
- Trickle charging small batteries
- Educational demonstrations

**Output characteristics**: Voltage relatively stable, current varies with light intensity. Short-circuit current ~40mA in bright sunlight. Open-circuit voltage ~5-6V.