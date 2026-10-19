# DotStar LED Strip Warm White 60 LED/m

Category: OUTPUTS
Modality: LIGHT
Type: Actuator, Transducer, Integrated System
Added: July 25, 2026
Senses: N/A
Actuates: Addressable warm-white light (per-pixel brightness, ~3000K)
Connection: SPI (clock + data), 5V
Status: Done
Voltage: 5V DC (max 6V)
Published: Yes

**Principle**: Each 5mm segment carries an APA102C "smart" LED die with an integrated constant-current driver and its own PWM channel. Two wires carry a clock and a data line; each chip latches its byte and passes the rest down the chain, so the whole strip is one long SPI shift register. High-frequency PWM (well above the NeoPixel rate) means no visible flicker on camera — you can film it without banding.

**Function**: A 1-metre flexible strip of 60 individually addressable warm-white (~3000K) LEDs. You set a per-pixel 0–255 brightness plus a global 5-bit current-limit field, giving smooth, filmable dimming from a candle glow to full output.

**Voltage**: 5V DC power (never above 6V). Logic is 5V SPI; a 3.3V microcontroller (Pico, ESP32, Feather) drives it fine in practice, but a level shifter on clock/data is the safe move for long runs.

**Typical use**:
- Warm architectural glow that is still addressable pixel by pixel — a strip that lights a space rather than colouring it.
- Anything that will be filmed: the SPI refresh is far faster than PWM strips, so it records without banding or flicker.

**Good for**:
- Filmable, flicker-free dimming thanks to fast PWM — the reason to pick DotStar over NeoPixel on camera
- Clock line means timing is forgiving; no microsecond-precise bit-banging, works over slow/interrupt-heavy loops
- Warm white reads as "light", not "gadget" — kinder in galleries and on skin than raw RGB
- Cut every single LED; solder 0.1" pads to resize freely

**Bad for**:
- White only — no colour mixing; buy the RGB DotStar if you need hue
- Current adds up fast (three white dies per pixel); a full metre wants a proper 5V supply, not USB
- Two wires (clock + data) uses one more pin than NeoPixel and is slightly pricier per LED
- Not for precise colorimetry or reference white — it is decorative lighting

**Mini Jack connection diagram**: N/A — SPI bus, not jack-patchable. Pins: 5V (+), GND, CI (clock in), DI (data in). Observe the arrow: data flows in one direction only.

**Component diagram**: See product page / lab photo pending.

**Links**: [APA102C datasheet](https://cdn-shop.adafruit.com/product-files/2343/APA102C.pdf) · [Adafruit DotStar guide](https://learn.adafruit.com/adafruit-dotstar-leds) · [Adafruit_DotStar library](https://github.com/adafruit/Adafruit_DotStar)

**Buy**: [Adafruit #2586 — DotStar Warm White 60 LED/m](https://www.adafruit.com/product/2586)

**Use instructions/Tutorials**: Cut to length at any pixel boundary. Wire 5V and GND to a supply that can source your worst-case current, and common-ground it with the microcontroller. Connect CI→clock pin, DI→data pin, respecting the data-flow arrow printed on the strip. Budget power at roughly 60mA per pixel at full white (~3.6A for a full metre) and inject 5V at both ends for long runs so the far end doesn't dim/pink-shift.

**Arduino IDE sketches**: Library: `Adafruit_DotStar`.
```cpp
#include <Adafruit_DotStar.h>
#define N 60
Adafruit_DotStar strip(N, DATAPIN, CLOCKPIN, DOTSTAR_BGR);
void setup(){ strip.begin(); strip.setBrightness(64); strip.show(); }
void loop(){
  for(int i=0;i<N;i++){ strip.setPixelColor(i, 255,255,255); strip.show(); delay(20);
    strip.setPixelColor(i, 0); }
}
```

**Relevant software files**: — (use `Adafruit_DotStar`; FastLED also supports APA102)

**Extra and gratuitous information and images**: APA102C chip, up to 32MHz clock. Pixel pitch 16mm (0.6"); LED 5mm × 5mm; strip 14mm wide, 4mm thick with weatherproof sheathing. ~3000K warm white, three white dies per pixel, high-frequency PWM. 4-pin JST-SM connectors on full reels; cut lines every LED. RoHS.
*Image: lab photo pending — component is in-hand; see Buy link for the product photo.*

**Lab photo**: this strip is photographed alongside the NeoPixel RGB strip in one frame — the warm-white DotStar is the upper strip. Both share the photo for now; see also the NeoPixel entry.

![DotStar warm-white strip (top) with the NeoPixel RGB strip (bottom)](neopixel-addressable-rgb-led-strip-adafruit-3919-1.jpg)

**Lab photo**: the two strips were photographed together — the warm-white DotStar alongside the addressable RGB NeoPixel, which is the quickest way to see the difference in density and in how the light reads.
![LED strips — the warm-white DotStar alongside the RGB NeoPixel](dotstar-led-strip-warm-white-60-ledm-1.jpg)
