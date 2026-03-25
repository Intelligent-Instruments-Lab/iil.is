# Light Sensor (TSL 2591)

Type: Sensor
Added: February 4, 2025 1:54 PM
Senses: Light Intensity (infrared + full spectrum)
Actuates: Digital Out
Connection: I2C
Status: Done
Voltage: 3.3 to 5V
Panel: Digital Inputs

![1737645143208.jpg](light-sensor-tsl-2591-2.png)

**Name**: Light sensor (TSL2591)

**Type**: Luminosity Digital Sensor

**Principle**: Measures luminosity through integrated infrared and full spectrum diodes

**Function**: By its high dynamic range and sensitivity it approximates human eye response. Lux Range: 188 µLux sensitivity, up to 88,000 Lux input measurements.

**Voltage**: 3.3-5V

**Typical use**: High precision light spectrum measurements, automatic brightness control, daylight harvesting systems, photography light meters, environmental monitoring.

**Good for**:

- High precision light spectrum measurements
- Extreme dynamic range (188 µLux to 88,000 Lux)
- Human eye response approximation
- Separate IR and visible channels
- Very low light sensitivity
- I2C digital interface (no analog conversion needed)

**Bad for**:

- Color spectrum analysis (use AS7341 instead)
- Applications where simple photoresistor would suffice

**Mini Jack connection diagram**: N/A (I2C breakout)

**Component diagram**:

- VIN: 3.3-5V
- GND: Ground
- SCL: I2C clock
- SDA: I2C data

Show Image

**Links**:

- [https://www.adafruit.com/product/1980](https://www.adafruit.com/product/1980)

**Buy**: Check link above

**Make instructions**: You need to include the relevant library in the Arduino IDE. Search for Adafruit + name of the sensor.

**Use instructions/Tutorials**:

- [https://learn.adafruit.com/adafruit-tsl2591/wiring-and-test](https://learn.adafruit.com/adafruit-tsl2591/wiring-and-test)
- Install Adafruit_TSL2591 library in Arduino IDE
- Connect via I2C (SDA, SCL) and power
- Configure gain (1x, 25x, 428x, 9876x) and integration time based on light levels
- Read full-spectrum and IR channels

**Arduino IDE sketches**: Use Adafruit_TSL2591 library examples

**Relevant software files**: Requires Adafruit_TSL2591 library

**Extra and gratuitous information and images**:

The I2C address cannot be changed. This board/chip uses I2C 7-bit address 0x29 **and** 0x28.

**Specs**: Programmable gain (1x for bright light to 9876x for very low light), integration time 100-600ms, two photodiodes (IR + full spectrum), visible light calculated as full - IR.

![Screenshot 2025-02-04 at 14.12.51.png](light-sensor-tsl-2591-1.png)