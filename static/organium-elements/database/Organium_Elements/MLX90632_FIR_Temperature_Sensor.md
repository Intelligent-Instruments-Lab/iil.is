# MLX90632 FIR Temperature Sensor

Type: Sensor
Added: March 10, 2026 2:08 PM
Senses: Infrared/thermal temperature (contactless)
Actuates: Digital data via I2C
Connection:  I2C (configurable address)
Status: Done
Voltage: 3.3V
Panel: Digital Inputs/Sensors

![MLX90632.jpg](mlx90632-fir-temperature-sensor-1.png)

**Name**: Adafruit MLX90632 FIR Remote Thermal Temperature Sensor (Medical Grade)

**Type**: Sensor

**Principle**: Far Infrared (FIR) contactless temperature measurement. Detects infrared radiation emitted by objects to measure temperature without physical contact. Medical-grade factory calibration for high accuracy.

**Function**: Non-contact infrared temperature sensor. Measures object temperature remotely via IR radiation detection. Also measures local ambient temperature on-chip. 50° field of view for targeted measurements.

**Voltage**: 3.3V supply (onboard regulation for 3.3V or 5V systems), 1mA active current, <2.5µA sleep current

**Typical use**: Medical temperature monitoring (body temperature), contactless thermometry, hot/cold object measurement, delicate item temperature sensing, food temperature monitoring, HVAC control, fever detection.

**Good for**:

- Climate and environmental data
- Temperature of objects
- Contactless measurement
- Delicate items such as plant leaves (no probe needed)
- Medical-grade accuracy (±0.2°C from 35-42°C)
- Low power consumption (1mA active, <2.5µA sleep)
- Extended range mode (-20 to 100°C object temp)
- Fast measurements (16ms to 2s configurable)
- STEMMA QT / Qwiic connectivity

**Bad for**:

- Wide-area temperature measurement (50° FOV)
- Long-distance sensing (best at few cm/inches)
- Precise spot measurements at distance
- Extreme temperatures (outside -20 to 100°C range)

**Mini Jack connection diagram**: N/A (STEMMA QT / Qwiic I2C breakout)

**Component diagram**:

- **VIN**: 3.3-5V power input
- **3V**: 3.3V regulated output
- **GND**: Ground
- **SCL**: I2C clock
- **SDA**: I2C data
- **ADDR**: I2C address configuration pin
- **STEMMA QT connectors**: Solderless I2C daisy-chaining

**Links**:

- [https://www.adafruit.com/product/6403](https://www.adafruit.com/product/6403)
- [https://learn.adafruit.com/adafruit-mlx90632-fir-remote-thermal-temperature-sensor](https://learn.adafruit.com/adafruit-mlx90632-fir-remote-thermal-temperature-sensor)
- [MLX90632 Datasheet](https://cdn-shop.adafruit.com/product-files/6403/MLX90632-Datasheet-Melexis.PDF)

**Buy**: Check link above

**Make instructions**: Install Adafruit_MLX90632 library in Arduino IDE

**Use instructions/Tutorials**:

1. Install Adafruit_MLX90632 library
2. Connect via I2C (STEMMA QT cable or solder headers)
3. Configure I2C address if needed (ADDR pin)
4. Select measurement mode (medical or extended range)
5. Set refresh rate (16ms to 2s)
6. Read object and ambient temperatures
7. Position sensor few cm from target for best results

**Arduino IDE sketches**:

cpp

`#include <Adafruit_MLX90632.h>

Adafruit_MLX90632 mlx = Adafruit_MLX90632();

void setup() {
  Serial.begin(115200);
  
  if (!mlx.begin()) {
    Serial.println("MLX90632 not found!");
    while (1) { delay(10); }
  }
  
  // Medical mode: 35-42°C, ±0.2°C accuracy
  // Extended mode: -20 to 100°C
  mlx.setMode(MLX90632_MODE_MEDICAL);
}

void loop() {
  float objectTemp = mlx.readObjectTemp();
  float ambientTemp = mlx.readAmbientTemp();
  
  Serial.print("Object: ");
  Serial.print(objectTemp, 2);
  Serial.print("°C  Ambient: ");
  Serial.print(ambientTemp, 2);
  Serial.println("°C");
  
  delay(500);
}`

**Relevant software files**: Requires Adafruit_MLX90632 library

**Extra and gratuitous information and images**:

**I2C Address**: Configurable via ADDR pin (1-bit external address control)

**Specs**:

- Medical mode: 35-42°C object temp, ±0.2°C accuracy, 0.01°C resolution
- Extended mode: -20 to 100°C object temp, 0.02°C standard resolution
- Field of view: 50°
- Refresh rate: Configurable 16ms to 2s (default 0.5s)
- Supply voltage: 3.3V
- Current: 1mA active, <2.5µA sleep
- Interface: I2C
- Dimensions: 25.5mm × 17.7mm × 4.7mm

**Medical Grade**: Factory calibrated MLX90632SLD-DCB variant with high accuracy in narrow medical range (body temperature measurement).

**Measurement modes**:

- **Medical mode**: Optimized for 35-42°C (human body temperature), ±0.2°C accuracy
- **Extended mode**: Wider range -20 to 100°C for general purpose sensing

**Field of View**: 50° cone - works best when a few cm/inches from target. Greater distances measure average of larger area.

**Contactless advantages**:

- No physical contact required
- Safe for hot/cold/delicate objects
- Hygienic (medical applications)
- Fast response time
- No sensor contamination

**Applications**: Forehead thermometers, medical monitoring, food temperature (cooking, safety), HVAC sensing, industrial process control, hot surface monitoring

**Replacement for**: Discontinued TMP007 infrared sensor

**Dimensions**: 25.5mm × 17.7mm × 4.7mm / 1.0" × 0.7" × 0.2"

**Weight**: 1.7g / 0.1oz

##