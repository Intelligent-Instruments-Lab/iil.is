# Diffused LED Packs — 3mm & 5mm (25-Pack, 5 Colours)

Category: OUTPUTS
Modality: LIGHT
Type: Actuator, Transducer
Added: July 25, 2026
Senses: N/A
Actuates: Coloured light (red, yellow, green, blue, white)
Connection: Analog (2-lead, current-limited via resistor)
Status: Done
Voltage: ~2V (red/yellow/green) or ~3.3V (blue/white) forward at 20mA
Published: Yes

**Principle**: A light-emitting diode: forward current across a semiconductor junction makes charge carriers recombine and emit photons, at a colour set by the die chemistry. Both packs use a **diffused** (milky, not water-clear) epoxy lens, which scatters the output so the LED reads as an evenly-lit dot from any angle instead of one harsh hotspot. The only difference between them is the body: a 3mm mini package or a 5mm dome.

**Function**: Two packs of 25 through-hole indicator LEDs — 5 each of red, yellow, green, blue and white — for status lights, panel indicators, breadboard prototyping and small points of light. ~250 mcd typical in both sizes, bright enough to read in daylight.

**The two sizes**:

| | 3mm (#4202) | 5mm (#4203) |
|---|---|---|
| Body | mini, fits a crowded panel | classic dome, reads across a room |
| Panel mount | small bezels, tight layouts | the default indicator size; standard 5mm holders |
| Brightness | ~250 mcd | ~250 mcd, but the larger dome catches the eye |
| Use it when | space is the constraint | visibility is the constraint |

Electrically they are the same part: same five colours, same forward voltages, same 20mA, same resistor rule. Pick by how big the dot should be and what will hold it.

**Voltage**: Forward voltage ~2V for red/yellow/green and ~3.3V for blue/white, at 20mA, in both sizes. Not a logic device — drive from a 3.3V or 5V pin through a series current-limiting resistor.

**Typical use**:
- Status and mode indicators on panels and control boxes — 3mm where the panel is crowded, 5mm where it has to be read across a room.
- Diffused points of light in sculptures, props and set pieces, where the frosted lens spreads the glow instead of showing a hot die.

**Good for**:
- Diffused lens gives an even glow visible well off-axis — friendlier than clear LEDs for indicators
- Five colours in one cheap pack, in either size; covers a whole term of prototyping
- Instantly breadboardable, and robust as long as a resistor is in the loop
- 5mm fits standard panel-mount bezels; 3mm fits where 5mm will not

**Bad for**:
- Not addressable — one GPIO and one resistor per LED; use NeoPixel or DotStar for many controllable points
- ~250 mcd is indicator-bright, not illumination — neither size will light a scene
- Blue and white need ~3.3V, so they are marginal on a drained battery
- No integrated resistor — omit it and you cook the LED or the pin
- 5mm through-hole is bulky for dense work; 3mm or SMD there

**Mini Jack connection diagram**: N/A — 2-lead component. Longer lead = anode (+), shorter lead / flat on the flange = cathode (−). Always include a series resistor (e.g. ~220–330Ω on 5V, ~100–150Ω on 3.3V).

**Component diagram**:

![LED pinout — anode, cathode, and the series-resistor rule](diagram-led-pinout.svg)

**Links**: [Adafruit #4203 — 5mm pack](https://www.adafruit.com/product/4203) · [Adafruit #4202 — 3mm pack](https://www.adafruit.com/product/4202) · [Adafruit "All About LEDs" guide](https://learn.adafruit.com/all-about-leds)

**Buy**: [Adafruit #4203 — Diffused 5mm LED Pack (25-pack, 5 colours)](https://www.adafruit.com/product/4203) · [Adafruit #4202 — Diffused 3mm LED Pack (25-pack, 5 colours)](https://www.adafruit.com/product/4202)

**Use instructions/Tutorials**: Identify anode (long lead) and cathode (short lead / flat side). Wire GPIO → resistor → anode → LED → cathode → GND. Size the resistor for your rail: R ≈ (Vsupply − Vf) / 0.02A — about 150Ω for a red LED on 5V; 220–330Ω is a safe, slightly-dim default. The same resistor works for either size. Use PWM (`analogWrite`) to dim without swapping resistors.

**Arduino IDE sketches**: No library needed.
```cpp
const int LED = 9;               // via ~220Ω resistor
void setup(){ pinMode(LED, OUTPUT); }
void loop(){ digitalWrite(LED, HIGH); delay(500);
             digitalWrite(LED, LOW);  delay(500); }
```

**Relevant software files**: —

**Extra and gratuitous information and images**: Classic through-hole packages, diffused lens, ~250 mcd typical, 20mA nominal forward current, RoHS 2. Each pack is 25 LEDs (5× red, yellow, green, blue, white). The 5mm fits standard 5mm panel-mount holders. Keep continuous current at or below 20mA; PWM dims without changing the resistor.

**Lab photo**: the photographed pack is the **5mm** one — body width measured against the breadboard's 2.54mm pitch. The 3mm pack is the same five diffused colours in the smaller body.
![Diffused LED pack — the 5mm size, same five colours as the 3mm](diffused-5mm-led-pack-25-pack-5-colors-1.jpg)
