# Diffused 3mm LED Pack 25-Pack 5 Colors

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

**Principle**: A light-emitting diode: forward-biased current through a semiconductor junction recombines charge carriers and emits photons at a wavelength set by the die chemistry. The 3mm epoxy lens here is diffused (milky, not water-clear), scattering light so the LED reads as an evenly-lit dot from any angle rather than a single harsh point.

**Function**: A grab-bag of 25 through-hole indicator LEDs — 5 each of red, yellow, green, blue and white — for status lights, breadboard prototyping and small light points. ~250 mcd typical, bright enough to read in daylight.

**Voltage**: Forward voltage ~2V for red/yellow/green and ~3.3V for blue/white, at 20mA. Not a logic device — drive from any 3.3V or 5V pin through a series current-limiting resistor.

**Typical use**:
- Status and mode indicators on panels and control boxes, where 3 mm fits a crowded front panel and 5 mm does not.
- Small diffused points of light in sculptures and props — the frosted lens spreads the glow instead of showing a hot die.

**Good for**:
- Diffused lens gives an even glow visible from wide angles — friendlier than clear LEDs for indicators
- Five colours in one cheap pack covers a whole term of prototyping
- Instantly breadboardable; the standard first actuator for teaching
- Nearly indestructible and forgiving as long as you use a resistor

**Bad for**:
- Not addressable — one GPIO (or resistor) per LED; use NeoPixel/DotStar for many controllable points
- Only 3mm and ~250 mcd — too dim/small for area lighting or bright-room signage
- Blue/white need ~3.3V, so they barely light (or won't) on a near-empty battery
- No built-in resistor — forget it and you cook the LED or the pin

**Mini Jack connection diagram**: N/A — 2-lead component. Longer lead = anode (+), shorter lead / flat side of the flange = cathode (−). Always place a series resistor (e.g. ~220–330Ω on 5V, ~100–150Ω on 3.3V) in the loop.

**Component diagram**:

![LED pinout — anode, cathode, and the series-resistor rule](diagram-led-pinout.svg)

**Links**: [Adafruit product page & per-colour datasheets](https://www.adafruit.com/product/4202) · [Adafruit "All About LEDs" guide](https://learn.adafruit.com/all-about-leds)

**Buy**: [Adafruit #4202 — Diffused 3mm LED Pack (25-pack, 5 colours)](https://www.adafruit.com/product/4202)

**Use instructions/Tutorials**: Identify anode (long lead) and cathode (short lead / flat). Wire GPIO → resistor → anode → LED → cathode → GND. Pick the resistor for your rail: R ≈ (Vsupply − Vf) / 0.02A. For a 5V pin and a red LED (~2V), that's ~150Ω; 220–330Ω is a safe, slightly-dim default. For steady-on indication just tie through the resistor to a rail; for control, drive from a GPIO and `digitalWrite`/`analogWrite` for PWM dimming.

**Arduino IDE sketches**: No library needed.
```cpp
const int LED = 9;               // via ~220Ω resistor
void setup(){ pinMode(LED, OUTPUT); }
void loop(){ for(int b=0;b<=255;b++){ analogWrite(LED,b); delay(4);} }  // fade
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 3mm classic mini package, diffused lens, ~250 mcd typical, 20mA nominal forward current. Pack of 25 (5× red, yellow, green, blue, white). RoHS 2 compliant. Keep continuous current at/below 20mA; PWM lets you dim without changing the resistor.
*Image: lab photo pending — component is in-hand; see Buy link for the product photo.*

**Lab photo**: the photographed pack is the **5mm** one (body width measured against the breadboard's 2.54mm pitch). The 3mm pack is the same five diffused colours in the smaller body; see the 5mm entry.

![Diffused LEDs — the 5mm pack, same five colours](diffused-5mm-led-pack-25-pack-5-colors-1.jpg)
