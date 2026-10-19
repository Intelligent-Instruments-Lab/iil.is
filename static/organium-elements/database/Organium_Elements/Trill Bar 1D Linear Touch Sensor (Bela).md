# Trill Bar 1D Linear Touch Sensor (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Sensor
Added: July 25, 2026
Senses: Position of up to 5 simultaneous touches along a single linear axis, plus touch size per finger
Actuates: N/A
Connection: I2C (QWIIC)
Status: Done
Voltage: Vin 3–5 V (logic level follows host: 3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: A ready-made capacitive slider: 30 interleaved electrodes under the surface feed a capacitive-sensing microcontroller running Bela's Trill firmware. The firmware computes a centroid — the weighted centre of the touched electrodes — so it reports a smooth continuous position rather than discrete pads, and does so for up to five fingers at once. Contact area is reported as touch size, giving a soft "pressure-like" dimension.

**Function**: A one-axis multitouch ribbon. Outputs the position (0–1 across the length) and size of up to 5 touches over I2C, at 12-bit resolution (up to 16-bit configurable). Think of it as a high-resolution, contactless fader/ribbon controller with no moving parts.

**Voltage**: Vin 3–5 V. I2C logic level follows the host — 3.3 V on Bela/Raspberry Pi, 5 V on Arduino/Teensy 5V.

**Typical use**:
- Ribbon-controller instruments — glide pitch, sweep a filter, scrub a sample; one finger sets the position while a second adds modulation.
- A slider with no moving parts on a wall or plinth for visitors to drag: nothing to wear out, jam or be levered off.

**Good for**:
- Smooth, high-resolution continuous control — far finer than a row of buttons.
- True multitouch (5 fingers) on one axis, with per-touch size for expressive gestures.
- Finished, robust surface — no soldering electrodes; plug the QWIIC cable and go.
- Low latency on Bela for genuinely playable instrument feel.

**Bad for**:
- Absolute, repeatable measurement — capacitive baseline drifts; recalibrate for precision work.
- Two dimensions — it's a line; use Trill Square or Hex for x/y.
- Force sensing — reports contact area, not grams.
- Gloved or fully insulated touch — needs a conductive fingertip (or a conductive overlay).

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA on the QWIIC connector. (The included QWIIC-to-male-pin cable breaks these four lines out to header pins.)

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [Trill datasheet (PDF)](https://www.mouser.com/catalog/specsheets/Bela_TRILL_sensors_datasheet.pdf)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Bar — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-bar)

**Use instructions/Tutorials**: Plug the QWIIC cable to your host's I2C (or break out VIN/GND/SCL/SDA). On Bela load the Trill Bar example; on Arduino install the Trill library and run `bar-print`. Read `touchLocation(i)` (0–1) and `touchSize(i)` for each active touch. Let it sit untouched at power-up so the firmware baselines correctly. Map position to your parameter and smooth lightly to taste.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino).
```cpp
#include <Trill.h>
Trill trillSensor;              // Trill Bar, default I2C 0x20
void setup() {
  Serial.begin(115200);
  trillSensor.begin(Trill::TRILL_BAR);
}
void loop() {
  trillSensor.read();
  for (int i = 0; i < trillSensor.getNumTouches(); i++) {
    Serial.print("pos "); Serial.print(trillSensor.touchLocation(i));
    Serial.print(" size "); Serial.println(trillSensor.touchSize(i));
  }
  delay(20);
}
```

**Relevant software files**: — (use `Trill.h`)

**Extra and gratuitous information and images**: Default I2C address 0x20 (Bar range 0x20–0x28, changeable via solder pads). 30 electrodes, centroid-processed into up to 5 touches. 12-bit default (0–4096), up to 16-bit. Board 101.6 × 21.5 mm. Ships with a QWIIC connector and QWIIC-to-male-pin cable. Chainable with other Trill sensors (see Trill Hub). Low current draw.
![Trill Bar 1D Linear Touch Sensor (Bela)](trill-bar-1d-linear-touch-sensor-bela-1.jpg)