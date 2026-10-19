# Trill Craft 30-Channel Capacitive Touch (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Sensor
Added: July 25, 2026
Senses: Capacitive touch and proximity on up to 30 independent electrodes; touch size (contact area) per channel
Actuates: N/A
Connection: I2C (right-angle pin header)
Status: Done
Voltage: Vin 3–5 V (logic level follows host: 3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: A capacitive-sensing microcontroller (Cypress PSoC family) running Bela's Trill firmware. Each of the 30 electrodes forms one plate of a capacitor; your skin — or any conductive material wired to a pad — changes that channel's capacitance, and the chip reads the change as a touch. Because it measures capacitance rather than force, a bigger contact area reads as a "bigger" touch, which Trill reports as touch size. It is the bare, DIY version of the Trill family: no fixed geometry, just 30 solder pads you connect to your own electrodes.

**Function**: Reads 30 raw capacitive channels over I2C at 12-bit resolution by default (0–4096, up to 16-bit configurable). Turns anything conductive — copper tape, conductive fabric, fruit, water, paint, wire, foil — into a multi-channel touch, proximity or hover sensor. Firmware can run in DIFF mode (per-channel raw values) or centroid modes when pads are laid out as a slider/2D surface.

**Voltage**: Vin 3–5 V. I2C is voltage-agnostic: logic level is set by the host — 3.3 V on Bela and Raspberry Pi, 5 V on Arduino/Teensy 5V. Do not exceed the host's logic level on the bus.

**Typical use**:
- Custom touch instruments — lay a keyboard, a ribbon or any arbitrary pad shape out in copper tape and read all 30 zones at once.
- Sensing things that are not electronics: a conductive-paint mural, plants and fruit, a basin of water — anything conductive becomes a touch zone.

**Good for**:
- Maximum flexibility — you decide the geometry; 30 channels is a lot of touch surface for the price.
- Reads proximity/hover, not just contact, so it works through thin non-conductive overlays (paper, fabric, wood veneer).
- Chainable: multiple Craft boards on the same I2C bus scale into the hundreds of channels.
- Honest analog fun — fruit, water and body-as-conductor demos always land in a workshop.

**Bad for**:
- Beginners who want plug-and-play — Craft is bare pads; wiring and tuning sensitivity is on you. Pick Bar/Square/Ring/Hex/Flex for a finished surface.
- Precise, drift-free absolute measurement — capacitance wanders with humidity, cable length and nearby hands; needs recalibration/baseline tracking.
- Long unshielded electrode leads — they act as antennas and pick up noise; keep runs short or shielded.
- Force/pressure sensing — it reports contact area, not grams. Use FSRs or load cells for real force.

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA via the right-angle pin header. The 30 sensing electrodes break out on the numbered pad row; wire each pad to your own conductive material. (If you want a single Craft channel patched to an Organium mini-jack, run the electrode wire to the jack tip (T); the sensor still talks to the host over I2C, not over the jack.)

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [Trill datasheet (PDF)](https://www.mouser.com/catalog/specsheets/Bela_TRILL_sensors_datasheet.pdf)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Craft — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-craft)

**Use instructions/Tutorials**: Wire VIN/GND/SCL/SDA to your host's I2C. Solder or clip conductive electrodes to the 30 pads. On Bela, drop in the Trill C++/Pd examples; on Arduino, install the Trill library and run the `craft-print` example to watch all 30 raw values. Start in DIFF mode to see per-pad values, then calibrate a baseline (touch nothing at startup) and set thresholds. Keep leads short; add a series resistor if channels cross-talk.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino).
```cpp
#include <Trill.h>
Trill trillSensor;              // Trill Craft, default I2C 0x30
void setup() {
  Serial.begin(115200);
  trillSensor.begin(Trill::TRILL_CRAFT);   // DIFF mode by default
}
void loop() {
  trillSensor.requestRawData();
  for (int i = 0; i < 30; i++)
    Serial.print(String(trillSensor.rawData[i]) + "\t");
  Serial.println();
  delay(50);
}
```

**Relevant software files**: — (use `Trill.h` from the Trill-Arduino or Bela Trill library)

**Extra and gratuitous information and images**: Default I2C address 0x30 (Craft range 0x30–0x38, changeable via solder pads). 30 channels. 12-bit resolution default (0–4096), up to 16-bit. Board 52.0 × 21.0 mm. Ships with an unsoldered right-angle I2C pin header. Chainable with other Trill boards and I2C devices on one bus (add a Trill Hub for tidy wiring). Low current draw (a few mA).
![Trill Craft 30-Channel Capacitive Touch (Bela)](trill-craft-30-channel-capacitive-touch-bela-1.jpg)