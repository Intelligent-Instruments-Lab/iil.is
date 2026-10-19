# Trill Hex Hexagonal Touch Grid (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Sensor
Added: July 25, 2026
Senses: X/Y position of one touch across a hexagonal pad, plus touch size
Actuates: N/A
Connection: I2C (QWIIC)
Status: Done
Voltage: Vin 3–5 V (logic level follows host: 3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: Like Trill Square but on a hexagonal footprint: two interleaved sets of 15 capacitive electrodes give x and y centroids for a single touch, plus touch size. The hex outline is deliberate — hexagons tessellate, so multiple Hex boards tile into a continuous surface, and the shape suits isomorphic (hexagonal) note layouts familiar from instruments like the Wicki-Hayden / harpejji-style grids.

**Function**: Reports the x, y position (each 0–1) and size of one touch on a hexagonal pad over I2C, at 12-bit resolution (up to 16-bit). Limited per-axis multitouch exists but multi-touch x↔y pairing is ambiguous; treat it as a single-touch 2D controller with a tessellating form factor.

**Voltage**: Vin 3–5 V. I2C logic level follows the host — 3.3 V on Bela/Raspberry Pi, 5 V on Arduino/Teensy 5V.

**Typical use**:
- An XY expression pad, or several boards tiled into an isomorphic honeycomb keyboard.
- Tessellated touch panels covering a surface, each hexagon mapped to its own zone of sound or light.

**Good for**:
- Tiling: hexagons pack edge-to-edge into larger continuous surfaces.
- Two continuous dimensions plus size from one finger.
- Isomorphic / musical grid layouts where the hex shape is the whole point.
- Finished, plug-and-play surface over QWIIC/I2C.

**Bad for**:
- Reliable multitouch — single-touch x/y only; multiple fingers confuse pairing.
- Absolute precision — capacitive baseline drift; recalibrate for measurement.
- Force sensing — size is contact area, not grams.
- Seamless tiling of the sensing field — the touch areas tile, but each board is still a separate sensor with its own coordinate frame and I2C address to stitch in software.

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA on the QWIIC connector (included QWIIC-to-male-pin cable breaks out the four lines).

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [Trill datasheet (PDF)](https://www.mouser.com/catalog/specsheets/Bela_TRILL_sensors_datasheet.pdf)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Hex — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-hex)

**Use instructions/Tutorials**: Plug the QWIIC cable to your host's I2C. On Bela load the Trill Hex example; on Arduino install the Trill library and run `hex-print`. Read `touchLocation()` (x) and `touchHorizontalLocation()` (y) plus `touchSize()`. Baseline untouched at startup. When tiling multiple boards, give each a unique I2C address (solder pads) and offset their coordinates in software to build one big surface.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino).
```cpp
#include <Trill.h>
Trill trillSensor;              // Trill Hex, default I2C 0x40
void setup() {
  Serial.begin(115200);
  trillSensor.begin(Trill::TRILL_HEX);
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

**Extra and gratuitous information and images**: Default I2C address 0x40 (Hex range 0x40–0x48, changeable via solder pads). 15 electrodes per axis. 12-bit default (0–4096), up to 16-bit. Hexagonal board 46.5 mm edge-to-edge, 53.0 mm corner-to-corner. Ships with a QWIIC connector and QWIIC-to-male-pin cable. Designed to tessellate for isomorphic keyboards. Chainable with other Trill sensors (see Trill Hub). Low current draw.
![Trill Hex Hexagonal Touch Grid (Bela)](trill-hex-hexagonal-touch-grid-bela-1.jpg)