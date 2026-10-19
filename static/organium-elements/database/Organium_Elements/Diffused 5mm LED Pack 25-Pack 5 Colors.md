# Diffused 5mm LED Pack 25-Pack 5 Colors

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

**Principle**: A light-emitting diode: forward current across a semiconductor junction makes charge carriers recombine and emit photons, at a colour set by the die chemistry. The 5mm epoxy body is diffused (milky), scattering the output so it reads as a soft, uniformly-lit dot across a wide viewing angle instead of one bright hotspot. The larger 5mm dome catches the eye a bit more than the 3mm version.

**Function**: A pack of 25 through-hole indicator LEDs — 5 each of red, yellow, green, blue and white — for status lights, panel indicators, breadboard prototyping and small light points. ~250 mcd typical, readable in daylight.

**Voltage**: Forward voltage ~2V for red/yellow/green and ~3.3V for blue/white, at 20mA. Not a logic device — drive from a 3.3V or 5V pin through a series current-limiting resistor.

**Typical use**:
- Panel and status indicators meant to be read across a room — 5 mm carries further than 3 mm.
- Soft, wide points of light in sculptures, props and set pieces, where the diffused lens hides the die and gives an even glow.

**Good for**:
- Bigger 5mm dome and diffused lens = an even glow that's easy to see across a room and off-axis
- Great fit for panel-mount bezels/holders — the default indicator size
- Five colours in one cheap pack; covers a whole term of prototyping
- Robust and beginner-proof provided a resistor is in the loop

**Bad for**:
- Not addressable — one GPIO/resistor per LED; use NeoPixel/DotStar for many controllable points
- ~250 mcd is indicator-bright, not illumination — won't light a scene
- Blue/white need ~3.3V, so they're marginal on a drained battery
- No integrated resistor — omit it and you'll burn the LED or the pin
- 5mm through-hole is bulky for dense/compact PCB work — go SMD or 3mm there

**Mini Jack connection diagram**: N/A — 2-lead component. Longer lead = anode (+), shorter lead / flat on the flange = cathode (−). Always include a series resistor (e.g. ~220–330Ω on 5V, ~100–150Ω on 3.3V).

**Component diagram**:

![LED pinout — anode, cathode, and the series-resistor rule](diagram-led-pinout.svg)

**Links**: [Adafruit product page & per-colour datasheets](https://www.adafruit.com/product/4203) · [Adafruit "All About LEDs" guide](https://learn.adafruit.com/all-about-leds)

**Buy**: [Adafruit #4203 — Diffused 5mm LED Pack (25-pack, 5 colours)](https://www.adafruit.com/product/4203)

**Use instructions/Tutorials**: Identify anode (long lead) and cathode (short lead / flat side). Wire GPIO → resistor → anode → LED → cathode → GND. Size the resistor for your rail: R ≈ (Vsupply − Vf) / 0.02A — about 150Ω for a red LED on 5V; 220–330Ω is a safe, slightly-dim default. Fits standard 5mm panel bezels for a clean front-panel indicator. Use PWM (`analogWrite`) to dim without swapping resistors.

**Arduino IDE sketches**: No library needed.
```cpp
const int LED = 9;               // via ~220Ω resistor
void setup(){ pinMode(LED, OUTPUT); }
void loop(){ digitalWrite(LED, HIGH); delay(500);
             digitalWrite(LED, LOW);  delay(500); }
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 5mm classic package, diffused lens, ~250 mcd typical, 20mA nominal forward current. Pack of 25 (5× red, yellow, green, blue, white). Fits standard 5mm panel-mount holders. Keep continuous current at/below 20mA.
![Diffused 5mm LED Pack 25-Pack 5 Colors](diffused-5mm-led-pack-25-pack-5-colors-1.jpg)