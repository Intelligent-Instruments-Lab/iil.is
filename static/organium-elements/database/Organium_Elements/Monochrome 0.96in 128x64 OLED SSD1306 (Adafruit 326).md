# Monochrome 0.96" 128x64 OLED SSD1306 (Adafruit 326)

Category: OUTPUTS
Modality: SCREENS
Type: Display
Added: September 2, 2026
Senses: N/A
Actuates: 128 x 64 white pixels — text, graphics, shapes
Connection: I2C (STEMMA QT / Qwiic) at 0x3C or 0x3D, or SPI by cutting jumpers
Status: Done
Voltage: 3-5 V — on-board regulator and boost converter, no level shifter needed
Published: Yes

**Principle**: In an OLED **each pixel is its own light source**. There is no backlight, so black is genuinely off — not dark grey — and contrast is effectively absolute. That is why a small monochrome OLED reads clearly across a room while a much larger LCD of the same price does not, and why it draws current in proportion to how much you actually light up: a mostly-black screen is a cheap screen.

**Function**: 128 x 64 white pixels driven by an **SSD1306** controller. The whole frame is buffered in the host\'s RAM and pushed over I2C or SPI, so the microcontroller needs **1 KB free just for the buffer** — the single most common reason this display fails to work on a small board. Two STEMMA QT connectors, address 0x3C or 0x3D by jumper, and auto-reset circuitry so the reset pin is optional. About 20 mA in practice.

**Voltage**: 3-5 V. The board carries a regulator and a boost converter (OLEDs need a higher rail internally), so a 3.3 V Feather and a 5 V METRO both drive it unmodified.

**Typical use**:
- **The instrument\'s face.** Paired with a rotary encoder it makes a complete menu — turn to scroll, click to select — so a self-contained device can be configured without a laptop attached. That pairing is the standard way a project stops being a sketch and becomes an object.
- **Telling you what the machine thinks.** Live sensor values, connection state, which patch is loaded: the fastest debugging tool there is when serial is not an option because the thing is bolted to a wall.

**Good for**:
- Genuinely readable: true blacks, wide viewing angle, legible in a lit room
- Two wires, plug-and-play on STEMMA QT, 3 V and 5 V hosts alike
- Two addresses, so two screens on one bus
- Low, content-dependent current draw; no backlight to power

**Bad for**:
- **Small-RAM hosts.** 1 KB of buffer against the METRO 328\'s 2 KB total leaves very little for your program. On an ESP32 it is nothing.
- **Burn-in.** A static image left for days ghosts permanently. Blank or shift the display when idle if it runs unattended.
- **Longevity at full brightness** — pixels start to dim after roughly 1000 hours of continuous use, which an always-on installation will reach in six weeks.
- Colour, photographs, or anything needing detail: 128 x 64 monochrome is about 1 KB of information. Use the 7" HDMI screen.

**Mini Jack connection diagram**: N/A - an I2C bus part, reached over the 4-wire STEMMA QT cable (GND / VIN / SDA / SCL).

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page](https://www.adafruit.com/product/326) · [Adafruit learn guide](https://learn.adafruit.com/monochrome-oled-breakouts) · [Adafruit_SSD1306 library](https://github.com/adafruit/Adafruit_SSD1306)

**Buy**: [Adafruit #326](https://www.adafruit.com/product/326)

**Use instructions/Tutorials**: Plug in a STEMMA QT cable and scan the bus - it answers at **0x3C** (0x3D with the jumper bridged). Install **Adafruit SSD1306**, which pulls in **Adafruit GFX**. GFX is the same drawing API used by the Feather TFT displays, so text, shapes and cursor handling transfer directly between them.

Three things to know:

1. **Nothing appears until you call `display.display()`.** Every drawing call writes to the RAM buffer only. A sketch that draws and never pushes looks exactly like a dead screen.
2. **Check the constructor address matches the board.** `begin(SSD1306_SWITCHCAPVCC, 0x3C)` - passing 0x3D to a board still at 0x3C fails silently at init.
3. **On a Feather, drive `TFT_I2C_POWER` HIGH** - on the ESP32-S3 TFT that pin gates the STEMMA QT port as well as the built-in screen, so the OLED never powers up without it. This is the lab\'s most common "my screen is broken".

**Arduino IDE sketches**: Libraries: `Adafruit SSD1306` + `Adafruit GFX`.
```cpp
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(128, 64, &Wire);

void setup() {
  // pinMode(TFT_I2C_POWER, OUTPUT); digitalWrite(TFT_I2C_POWER, HIGH);  // Feather ESP32-S3
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {   // 0x3D if the jumper is bridged
    while (1) delay(10);                              // nothing at that address
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Organium");
  display.display();          // <-- without this the screen stays blank
}

void loop() {}
```

**Relevant software files**: -

**Extra and gratuitous information and images**: SSD1306 controller, 128 x 64 white pixels; PCB 29.2 x 26.7 mm, active area 26.6 x 19 mm, 6.2 mm thick, 4.5 g, 24 mm mounting-hole spacing; two STEMMA QT connectors; I2C or SPI selectable by cutting jumpers on the back.html?file=database/Organium_Elements/I2C%20Rotary%20Encoder%20with%20Encoder%20%28Adafruit%205880%29.md) - ten of each arrived together, which is a menu-and-knob pair per station.
![Monochrome 0.96in 128x64 OLED SSD1306 (Adafruit 326)](monochrome-096in-128x64-oled-ssd1306-adafruit-326-1.jpg)