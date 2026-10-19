# Trill Flex Flexible Capacitive Strip (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Sensor
Added: July 25, 2026
Senses: Position and size of multiple simultaneous touches along a flexible strip that conforms to curves and corners
Actuates: N/A
Connection: I2C (QWIIC)
Status: Done
Voltage: Vin 3–5 V (logic level follows host: 3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: Two parts: a small rigid base carrying the Trill capacitive-sensing chip (Bela's Trill firmware), and a detachable flexible sensor made from flex PCB that plugs into the base. The flex strip carries interleaved electrodes; the firmware computes a centroid, so — like Trill Bar — it reports continuous multitouch position and size, but on a surface you can wrap around cylinders, bend over edges and press into corners.

**Function**: A bendable multitouch ribbon. Reports position and size of multiple touches along the flexible strip over I2C at 12-bit resolution (up to 16-bit). The flex sensor is swappable, so you can substitute custom-shaped flex electrodes for bespoke interfaces.

**Voltage**: Vin 3–5 V. I2C logic level follows the host — 3.3 V on Bela/Raspberry Pi, 5 V on Arduino/Teensy 5V.

**Typical use**:
- A ribbon controller that wraps a tube, a neck or a curved body, following the form instead of forcing a flat panel onto it.
- Touch sensing along a contour — the edge of a sculpture, a handrail, a seam in a garment.

**Good for**:
- Curved and awkward surfaces where a rigid PCB won't sit — its whole reason to exist.
- Continuous multitouch position + size, like Bar but conformable.
- Swappable flex sensor: prototype custom electrode shapes on the same rigid base.
- Plug-and-play over QWIIC/I2C on Bela, Arduino, Pi, Teensy.

**Bad for**:
- Tight repeated flexing — flex PCB tolerates bends but has a fatigue life; don't hinge it thousands of times at a sharp crease.
- Absolute precision — capacitive baseline drifts, and bending changes the baseline; recalibrate after reshaping.
- Force sensing — reports contact area, not grams.
- Very long unshielded routing to the flex — keep leads short to limit noise.

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA on the QWIIC connector of the rigid base (included QWIIC-to-pin cable breaks out the four lines). The flex sensor connects to the base via its own flex connector, not the I2C bus.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [Trill datasheet (PDF)](https://www.mouser.com/catalog/specsheets/Bela_TRILL_sensors_datasheet.pdf)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Flex — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-flex)

**Use instructions/Tutorials**: Insert the flexible sensor into the rigid base's connector, then plug the QWIIC cable to your host's I2C. On Bela load the Trill Flex example; on Arduino install the Trill library and run `flex-print`. Read `touchLocation(i)` and `touchSize(i)` per touch. Recalibrate the baseline after you bend or mount it, since the resting capacitance changes with shape. Keep the flex clear of large grounded metal behind it to avoid swamping sensitivity.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino).
```cpp
#include <Trill.h>
Trill trillSensor;              // Trill Flex, default I2C 0x48
void setup() {
  Serial.begin(115200);
  trillSensor.begin(Trill::TRILL_FLEX);
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

**Extra and gratuitous information and images**: Default I2C address 0x48 (Flex range 0x48–0x50, changeable via solder pads). Multitouch centroid sensing along the flexible strip. 12-bit default (0–4096), up to 16-bit. Two-part design: rigid base (Trill chip) plus detachable flex-PCB sensor; the flex sensor is replaceable/custom-shapeable. Ships with a QWIIC connector and QWIIC-to-pin cable. Chainable with other Trill sensors (see Trill Hub). Low current draw.
![Trill Flex Flexible Capacitive Strip (Bela)](trill-flex-flexible-capacitive-strip-bela-1.jpg)