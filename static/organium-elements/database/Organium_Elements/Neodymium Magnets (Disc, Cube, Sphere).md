# Neodymium Magnets (Disc, Cube, Sphere)

Category: MOUNTING
Modality: MAGNET
Type: Hardware
Added: August 6, 2026
Senses: N/A
Actuates: N/A — permanent magnetic force (holds, mounts, or acts on a magnetic sensor)
Connection: N/A (physical)
Status: Done
Voltage: N/A
Published: Yes

**Principle**: Permanent **neodymium (NdFeB)** rare-earth magnets — the strongest common magnets. Grades run N35–N52 (higher = stronger). They pull hard for their size and keep their field indefinitely. In stock in several shapes: **discs** (3 mm and 10 mm), **cubes** (×20), and **30 mm spheres** (×6). Filed under MOUNTING·MAGNET — *strong magnets for holding/mounting*, distinct from the magnetic **sensors** (hall, magnetometer) which live in IN·MAGNETIC / EMF.

**Function**: Two jobs in this library — (1) **mounting**: clamp panels, hold parts, make quick detachable joints; (2) **interaction**: a hand-held magnet is the natural *companion* to a hall-effect or MLX90393 sensor — move it near the sensor to make a contactless control.

**Typical use**:
- Contactless interaction — a magnet moved over a hall or magnetometer sensor becomes a knob, a position or a presence reading, with nothing touching and nothing to wear out.
- Holding and coupling: detachable fixtures on the steel display wall, hidden fasteners, and drives that work through a surface of glass or wood.

**Good for**:
- Very strong hold for their size; instant, tool-free, reversible mounting.
- Perfect stimulus for the magnetic-sensing station (pair with IN·MAGNETIC / EMF).
- Many shapes for different jobs (thin discs to embed, cubes to stack, spheres to roll).

**Bad for**:
- **Electronics & data** — keep well away from LiPo/other magnetic media, hard drives, CRTs, mechanical watches, and **magnetometer/compass calibration** (they'll swamp the reading).
- **Pinch & shatter hazard** — strong magnets snap together and can pinch skin or chip (flying shards); the spheres are a serious **swallowing hazard** — keep away from mouths.
- **Heat** — NdFeB loses strength above ~80 °C (demagnetises); don't solder near them or leave in a hot car.
- Precise force — "grade" and geometry make pull hard to predict; test in place.

**Mini Jack connection diagram**: N/A — passive physical part, no electrical connection.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [K&J Magnetics — neodymium grades & safety](https://www.kjmagnetics.com/neomaginfo.asp)
- [Hall Effect Sensor (companion, in catalogue)](https://www.adafruit.com/product/158)
- [MLX90393 magnetometer (companion, in catalogue)](https://www.adafruit.com/product/4022)

**Buy**: Disc / cube / sphere neodymium magnet assortments — Amazon (assorted shapes)

**Use instructions/Tutorials**: For sensing, glue or hand-hold a disc and bring it toward a hall/magnetometer sensor — note how the reading changes with distance and which pole faces the sensor. For mounting, sandwich a thin steel plate or embed a disc in a 3D print. Handle a few at a time; separate stuck magnets by sliding apart, not pulling.

**Arduino IDE sketches**: N/A (passive) — but they are the stimulus for the hall/magnetometer sketches (see those entries).

**Relevant software files**: N/A.

**Extra and gratuitous information and images**: NdFeB, grade ~N35–N52. Shapes commonly stocked: discs 3 mm & 10 mm, cubes, 30 mm spheres ×6. Home coin-flip noted in the scheme: parked in MOUNTING·MAGNET, but their main use is **interaction** (moving field for a sensor), not just holding — revisit if an "interaction/companion" home is wanted. Do **not** confuse with the magnetic *sensors* (IN·MAGNETIC / EMF).
![Neodymium Magnets (Disc, Cube, Sphere)](neodymium-magnets-disc-cube-sphere-1.jpg)