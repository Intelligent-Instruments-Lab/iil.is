# Panel Mount 10K Linear Potentiometer (Adafruit 562)

Category: INPUTS
Modality: TACTILE
Subtype: TURN
Type: Sensor
Added: July 25, 2026
Senses: Rotary knob position / angle
Actuates: N/A
Connection: Analog (3-wire voltage divider)
Status: Done
Voltage: Passive element — no supply; typically wired across a 3.3 V or 5 V reference
Published: Yes

**Principle**: A curved resistive track with a rotating wiper. Turn the shaft and the wiper sweeps ~300° across the track, tapping off a fraction of the resistance. Wire the two ends across a voltage rail and ground and the wiper becomes a voltage divider whose output voltage is proportional to the shaft angle. Linear taper, so the voltage rises evenly with rotation (a log/audio taper would not).

**Function**: Measures absolute rotary position of a knob as an analog voltage. 10 kΩ full-track resistance, ~300° of useful travel.

**Voltage**: Passive — no supply pin. Output range equals the reference you apply to the outer legs (0–3.3 V or 0–5 V). Logic level is defined by the ADC that reads it, not the pot.

**Typical use**:
- The knob on an instrument's front panel — cutoff, resonance, gain, tempo — with a threaded bush and nut that survives being turned by strangers.
- A dial a visitor is meant to touch: the hard stop at each end of the travel makes the available range self-evident without a label.

**Good for**:
- Actually panel-mountable — 16 mm body with a threaded bushing goes through a drilled hole and bolts to an enclosure, so it survives real-world use
- "Two-in-one" legs also seat in a breadboard, so the same part covers prototype and finished build
- Rated 100,000-cycle life and grippy shaft; solid, familiar knob feel
- No library, one analog pin, cheap

**Bad for**:
- Precise / repeatable absolute values — carbon track is noisy near the ends and drifts; smooth in code
- Continuous rotation or automation — it hits mechanical stops at ~300° and cannot be motor-recalled; use a rotary encoder for endless turn
- Audio-law volume feel — this is a LINEAR taper, so a volume control will feel bunched at the bottom; pick a log/audio pot for that
- High-density panels — 16 mm bodies are chunky next to tiny 9 mm pots

**Mini Jack connection diagram**: N/A as a bus part, but jack-patchable as an analog/CV source. Outer legs to reference rail and ground; centre wiper to a mono TS jack tip, sleeve to ground — gives a manual CV / attenuator knob on a patch panel. Pins (0.2" spacing): one outer = track end A, centre = wiper (signal), other outer = track end B. Swap the outer legs to flip rotation direction.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page](https://www.adafruit.com/product/562) · [Bourns P160KN datasheet reference (P160KN-0QC15B10K)](https://www.adafruit.com/product/562) · [Arduino analogRead reference](https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/)

**Buy**: [Adafruit #562](https://www.adafruit.com/product/562)

**Use instructions/Tutorials**: One outer leg to 3V3/5V, the other to GND, wiper (centre) to an analog input. `analogRead()` returns 0 at one stop and full-scale at the other; use `map()` to scale to your range. Swap outer legs to reverse. For panel mount, drill a hole to the bushing diameter, fit the anti-rotation washer, and tighten the nut; add a knob to the shaft. A 0.1 µF cap wiper-to-ground reduces jitter.

**Arduino IDE sketches**: No library needed.
```cpp
const int PIN = A0;
void setup() { Serial.begin(9600); }
void loop() {
  int raw = analogRead(PIN);               // 0..1023
  int val = map(raw, 0, 1023, 0, 100);     // scale to 0..100
  Serial.println(val);
  delay(20);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 10 kΩ linear taper, ~300° rotational travel. 16 mm body diameter; 3 pins at 0.2" spacing; grippy (smooth) shaft. 100,000-cycle life, static stop strength 90 oz-in, rotational torque 0.5–1.25 oz-in. Datasheet part P160KN-0QC15B10K. Passive divider — negligible current into an ADC.
![Panel Mount 10K Linear Potentiometer (Adafruit 562)](panel-mount-10k-linear-potentiometer-adafruit-562-1.jpg)