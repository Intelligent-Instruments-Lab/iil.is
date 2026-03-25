# Circular Soft Potentiometer (Ribbon Sensor)

Type: Sensor
Added: January 17, 2023 11:06 AM
Senses: Pressed position on the sensor
Actuates: Analog Voltage Signal (1/3 to 2/3 Vcc) (e.g. to microcontroller ADC input)
Connection: Minijack
Status: Done
Voltage: 3.3-5V
Panel: Analog Inputs/Sensors

![soft.jpeg](circular-soft-potentiometer-ribbon-sensor-1.jpeg)

**Name**: Circular Soft Potentiometer (Ribbon Sensor)

**Type**: Sensor

**Principle**: Pressure-sensitive resistive strip in donut shape. Pressing the sensor changes the resistance between the wiper (center pin) and outer pins based on position. Two resistive layers separated by spacer dots complete the circuit when pressed.

**Function**: Detects radial position of touch/press on circular sensing area. Middle pin resistance varies based on where pressure is applied around the circle.

**Voltage**: 3.3-5V

**Typical use**: Rotary-style controllers, retrofit controls for curved surfaces, wearable interfaces, radial position sensing, knob replacements, circular sliders.

**Good for**:

- Thin, low-profile form factor
- Adhesive backing for easy mounting
- Curved or semi-flexible surface embedding
- Custom radial position interfaces
- Space-constrained designs

**Bad for**:

- Saving state (resistance floats when not pressed)
- Precise repeatable readings
- Multiple simultaneous touch points
- Long-term outdoor use (exposed contacts)

**Mini Jack connection diagram**:
**CRITICAL:** Must use voltage divider with series resistors:

- Outer pin 1 → 10kΩ resistor → GND
- Outer pin 2 → 10kΩ resistor → Vcc
- Center pin (wiper) → ADC input (also add 100kΩ pull-up/down resistor)
- **DO NOT connect outer pins directly to power/ground!**

**Component diagram**:

`Vcc → 10kΩ → Outer Pin 2
                   |
              Center Pin → ADC (+ 100kΩ pullup or 100kΩ to GND pulldown)
                   |
GND ← 10kΩ ← Outer Pin 1`

**Links**:
[Adafruit Circular Soft Potentiometer](https://www.adafruit.com/product/1069)

**Buy**:
[Adafruit Product 1069](https://www.adafruit.com/product/1069)

**Make instructions**: N/A (commercial component by Spectra Symbol)

**Use instructions/Tutorials**:

```
const int sensorPin = A0; //Change Accordingly
const int pullupPin = A1;  // Optional pull-up reference
```

```
void setup() {
Serial.begin(9600);
pinMode(pullupPin, INPUT_PULLUP);  // Weak pullup for floating detection
}
```

```
void loop() {
int value = analogRead(sensorPin);
float voltage = value * (5.0 / 1023.0);
```

```
// Output range: ~1.67V to ~3.33V (1/3 to 2/3 Vcc at 5V)
Serial.println(value);
delay(100);
}
```

**Arduino IDE sketches**:
Standard analogRead()

**Relevant software files**:
N/A - standard ADC

**Extra and gratuitous information and images**:

**Specs:**

- Manufacturer: Spectra Symbol
- Shape: Donut/circular sensing region
- Outer diameter: 55.96mm (2.2")
- Inner diameter: 35.63mm (1.4")
- Resistance: 10kΩ nominal
- Pins: 3 (two outer ends + center wiper)
- Output range: 1/3 to 2/3 Vcc (not full range!)
- Adhesive backing included

**Important:** Middle pin floats when unpressed - always use pull-up/down resistor (100kΩ typical) to prevent floating readings.