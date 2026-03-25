# Force/Pressure sensor

Type: Resistor, Sensor
Added: January 9, 2023 3:47 PM
Senses: Force applied by pressing the circular sensing area
Actuates: Analog voltage output for parameter control
Connection: minijack
Status: Done
Voltage: 3.3-5

![force-removebg-preview.jpg](force-pressure-sensor-2.jpg)

**Name**: Round Force-Sensitive Resistor (FSR)

**Type**: Sensor, Resistor

**Principle**: Resistive. Resistance decreases as applied force increases. Works through piezoresistive effect - conductive polymer changes resistance under pressure.

**Function**: Tactile variable resistor that changes resistance based on applied force. Outputs analog voltage proportional to pressure on circular sensing pad.

**Voltage**: 3.3-5V operating voltage, 0-5V analog output range

**Typical use**: Continuous pressure-based parameter control, button detection with pressure sensitivity, weight sensing, building into furniture or interfaces, velocity-sensitive triggering, drum pads, touch-sensitive controls.

**Good for**:

- Detecting pressure/weight on small contact point
- Variable parameter control through force
- Velocity-sensitive triggers
- Embedding in surfaces or interfaces
- Simple force detection without calibration
- Thin, flexible sensor for tight spaces

**Bad for**:

- Precise force measurement (±10-20% accuracy)
- Detailed parameter setting requiring exact values
- Saving state (resistance returns to baseline when released)
- High-precision applications
- Very light touch detection (<10g)
- Long-term continuous pressure (can drift)

**Mini Jack connection diagram:** 

![fsr_10k_bb.svg](force-pressure-sensor-4.svg)

![fsr_10k_schem.svg](force-pressure-sensor-5.svg)

**Component diagram**: See diagrams above

**Links**:

- [https://www.adafruit.com/product/166](https://www.adafruit.com/product/166)

**Buy**:

- [Round Force-Sensitive Resistor (FSR) - Adafruit #166](https://www.adafruit.com/product/166)

**Make instructions**: N/A (commercial component)

**Use instructions/Tutorials**:

1. Connect FSR in voltage divider circuit with 10kΩ pull-down resistor
2. Connect to analog input pin on microcontroller
3. Read analog values (0-1023 on Arduino)
4. Map to desired parameter range
5. Apply smoothing/averaging for stable readings
6. Can be soldered directly or use conductive adhesive

**Arduino IDE sketches**:

cpp

`// Basic FSR reading
const int fsrPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int fsrReading = analogRead(fsrPin);
  Serial.print("FSR reading: ");
  Serial.println(fsrReading);
  delay(100);
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Note**: Some force sensors at the lab already have integrated 10kΩ pull-down resistors, indicated by insulation cover on mini jack input and/or red stripe marking.

**Specifications:**

- Sensing range: 0.1-10kg (approximate)
- Sensing area: 12.7mm diameter circle
- Resistance range: >1MΩ (no pressure) to ~300Ω (max pressure)
- Response time: <1ms
- Operating temperature: -30°C to +70°C

**Different Shapes Available:**

Also available in rectangular strip format for different applications:

- [Square FSR - Adafruit #1075](https://www.adafruit.com/product/1075)

![image.png](force-pressure-sensor-6.png)

Show Image

**Durability Notes:**

- Rated for millions of actuations
- Avoid sharp objects on sensing surface
- Flexible but avoid extreme bending
- Can degrade with prolonged constant pressure

![force2.jpeg](force-pressure-sensor-3.jpeg)

![Force_Sensor.png](force-pressure-sensor-1.png)