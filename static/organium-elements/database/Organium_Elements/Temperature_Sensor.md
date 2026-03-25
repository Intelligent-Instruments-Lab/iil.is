# Temperature Sensor

Type: Resistor, Sensor
Added: January 9, 2023 3:49 PM
Senses: Temperature
Actuates: Analog voltage output
Connection: minijack
Status: Done
Voltage: 2.7-5.5V, analog output 0V @ -50°C to 1.75V @ 125°C
Panel: Analog Inputs/Sensors

![var-removebg-preview.jpg](temperature-sensor-1.jpg)

**Name**: TMP36 Temperature Sensor

**Type**: Sensor

**Principle**: Analog voltage output proportional to temperature. Semiconductor-based sensor with linear voltage-to-temperature relationship.

**Function**: Measures ambient temperature and outputs analog voltage directly proportional to temperature. No external components required.

**Voltage**: Supply: 2.7-5.5V, Output: 0V @ -50°C to 1.75V @ 125°C (10mV/°C)

**Typical use**: Temperature monitoring, environmental sensing, thermal control systems, weather stations, temperature-responsive installations, climate data logging.

**Good for**:

- Simple temperature measurement
- Wide temperature range (-50°C to 125°C)
- Direct microcontroller connection (no calibration needed)
- Low power consumption
- Linear output (easy conversion)
- No external components required

**Bad for**:

- High-precision applications (±2°C accuracy)
- Very fast temperature changes
- Extreme temperatures (outside -50°C to 125°C)
- Waterproof applications (needs protection)

**Mini Jack connection diagram**:

- Pin 1 (left): Power (2.7-5.5V)
- Pin 2 (center): Analog output
- Pin 3 (right): Ground

**Component diagram**: TMP36 → Analog pin on microcontroller

**Links**:

- [TMP36 Temperature Sensor - Adafruit #165](https://www.adafruit.com/product/165)
- [https://en.wikipedia.org/wiki/Resistance_thermometer](https://en.wikipedia.org/wiki/Resistance_thermometer)

**Buy**: Check link above

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect pin 1 to 2.7-5.5V power
2. Connect pin 3 to ground
3. Connect pin 2 to analog input on microcontroller
4. Read analog voltage
5. Convert to temperature: **Temp °C = 100 × (voltage in V) - 50**

**Arduino IDE sketches**:

cpp

`int tempPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int reading = analogRead(tempPin);
  float voltage = reading * (5.0 / 1023.0);
  float tempC = 100 * voltage - 50;
  Serial.print("Temperature: ");
  Serial.print(tempC);
  Serial.println(" C");
  delay(1000);
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: Range -50°C to 125°C, accuracy ±2°C, output 10mV/°C, supply 2.7-5.5V, quiescent current 50µA, response time ~30 seconds in still air

**Conversion formula**:

- Voltage to Celsius: **Temp °C = 100 × (V) - 50**
- Celsius to Fahrenheit: **Temp °F = (Temp °C × 9/5) + 32**

**Output characteristics**:

- 0V = -50°C
- 0.5V = 0°C
- 0.75V = 25°C (room temp)
- 1.0V = 50°C
- 1.75V = 125°C

**Applications**: Climate monitoring, temperature-activated systems, environmental data logging, thermal safety shutoffs, temperature-responsive art installations