# Soil Sensor

Type: Sensor
Added: March 10, 2026 2:23 PM
Senses: Soil moisture (capacitive), temperature
Actuates: Digital data via I2C
Connection: I2C (STEMMA 4-pin JST PH 2mm)
Status: Done
Voltage: 3-5V
Panel: Digital Inputs/Sensors

![soil_sensor.jpg](soil-sensor-1.png)

**Name**: Adafruit STEMMA Soil Sensor - I2C Capacitive Moisture Sensor

**Type**: Sensor

**Principle**: Capacitive moisture sensing using ATSAMD10 microcontroller's built-in capacitive touch measurement. Single-probe design with no exposed metal contacts. Also measures ambient temperature via internal temperature sensor.

**Function**: Measures soil moisture through capacitive sensing (no DC current into soil). Returns moisture reading (~200 dry to ~2000 wet) and ambient temperature via I2C. Superior to resistive sensors - no oxidation, works in loose soil.

**Voltage**: 3-5V operating voltage

**Typical use**: Plant monitoring, soil moisture tracking, automated watering systems, gardening automation, greenhouse monitoring, agricultural sensors, plant care assistants.

**Good for**:

- Long-term soil monitoring (no oxidation)
- Capacitive sensing (one probe, no exposed metal)
- No DC current into plants
- Works in loose soil
- Built-in temperature sensing
- Wide moisture range (200-2000)
- I2C interface (easy integration)
- STEMMA plug-and-play connectivity

**Bad for**:

- High-precision moisture measurement
- Rapid continuous reading (needs delay between reads)
- Very dry or hydroponic applications
- Precise temperature measurement (±2°C accuracy)

**Mini Jack connection diagram**: N/A (STEMMA 4-pin JST PH 2mm connector)

**Component diagram**:

- **JST PH 4-pin connector**:
    - Power (3-5V)
    - Ground
    - I2C SDA
    - I2C SCL

**Links**:

- [https://www.adafruit.com/product/4026](https://www.adafruit.com/product/4026)
- [https://learn.adafruit.com/adafruit-stemma-soil-sensor-i2c-capacitive-moisture-sensor](https://learn.adafruit.com/adafruit-stemma-soil-sensor-i2c-capacitive-moisture-sensor)

**Buy**: Check link above. **Note**: Requires separate STEMMA cable (JST PH 4-pin):

- [Male header cable](https://www.adafruit.com/product/3955)
- [Female header cable](https://www.adafruit.com/product/3950)
- [JST-JST cable](https://www.adafruit.com/product/3568)
- Compatible with Seeed Grove cables

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Install Adafruit_Seesaw library
2. Connect via STEMMA cable (4-pin JST PH)
3. Insert sensor prongs into soil (vertical insertion recommended)
4. Allow stabilization time after power-on
5. Read moisture value (200-2000 range)
6. Read temperature (±2°C accuracy)
7. **Important**: Extend delays between reads (firmware takes multiple oversamples)

**Arduino IDE sketches**:

cpp

`#include "Adafruit_seesaw.h"

Adafruit_seesaw ss;

void setup() {
  Serial.begin(115200);
  
  if (!ss.begin(0x36)) {
    Serial.println("Seesaw not found!");
    while(1) delay(1);
  }
}

void loop() {
  float tempC = ss.getTemp();
  uint16_t moisture = ss.touchRead(0);
  
  Serial.print("Temperature: ");
  Serial.print(tempC);
  Serial.print("°C  Moisture: ");
  Serial.println(moisture);
  
  delay(1000); // Extended delay needed
}`

**Relevant software files**: Requires Adafruit_Seesaw library

**Extra and gratuitous information and images**:

**I2C Address**: 0x36 (default), adjustable to 0x37-0x39 via solder jumpers AD0/AD1 on back of board. Supports up to 4 sensors on same I2C bus.)

**Specs**:

- Moisture range: ~200 (very dry) to ~2000 (very wet)
- Temperature range: Ambient, ±2°C accuracy
- Interface: I2C via ATSAMD10 microcontroller
- Power: 3-5V
- Connector: STEMMA 4-pin JST PH 2mm
- Dimensions: 76.2mm × 14.0mm × 7.0mm / 3.0" × 0.6" × 0.3"
- Weight: 4.0g / 0.1oz

**Capacitive vs Resistive**:

- **Resistive sensors**: Two exposed metal prongs, measure conductivity, oxidize over time, require constant recalibration, introduce DC current
- **Capacitive sensor (this)**: Single probe, no exposed metal, no oxidation, no DC current, consistent long-term readings

**Firmware note**: As of Jan 7, 2020, firmware updated for better oversampling. Provides better range but requires longer delays between reads.

**Calibration**:

- Dry soil: ~200-400
- Moist soil: ~400-800
- Wet soil: ~800-2000
- Calibrate to your specific soil type for best results

**Installation tips**:

- Insert vertically into soil for consistent readings
- Ensure good soil contact along probe length
- Avoid air gaps around sensor
- Keep connector above soil line

**Applications**: Automated plant watering, greenhouse monitoring, agricultural IoT, smart gardens, plant health tracking, soil condition monitoring

**Dimensions**: 76.2mm × 14.0mm × 7.0mm / 3.0" × 0.6" × 0.3"

**Weight**: 4.0g / 0.1oz

##