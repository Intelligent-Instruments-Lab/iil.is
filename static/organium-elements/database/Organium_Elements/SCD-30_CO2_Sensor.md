# SCD-30 CO2 Sensor

Type: Sensor
Added: March 10, 2026 2:03 PM
Senses: CO2 concentration, temperature, humidity
Actuates: Digital data via I2C
Connection: I2C (address 0x61)
Status: Done
Voltage: 3.3-5V
Panel: Digital Inputs/Sensors

![SCD_30.jpg](scd-30-co2-sensor-1.jpg)

**Name**: Adafruit SCD-30 - NDIR True CO2 Temperature and Humidity Sensor

**Type**: Sensor

**Principle**: NDIR (Nondispersive Infrared) true CO2 sensing. Uses infrared light absorption to measure actual CO2 concentration, not approximation from VOC. Integrated SHT31 temperature and humidity sensor for environmental compensation and additional readings.

**Function**: Measures real-time CO2 concentration (400-10,000 ppm) along with temperature and humidity. Dual-channel NDIR detection provides superior stability. Fully calibrated and linearized output via I2C.

**Voltage**: 3.3-5V (onboard regulator and level shifting for compatibility with both voltages)

**Typical use**: Environmental sensing, air quality monitoring, ventilation studies, scientific experiments, indoor CO2 tracking, HVAC control, plant growth monitoring, climate research.

**Good for**:

- Climate and Environmental data collection
- True CO2 measurement (not VOC approximation)
- Wide measurement range (400-10,000 ppm)
- Integrated temperature and humidity sensing
- High accuracy ±(30 ppm + 3%)
- Dual-channel detection for stability
- STEMMA QT / Qwiic connectivity (solderless)
- Works with 3.3V or 5V systems
- Fully calibrated from factory

**Bad for**:

- Budget-constrained projects (expensive sensor)
- Very fast response applications
- Portable/battery applications (19mA consumption)
- Compact spaces (larger sensor due to NDIR chamber)
- Outdoor use without environmental protection

**Mini Jack connection diagram**: N/A (STEMMA QT / Qwiic I2C breakout)

**Component diagram**:

- **VIN**: 3.3-5V power
- **GND**: Ground
- **SCL**: I2C clock
- **SDA**: I2C data
- **STEMMA QT connectors**: Solderless I2C daisy-chaining

**Links**:

- [https://www.adafruit.com/product/4867](https://www.adafruit.com/product/4867)
- [https://learn.adafruit.com/adafruit-scd30](https://learn.adafruit.com/adafruit-scd30)

**Buy**: Check link above

**Make instructions**: Install Adafruit_SCD30 library in Arduino IDE

**Use instructions/Tutorials**:

1. Install Adafruit_SCD30 library
2. Connect via I2C (STEMMA QT cable or solder headers)
3. Allow 30-60 second warm-up after power-on
4. Set measurement interval (2-1800 seconds)
5. Optional: Enable automatic self-calibration (ASC)
6. Read CO2 (ppm), temperature (°C), and humidity (%)
7. For accurate readings, ensure good airflow around sensor

**Arduino IDE sketches**:

`#include <Adafruit_SCD30.h>

Adafruit_SCD30 scd30;

void setup() {
  Serial.begin(115200);
  
  if (!scd30.begin()) {
    Serial.println("SCD30 not found!");
    while (1) { delay(10); }
  }
  
  scd30.setMeasurementInterval(2); // seconds
}

void loop() {
  if (scd30.dataReady()) {
    if (!scd30.read()) {
      Serial.println("Error reading sensor");
      return;
    }
    
    Serial.print("CO2: ");
    Serial.print(scd30.CO2, 1);
    Serial.print(" ppm\t");
    
    Serial.print("Temp: ");
    Serial.print(scd30.temperature, 1);
    Serial.print(" °C\t");
    
    Serial.print("Humidity: ");
    Serial.print(scd30.relative_humidity, 1);
    Serial.println(" %");
  }
  delay(100);
}`

**Relevant software files**: Requires Adafruit_SCD30 library

**Extra and gratuitous information and images**:

**I2C Address**: 0x61 (fixed, cannot be changed)

**Specs**:

- Measurement range: 400-10,000 ppm CO2
- Accuracy: ±(30 ppm + 3%)
- Measurement interval: 2-1800 seconds (configurable)
- Current consumption: 19mA @ 1 measurement per 2 seconds
- Temperature accuracy: ±0.4°C (from integrated SHT31)
- Humidity accuracy: ±3% RH (from integrated SHT31)
- Dimensions: 51.0mm × 25.4mm × 8.8mm

**NDIR vs eCO2**: Unlike SGP30/SGP40 which estimate CO2 from VOC readings (eCO2), SCD-30 uses NDIR technology to measure actual CO2 molecules via infrared absorption. This provides true, accurate CO2 readings.

**Automatic Self-Calibration (ASC)**: Can be enabled to automatically calibrate sensor assuming it sees 400ppm (fresh air) at least once every 7 days. Useful for long-term deployments.

**CO2 Reference Levels**:

- 400 ppm: Outdoor fresh air
- 400-1000 ppm: Good indoor air quality
- 1000-2000 ppm: Acceptable, ventilation recommended
- 2000+ ppm: Poor air quality, increased drowsiness
- 5000+ ppm: Health concerns

**Applications**: Indoor air quality monitoring, classroom ventilation, office HVAC optimization, greenhouse monitoring, fermentation monitoring, incubator control

**Dimensions**: 51.0mm × 25.4mm × 8.8mm / 2.0" × 1.0" × 0.3"

##