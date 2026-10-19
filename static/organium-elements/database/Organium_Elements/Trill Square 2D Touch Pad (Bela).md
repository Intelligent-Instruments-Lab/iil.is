# Trill Square 2D Touch Pad (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Sensor
Added: July 25, 2026
Senses: X/Y position of one touch across a square pad, plus touch size
Actuates: N/A
Connection: I2C (Grove)
Status: Done
Voltage: Vin 3–5 V (logic level follows host: 3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: Two interleaved sets of 15 capacitive electrodes — one running horizontally, one vertically — sit under a square surface. Bela's Trill firmware computes a centroid on each axis, so a single fingertip yields a continuous x and y coordinate plus a touch-size value. It's a trackpad-style capacitive surface with no moving parts.

**Function**: Reports the x, y position (each 0–1) and size of one touch on a 69 mm square pad over I2C, at 12-bit resolution (up to 16-bit). Limited multitouch is possible per axis but the x↔y pairing of multiple simultaneous touches is ambiguous, so treat it as a single-touch 2D controller.

**Voltage**: Vin 3–5 V. I2C logic level follows the host — 3.3 V on Bela/Raspberry Pi, 5 V on Arduino/Teensy 5V.

**Typical use**:
- An XY performance pad — pitch against timbre, or cutoff against resonance — with touch size available as a third dimension.
- A "steer the scene" pad on a plinth, mapping x and y onto visuals, spatial panning or lighting.

**Good for**:
- Two continuous dimensions from one finger, plus size — rich, playable control from a compact pad.
- Smooth and high-resolution — much finer than a button grid.
- Finished surface, plug-and-play over Grove/I2C.
- Great for XY morphing/joystick-style mappings without mechanical wear.

**Bad for**:
- Reliable multitouch — multiple fingers confuse the x/y pairing; it's a single-touch surface.
- Absolute precision — capacitive baseline drifts; recalibrate for measurement work.
- Force sensing — size is contact area, not grams.
- Edge accuracy — centroid readings compress slightly near the borders.

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA on the Grove connector (included Grove-to-male-pin cable breaks these four lines out).

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [Trill datasheet (PDF)](https://www.mouser.com/catalog/specsheets/Bela_TRILL_sensors_datasheet.pdf)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Square — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-square)

**Use instructions/Tutorials**: Connect the Grove cable to your host's I2C (or VIN/GND/SCL/SDA). On Bela load the Trill Square example; on Arduino install the Trill library and run `square-print`. Read `touchLocation()` (x) and `touchHorizontalLocation()` (y) plus `touchSize()`. Baseline it untouched at startup. Map x/y to two parameters and add gentle smoothing for stable control.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino).
```cpp
#include <Trill.h>
Trill trillSensor;              // Trill Square, default I2C 0x28
void setup() {
  Serial.begin(115200);
  trillSensor.begin(Trill::TRILL_SQUARE);
}
void loop() {
  trillSensor.read();
  if (trillSensor.getNumTouches() > 0) {
    Serial.print("x "); Serial.print(trillSensor.touchLocation(0));
    Serial.print(" y "); Serial.print(trillSensor.touchHorizontalLocation(0));
    Serial.print(" size "); Serial.println(trillSensor.touchSize(0));
  }
  delay(20);
}
```

**Relevant software files**: — (use `Trill.h`)

**Extra and gratuitous information and images**: Default I2C address 0x28 (Square range 0x28–0x30, changeable via solder pads). 15 electrodes per axis. 12-bit default (0–4096), up to 16-bit. Board 69.0 × 69.0 mm. Ships with a Grove connector and Grove-to-male-pin cable. Chainable with other Trill sensors (see Trill Hub). Low current draw.
![Trill Square 2D Touch Pad (Bela)](trill-square-2d-touch-pad-bela-1.jpg)