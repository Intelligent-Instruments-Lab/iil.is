# Photo-resistor

Type: Sensor
Added: January 17, 2023 10:38 AM
Senses: Luminosity 
Actuates: Analog voltage output via voltage divider
Connection: minijack
Status: Done
Voltage: 0-5, 0-3.3 Volts
Panel: Analog Inputs/Sensors

![Ljos.jpeg](photo-resistor-2.jpeg)

**Name**: Photoresistor (Light Dependent Resistor / LDR)

**Type**: Sensor, Resistor

**Principle**: Photoresistive. Resistance decreases as light intensity increases. Typically used in voltage divider configuration to produce analog voltage output.

**Function**: Light-sensitive variable resistor. Electrical resistance decreases with increasing brightness. Used with voltage divider circuit to convert light levels to analog voltage.

**Voltage**: 3.3-5V operating voltage, 0-5V analog output (via voltage divider)

**Typical use**: Measuring light levels, automatic lighting control, light-sensitive switches, ambient light detection, shadow/presence detection, simple light meters.

**Good for**:

- Low-cost light sensing
- Simple implementation
- Touch-less interactivity
- Ambient light monitoring

**Bad for**:

- Measuring color spectrum (only measures total luminosity)
- Precise light measurement (use TSL2591 for calibrated lux readings)
- Fast response times (relatively slow compared to photodiodes)
- Consistent readings across units (high unit-to-unit variation)

**Mini Jack connection diagram**:

Voltage divider configuration:

- 5V → Photoresistor → Analog pin + 10kΩ resistor → GND

**Component diagram**: See voltage divider schematic

**Links**:

- [https://en.wikipedia.org/wiki/Photoresistor](https://en.wikipedia.org/wiki/Photoresistor)
- [https://learn.adafruit.com/photocells/overview](https://learn.adafruit.com/photocells/overview)

**Buy**:

- [Photocell (CdS photoresistor) - Adafruit #161](https://www.adafruit.com/product/161)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect in voltage divider with 10kΩ resistor
2. Connect to analog input pin
3. Read analog values (higher values = more light)
4. Calibrate min/max values for your lighting conditions
5. Map to desired parameter range

**Arduino IDE sketches**:

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: Resistance range typically 1kΩ (bright light) to 10kΩ+ (darkness), response time ~tens of milliseconds, spectral peak ~540nm (green), operating temp -30°C to +70°C

**Voltage divider calculation**: With 10kΩ fixed resistor, output voltage = 5V × (10kΩ / (10kΩ + LDR resistance))

![5F3FF2ED-4982-44A0-9CA1-06BDCDEA5C5A.jpeg](photo-resistor-1.jpeg)