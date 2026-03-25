# Tilt switch

Type: Sensor
Added: January 13, 2023 10:49 AM
Senses: Basic orientation (tilt angle)
Actuates: Digital on/off signal based on orientation
Connection: minijack
Status: Done
Voltage: Up to 24V, switching less than 5mA
Panel: Analog Inputs/Sensors

![imageedit_58_2736298866.jpg](tilt-switch-2.jpg)

**Name**: Tilt Ball Switch (Mercury-Free)

**Type**: Sensor

**Principle**: Mechanical switch with rolling ball bearing. Ball completes circuit when switch tilted to specific orientation. Gravity-activated mechanical contact.

**Function**: Simple orientation sensor. Switch turns ON when tilted upright (red marking pointing up) within ±15° tolerance. Digital on/off output based on tilt angle.

**Voltage**: Switching voltage up to 24V, switching current <5mA (low-power digital applications)

**Typical use**: Basic motion/orientation detection, tilt-activated triggers, simple leveling detection, shake detection, position sensing, gravity switches.

**Good for**:

- Simple orientation sensing
- Lightweight applications
- Low-power switching
- Binary tilt detection (on/off)
- No calibration needed
- Mechanical simplicity
- Cost-effective

**Bad for**:

- Fine resolution orientation measurement
- Detailed motion tracking
- Precise angle measurement (use accelerometer instead)
- Multiple axis detection
- Gradual/analog tilt sensing
- High-frequency vibration sensing

**Mini Jack connection diagram**: Two terminals - acts as simple switch (normally open)

**Component diagram**: Use like any mechanical switch with pull-up or pull-down resistor

**Links**:

- [https://en.wikipedia.org/wiki/Inclinometer](https://en.wikipedia.org/wiki/Inclinometer)

**Buy**:

- [Tilt Ball Switch - Adafruit #173](https://www.adafruit.com/product/173)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect one terminal to digital input pin
2. Connect other terminal to ground (or voltage)
3. Use INPUT_PULLUP mode on Arduino for simple wiring
4. Read digital state: HIGH = not tilted, LOW = tilted (with pull-up)
5. Red marking indicates "up" position for activation
6. ±15° tolerance around vertical orientation

**Arduino IDE sketches**:

cpp

`int tiltPin = 2;

void setup() {
  pinMode(tiltPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(tiltPin) == LOW) {
    Serial.println("Tilted!");
  } else {
    Serial.println("Upright");
  }
  delay(100);
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: Switching voltage up to 24V DC/AC, switching current <5mA, activation angle ±15° from vertical, response time instantaneous (mechanical), mercury-free design

**Mechanism**: Small metal ball inside enclosure rolls to complete circuit when tilted. Red marking indicates activation orientation (upright position).

**Applications**: Tilt alarms, orientation triggers, gravity-activated switches, motion-sensitive installations

**Limitations**: Binary output only (on/off). For precise angle measurement or multi-axis sensing, use accelerometer like [BNO055](https://www.notion.so/intelligentinstruments/Accelerometer%20(BNO055)).

![Tilt.jpeg](tilt-switch-1.jpeg)