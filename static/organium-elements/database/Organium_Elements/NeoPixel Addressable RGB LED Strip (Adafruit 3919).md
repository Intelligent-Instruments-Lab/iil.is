# NeoPixel Addressable RGB LED Strip (Adafruit 3919)

Category: OUTPUTS
Modality: LIGHT
Type: Actuator
Added: August 6, 2026
Senses: N/A
Actuates: Per-pixel addressable colour light (each LED set independently)
Connection: Single-wire data + 5 V power (3-pin JST PH); WS2812B / SK6812
Status: Done
Voltage: 5 V (data logic 5 V; a 3.3 V MCU usually needs a level shifter or the first-pixel trick)
Published: Yes

**Principle**: A flexible strip of **addressable** RGB (or RGBW) LEDs. Each LED contains a tiny driver chip (WS2812B "NeoPixel", or SK6812 for the RGBW variant) that latches one 24-bit (32-bit RGBW) colour and passes the rest of the data down the line. One microcontroller pin controls a whole chain — you send a packed byte-stream, timing-critical, and every pixel lights independently. Covers the **Adafruit NeoPixel 3-pin JST-PH strip (#3919)** and the **BTF-Lighting SK6812 RGBW 5 m** roll in stock.

**Function**: Turns one GPIO pin into an arbitrarily long ribbon of individually-coloured lights. The RGBW (SK6812) variant adds a dedicated white LED for clean pastels and true whites that RGB-only strips can't make.

**Typical use**:
- Colour-mapped light that reacts to sensors across a room — one data pin addresses the whole strip, so the mapping lives in code rather than in wiring.
- Per-note or per-voice feedback along an instrument, and glowing trim on props, costumes and set pieces.

**Good for**:
- Independent control of every pixel from a single pin.
- Long runs, cuttable between LEDs, chainable.
- RGBW (SK6812) for accurate whites and softer pastels.
- Huge library support (Adafruit NeoPixel, FastLED).

**Bad for**:
- **Power** — full white ≈ 60 mA per RGB LED; a 5 m strip can pull several amps. **Never power a long strip from the MCU's 5 V pin — use a separate 5 V supply**, common ground.
- 3.3 V data — WS2812/SK6812 want ~5 V logic; from a 3.3 V board use a level shifter (or sacrifice the first pixel as a buffer).
- Timing-critical protocol — no clock line (unlike DotStar/APA102); heavy interrupts can glitch it.
- Inrush — add a big electrolytic cap across 5 V/GND and a ~330 Ω series resistor on the data line.

**Mini Jack connection diagram**: N/A — 3 wires: **5 V**, **GND**, **DIN** (data in, arrow marks flow direction). Inject 5 V/GND at both ends for long runs.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [Adafruit NeoPixel — Überguide](https://learn.adafruit.com/adafruit-neopixel-uberguide)
- [Adafruit NeoPixel Arduino library](https://github.com/adafruit/Adafruit_NeoPixel)
- [FastLED library](https://github.com/FastLED/FastLED)

**Buy**: [Adafruit NeoPixel strip #3919](https://www.adafruit.com/product/3919) · BTF-Lighting SK6812 RGBW 5 m — Amazon

**Use instructions/Tutorials**: Wire 5 V/GND to a dedicated supply (share GND with the MCU), DIN through a ~330 Ω resistor to a GPIO, add a 1000 µF cap across 5 V/GND. In Arduino, set the LED count and type (`NEO_GRB` vs `NEO_GRBW` for SK6812). Start dim to keep current sane while testing.

**Arduino IDE sketches**: Library: `Adafruit_NeoPixel`.
```cpp
#include <Adafruit_NeoPixel.h>
#define PIN 5
#define N   60
Adafruit_NeoPixel strip(N, PIN, NEO_GRBW + NEO_KHZ800); // NEO_GRB for RGB-only #3919
void setup(){ strip.begin(); strip.setBrightness(40); strip.show(); }
void loop(){
  for (int i=0;i<N;i++){ strip.setPixelColor(i, strip.ColorHSV((i*65536L/N))); }
  strip.show(); delay(30);
}
```

**Relevant software files**: N/A.

**Extra and gratuitous information and images**: WS2812B (RGB, #3919) and SK6812 (RGBW roll) both single-wire, 800 kHz, 5 V. ~60 mA/RGB LED at full white; budget power and inject at both ends on long strips. Cuttable at the copper pads; DIN→DOUT chaining. DotStar/APA102 (see the Warm-White DotStar entry) is the clocked alternative when timing is a problem.
![NeoPixel Addressable RGB LED Strip (Adafruit 3919)](neopixel-addressable-rgb-led-strip-adafruit-3919-1.jpg)