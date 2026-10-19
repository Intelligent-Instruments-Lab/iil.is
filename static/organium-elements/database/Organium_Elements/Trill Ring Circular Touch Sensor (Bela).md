# Trill Ring Circular Touch Sensor (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Sensor
Added: July 25, 2026
Senses: Angular position of up to 5 simultaneous touches around a circular track, plus touch size; central hole fits a button
Actuates: N/A
Connection: I2C (QWIIC)
Status: Done
Voltage: Vin 3–5 V (logic level follows host: 3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: A Trill Bar wrapped into a circle. 30 interleaved capacitive electrodes form a ring; Bela's Trill firmware computes a centroid around the circumference, so it reports continuous angular position for up to five touches at once, plus per-touch size. The open centre is a mechanical feature: it fits a standard arcade button and is sized to drop inside a NeoPixel ring for illuminated feedback.

**Function**: A circular multitouch slider. Outputs the position (0–1 around the loop) and size of up to 5 touches over I2C at 12-bit resolution (up to 16-bit). Ideal for endless-rotary / jog-wheel style control with no moving parts, and a natural home for a centre push-button.

**Voltage**: Vin 3–5 V. I2C logic level follows the host — 3.3 V on Bela/Raspberry Pi, 5 V on Arduino/Teensy 5V.

**Typical use**:
- An endless rotary for pitch, scrubbing, wavetable position or a circular step sequencer, with the centre pad as tap or select.
- A wheel visitors turn by dragging a finger; mount it inside a NeoPixel halo and the position becomes visible as light.

**Good for**:
- Natural rotary/jog control without an encoder's detents or mechanical wear.
- Continuous, wrapping position — great for anything cyclic (angle, phase, step index).
- Built-in integration story: arcade button in the centre, NeoPixel ring around it for lighting.
- 5-touch multitouch and touch size for expressive gestures.

**Bad for**:
- Absolute repeatable angle measurement — capacitive drift; recalibrate for precision.
- Force sensing — size is contact area, not grams.
- Gloved/insulated use — needs a conductive fingertip or overlay.
- Tiny fingertip precision at the ring's inner edge, where the track is narrow.

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA on the QWIIC connector (included QWIIC-to-male-pin cable breaks out the four lines). A separate centre button is wired to its own GPIO, not through Trill.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [Trill datasheet (PDF)](https://www.mouser.com/catalog/specsheets/Bela_TRILL_sensors_datasheet.pdf)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Ring — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-ring)

**Use instructions/Tutorials**: Plug the QWIIC cable to your host's I2C. On Bela load the Trill Ring example; on Arduino install the Trill library and run `ring-print`. Read `touchLocation(i)` (0–1 around the ring) and `touchSize(i)`. The Ring firmware also exposes the central button state via `getButtonValue()` when a button is wired. Baseline untouched at power-up. For cyclic parameters, treat position 0 and 1 as adjacent.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino).
```cpp
#include <Trill.h>
Trill trillSensor;              // Trill Ring, default I2C 0x38
void setup() {
  Serial.begin(115200);
  trillSensor.begin(Trill::TRILL_RING);
}
void loop() {
  trillSensor.read();
  for (int i = 0; i < trillSensor.getNumTouches(); i++) {
    Serial.print("angle "); Serial.print(trillSensor.touchLocation(i));
    Serial.print(" size "); Serial.println(trillSensor.touchSize(i));
  }
  delay(20);
}
```

**Relevant software files**: — (use `Trill.h`)

**Extra and gratuitous information and images**: Default I2C address 0x38 (Ring range 0x38–0x40, changeable via solder pads). 30 electrodes, centroid-processed into up to 5 touches, plus a central button input. 12-bit default (0–4096), up to 16-bit. Outer diameter 52.0 mm, inner diameter 28.2 mm; central hole fits an arcade button and the ring fits inside a NeoPixel ring. Ships with a QWIIC connector and QWIIC-to-male-pin cable. Chainable with other Trill sensors (see Trill Hub). Low current draw.
![Trill Ring Circular Touch Sensor (Bela)](trill-ring-circular-touch-sensor-bela-1.jpg)