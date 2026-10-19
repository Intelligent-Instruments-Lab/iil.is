# Slider Potentiometer 10K (Adafruit 4272)

Category: INPUTS
Modality: TACTILE
Subtype: SLIDE
Type: Sensor
Added: July 25, 2026
Senses: Linear finger position / travel of a sliding knob
Actuates: N/A
Connection: Analog (3-wire voltage divider)
Status: Done
Voltage: Passive element — no supply; typically wired across a 3.3 V or 5 V reference
Published: Yes

**Principle**: A resistive track with a wiper that moves in a straight line as you push the knob. The wiper taps off a fraction of the resistance, so wiring the two ends to a voltage rail and ground turns the slider into a voltage divider: the wiper pin outputs a voltage proportional to knob position. Linear taper, so voltage tracks travel evenly end to end.

**Function**: Measures absolute linear position of a fingertip-driven fader as an analog voltage. 10 kΩ full-track resistance.

**Voltage**: Passive resistor — it does not need power. The output swing equals whatever reference you feed the two outer legs (0 to 3.3 V on a Pi/ESP32 ADC, 0 to 5 V on a classic Arduino). No logic level of its own; logic level is set by the ADC you read it with.

**Typical use**:
- A fader whose setting is readable across a room — level, filter cutoff or crossfade on a sound instrument, seen at a glance rather than hunted for on a knob pointer.
- Position control a visitor drags: the physical travel maps directly onto a timeline being scrubbed, a light scene being morphed, or where a projected object sits.

**Good for**:
- Immediate, tactile, "eyes-free" gesture — muscle memory of a fader beats a knob for performance
- Cheap, rugged, no library needed; one analog pin per slider
- Visible state — the knob position is the value, so the control reads correctly even after a power cycle (unlike an encoder)

**Bad for**:
- Panel mounting on a finished enclosure — the bare open-frame body has no threaded bushing; you must design a slot and bracket
- Dusty / outdoor / wet installs — the open track collects grime and gets scratchy
- Precision or repeatable absolute values — cheap carbon track drifts and gets noisy at the ends; add smoothing in code
- Motorized recall / automation — this is a manual fader with no motor

**Mini Jack connection diagram**: N/A for the wiper as a bus part, but it IS jack-patchable as an analog/CV source. Wire the two outer legs to your reference rail and ground; bring the centre wiper leg to a mono TS jack tip (sleeve = ground). Patched into a CV input it acts as a manual offset/attenuator. Pins: left leg = one track end, centre = wiper (signal out), right leg = other track end. Swap the two outer legs to reverse the direction of travel.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page + datasheet](https://www.adafruit.com/product/4272) · [Arduino AnalogReadSerial tutorial](https://docs.arduino.cc/built-in-examples/basics/AnalogReadSerial/)

**Buy**: [Adafruit #4272](https://www.adafruit.com/product/4272)

**Use instructions/Tutorials**: Connect one outer leg to 3V3/5V, the other outer leg to GND, and the centre wiper to an analog input. Read with `analogRead()`. If the value counts down when you expect it to count up, swap the two outer legs. Add a 0.1 µF cap from wiper to ground to tame noise, and a moving-average in code for a smooth fader feel. On a breadboard the 3 legs seat straight into rows.

**Arduino IDE sketches**: No library needed.
```cpp
const int PIN = A0;
void setup() { Serial.begin(9600); }
void loop() {
  int v = analogRead(PIN);          // 0..1023
  Serial.println(v);
  delay(20);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 10 kΩ, linear taper. Overall body 45 mm long × 9.5 mm wide × 26 mm tall; shank 10 mm long × 5 mm wide; supplied knob 10.3 × 11.7 × 6.8 mm. Three legs, breadboard/solder friendly. No power or current rating needed — it is a passive divider; keep current low (µA into an ADC) so self-heating is a non-issue.
![Slider Potentiometer 10K (Adafruit 4272)](slider-potentiometer-10k-adafruit-4272-1.jpg)