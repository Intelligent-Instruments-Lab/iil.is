# Light-Color Sensor (AS7341)

Type: Sensor
Added: January 23, 2025 3:45 PM
Senses: light levels, color wavelength 
Actuates: Digital Data
Connection: I2C
Status: Done
Voltage: 3.3 - 5V
Panel: Digital Inputs/Sensors

![1737645143213.jpg](light-color-sensor-as7341-1.png)

**Name**: AS7341 - Multi Spectral Sensor (Light-Color)

**Type**: Sensor

**Principle**: Multi-Channel Spectrometer with 16 photodiode channels

**Function**: Detects 8 separate, overlapping bands of colored light plus white light, near-infrared, and flicker detection. 16-bit ADC provides very precise color and light measurements.

**Voltage**: 3.3-5V

**Typical use**: Color sensing, color matching, precise light analysis, plant growth monitoring, display calibration, color sorting.

**Good for**:

- Very precise measurement of color and light attributes (16-bit ADC)
- 8 overlapping color bands (violet to NIR)
- White light and NIR sensing
- Flicker detection (indoor lighting)
- Multi-spectral analysis

**Bad for**:

- Simple light detection (use photoresistor instead)
- Applications where rough measurement suffices
- High-speed color detection

**Mini Jack connection diagram**: N/A (I2C breakout)

**Component diagram**:

- VIN: 3.3-5V
- GND: Ground
- SCL: I2C clock
- SDA: I2C data

**Links**:

- [Adafruit AS7341 10-Channel Light/Color Sensor](https://www.adafruit.com/product/4698)
- [https://learn.adafruit.com/adafruit-as7341-10-channel-light-color-sensor-breakout/overview](https://learn.adafruit.com/adafruit-as7341-10-channel-light-color-sensor-breakout/overview)

**Buy**: Check link above

**Make instructions**: You need to include the relevant library in the Arduino IDE. Search for Adafruit + name of the sensor

**Use instructions/Tutorials**:

- [https://learn.adafruit.com/adafruit-as7341-10-channel-light-color-sensor-breakout/overview](https://learn.adafruit.com/adafruit-as7341-10-channel-light-color-sensor-breakout/overview)
- Install Adafruit_AS7341 library
- Connect via I2C and power
- Configure gain and integration time
- Read 8 color channels + clear/NIR

**Arduino IDE sketches**:

[AS_7341.ino](Light-Color%20Sensor%20(AS7341)/AS_7341.ino)

**Relevant software files**:

[AS_7341_OSC.maxpat](Light-Color%20Sensor%20(AS7341)/AS_7341_OSC.maxpat)

**Extra and gratuitous information and images**:

**Specs**: 8 color channels (415nm, 445nm, 480nm, 515nm, 555nm, 590nm, 630nm, 680nm), white light channel, NIR channel (910nm), flicker detection, 16-bit ADC resolution, I2C interface

**Channels**: Violet (415nm), Indigo (445nm), Blue (480nm), Cyan (515nm), Green (555nm), Yellow (590nm), Orange (630nm), Red (680nm), plus Clear, NIR

**I2C Address**: Default address (consult datasheet for details)