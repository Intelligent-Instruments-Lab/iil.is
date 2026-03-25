# Ribbon - Linear SoftPot

Type: Resistor, Sensor
Added: November 20, 2024 11:17 AM
Senses: Touch position along resistive strip
Actuates: Analog voltage output
Connection: minijack
Status: Done
Voltage: 0 - 3.3V, 0 - 5 V

![1732099885985.jpg](ribbon---linear-softpot-1.png)

**Name**: Ribbon - Linear SoftPot (Membrane Potentiometer)

**Type**: Sensor, Resistor - Tactile variable resistor

**Principle**: Resistive membrane potentiometer. Touch position along strip determines resistance, producing proportional voltage output via voltage divider.

**Function**: Thin, flexible resistive strip functioning as linear potentiometer through tactile contact. Position of touch determines output voltage.

**Voltage**: 3.3-5V operating voltage, 0-5V analog output (via voltage divider with pull-down resistor)

**Typical use**: Continuous parameter control (e.g., synthesizer pitch glissandi),  Due to it’s sensitivity, the ribbon sensor is suitable for controlling parameters that responds in slight variations (e.g. tremolo/vibrato), slider interfaces, ribbon controllers, gestural instruments.

**Good for**:

- Continuous control with delicate tactility
- High degree of performativity
- Embedding on curved or semi-flexible surfaces
- Thin, low-profile form factor
- Glissando/continuous pitch control
- Expressive gestural control
- Parameters requiring slight variations

**Bad for**:

- Saving state (resistance returns to baseline when released)
- Discrete/stepped control (use buttons instead)
- High mechanical stress
- Permanent pressure applications

**Mini Jack connection diagram**:

Voltage divider with 10kΩ pull-down resistor required (some lab units have integrated resistor indicated by insulation cover on mini jack).

Show Image

**Component diagram**: See schematic above (represented with potentiometer symbol)

![Ribbon_SoftPot.png](ribbon---linear-softpot-2.png)

**Links**:

- [https://sensorwiki.org/sensors/flexion](https://sensorwiki.org/sensors/flexion)

**Buy**:

- [Linear SoftPot - Adafruit #178](https://www.adafruit.com/product/178)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect according to arrow marking on ribbon
2. Arrow-marked pin: Connect to power (5V) for increasing values toward edge, or ground for decreasing values
3. Middle pin: Analog output (connect to microcontroller analog input)
4. Connect 10kΩ pull-down resistor from output to ground (if not integrated)
5. Read analog values along strip position
6. Map to desired parameter range

**Arduino IDE sketches**:

cpp

`int softpotPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int position = analogRead(softpotPin);
  Serial.println(position);
  delay(50);
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: Available lengths typically 50mm-500mm, resistance typically 10kΩ total, output proportional to touch position, thin flexible construction allows curved mounting

**Directional behavior**: Arrow marking indicates power connection direction. Power to arrow = values increase from edge to pins. Ground to arrow = values decrease from edge to pins.

**Pull-down resistor**: 10kΩ resistor from middle (output) pin to ground prevents floating values when not pressed. Some Organium units have integrated resistor (indicated by insulation cover on mini jack).

**Installation**: Can be mounted on curved surfaces. Adhesive backing available on some models. Protect surface from sharp objects.