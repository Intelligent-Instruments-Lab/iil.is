# Adafruit ESP32-S2 TFT Feather

Category: PROCESSING
Modality: ESP32
Type: Integrated System
Added: July 25, 2026
Senses: Input from attached I2C / analog / digital sensors; on-board LiPo voltage and charge state (MAX17048)
Actuates: WiFi/USB data, on-board 240x135 colour TFT, NeoPixel, and forwards sensor data on to your computer
Connection: STEMMA QT (I2C), USB-C, SPI, analog/digital GPIO
Status: Done
Voltage: 3.3V logic (powered from USB-C 5V or 3.7V LiPo)
Published: Yes

**Principle**: A compact ESP32-S2 single-core (240 MHz Tensilica) microcontroller board in the Feather form factor. The S2 brings native USB (so it can pretend to be a keyboard, mouse, disk drive or MIDI device) plus 2.4 GHz WiFi. A 1.14" IPS colour TFT (ST7789, 240x135) is soldered on the front for status readouts without wiring a screen, and a STEMMA QT / Qwiic connector lets you chain I2C sensors with no soldering. An on-board MAX17048 fuel gauge reports battery voltage and state-of-charge over I2C, and a USB-C charger tops up a plugged-in LiPo.

**Function**: General-purpose WiFi/USB microcontroller with a built-in display, battery management and solderless I2C expansion. Reads sensors, drives outputs, runs networked logic, and shows state on its own screen.

**Voltage**: 3.3V logic level. Powered from USB-C (5V) or a 3.7V LiPo battery; the STEMMA QT port carries switchable 3.3V to attached sensors.

**Typical use**:
- Wireless sensor and gesture instruments — read an IMU or a SoftPot over STEMMA QT, stream OSC or MIDI over WiFi, and watch the live values on the TFT instead of a serial monitor.
- Battery-powered nodes where the on-board LiPo charger and fuel gauge matter: the screen reports charge state with no laptop attached.

**Good for**:
- Plug-and-play sensor bring-up: STEMMA QT + Adafruit's driver library covers hundreds of parts
- Seeing state without a laptop — the soldered TFT is genuinely handy for headless/battery projects
- Honest battery projects: real fuel gauge + charger, not a bare JST pad
- CircuitPython or Arduino; native USB makes it a clean HID/MIDI device

**Bad for**:
- Audio-rate DSP and heavy compute — it is a single-core S2, slower than an S3 and no Bluetooth
- Projects needing many pins — the Feather footprint is deliberately small, and the TFT/fuel-gauge eat some I2C/SPI lines
- High-current loads — drive motors/LEDs from a separate supply, not the 3.3V regulator
- Cases where you want a bigger/touch screen — the 1.14" is status-sized, not a UI

**Mini Jack connection diagram**: N/A — I2C over STEMMA QT: VIN/GND/SCL/SDA. Also breaks out USB-C, LiPo JST, and Feather GPIO (SPI, I2C, analog ADC pins A0–A5). Not a jack-patchable analog/CV part; sensors attach over the bus or header rather than a 3.5mm panel.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit learn guide](https://learn.adafruit.com/adafruit-esp32-s2-tft-feather) · [ESP32-S2 datasheet (Espressif)](https://www.espressif.com/sites/default/files/documentation/esp32-s2_datasheet_en.pdf) · [ST7789 TFT / MAX17048 fuel-gauge libraries](https://github.com/adafruit/Adafruit-ST7735-Library)

**Buy**: [Adafruit product 5300](https://www.adafruit.com/product/5300)

**Use instructions/Tutorials**: Install the Espressif ESP32 board support in the Arduino IDE (or drag CircuitPython UF2 via the double-tap DFU/bootloader). Select "Adafruit Feather ESP32-S2 TFT". The TFT backlight is on `TFT_I2C_POWER` / `TFT_BACKLITE` — you must drive `TFT_I2C_POWER` HIGH to power both the display and the STEMMA QT port. Use `Adafruit_ST7789` for the screen and `Adafruit_MAX1704X` for the fuel gauge. Chain I2C sensors on the STEMMA QT port; scan with an I2C-scanner sketch to confirm addresses.

**Arduino IDE sketches**: `Adafruit_ST7789` + `Adafruit_GFX` + `Adafruit_MAX1704X`. Minimal display + battery readout:
```cpp
#include <Adafruit_ST7789.h>
#include <Adafruit_MAX1704X.h>
Adafruit_ST7789 tft = Adafruit_ST7789(&SPI1, TFT_CS, TFT_DC, TFT_RST);
Adafruit_MAX17048 lipo;
void setup() {
  pinMode(TFT_I2C_POWER, OUTPUT); digitalWrite(TFT_I2C_POWER, HIGH); // powers TFT + STEMMA QT
  tft.init(135, 240); tft.setRotation(3);
  lipo.begin(&Wire);
}
void loop() {
  tft.fillScreen(ST77XX_BLACK); tft.setCursor(0,0);
  tft.print(lipo.cellPercent()); tft.println("%");
  delay(1000);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: ESP32-S2 @ 240 MHz single-core, 4 MB Flash, 2 MB PSRAM. TFT: 1.14" IPS, 240x135, ST7789. Fuel gauge MAX17048 at I2C address 0x36. STEMMA QT power is switched via `TFT_I2C_POWER`. Native USB-C (HID / MSC / MIDI). 2.4 GHz WiFi (no Bluetooth on the S2). NeoPixel + charge/user LEDs, RESET and DFU/BOOT buttons. Deep sleep ~80–100 µA with power rails switched off. Board size 52.4 x 22.8 x 7.2 mm.
![Adafruit ESP32-S2 TFT Feather](adafruit-esp32-s2-tft-feather-1.jpg)