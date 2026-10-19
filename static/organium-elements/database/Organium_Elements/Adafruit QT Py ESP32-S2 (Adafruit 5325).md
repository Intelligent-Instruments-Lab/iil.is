# Adafruit QT Py ESP32-S2 (Adafruit 5325)

Category: PROCESSING
Modality: ESP32
Type: Microcontroller
Added: August 6, 2026
Senses: N/A (runs your code; reads attached sensors over I2C/GPIO)
Actuates: Wi-Fi networking, GPIO, drives STEMMA QT / I2C devices
Connection: USB-C, STEMMA QT (I2C), Wi-Fi, castellated GPIO pads
Status: Done
Voltage: 3.3 V logic (on-board regulator; powered from 5 V USB-C or 3.3–5 V pad)
Published: Yes

**Principle**: A thumbnail-sized dev board built around Espressif's **ESP32-S2** (single-core Xtensa LX7 @ 240 MHz, Wi-Fi, **no Bluetooth**), with 4 MB flash + 2 MB PSRAM and **native USB** (it can enumerate as keyboard, MIDI, mass-storage, etc.). Same "QT Py" footprint and pinout as the SAMD/RP2040 QT Py boards, so it drops into the same projects — but with Wi-Fi. A **STEMMA QT** connector puts the I2C bus one plug away from the whole sensor library.

**Function**: Runs your program (CircuitPython or Arduino/ESP-IDF) and talks to the world over Wi-Fi, USB and I2C. The tiny form factor makes it the "put the brains right next to the sensor" board for wearables, props and distributed installations.

**Typical use**:
- Many small Wi-Fi nodes, one sensor each, publishing to a room hub over MQTT or OSC.
- A coin-sized sensor node for places a larger board will not fit — plug in a STEMMA QT sensor and go, with no soldering.

**Good for**:
- Wi-Fi in a 22 × 18 mm board; STEMMA QT = solderless sensors.
- Native USB (HID/MIDI/CIRCUITPY drive) without an extra chip.
- CircuitPython-friendly for beginners; Arduino/ESP-IDF for advanced.
- Drop-in QT Py pinout — reuse existing QT Py wiring.

**Bad for**:
- **No Bluetooth** — if you need BLE, use an ESP32-S3/-C3 board instead.
- Few GPIO broken out (it's tiny) — use an I2C expander for lots of pins.
- Single core — heavy Wi-Fi + audio DSP at once can starve.
- Not 5 V tolerant on logic pins.

**Mini Jack connection diagram**: N/A — power over USB-C; sensors over the STEMMA QT (I2C: 3V3 / GND / SDA / SCL). Castellated pads break out SPI/UART/ADC/GPIO if you solder headers.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [Adafruit QT Py ESP32-S2 — product page](https://www.adafruit.com/product/5325)
- [Adafruit Learn: QT Py ESP32-S2 guide](https://learn.adafruit.com/adafruit-qt-py-esp32-s2)
- [ESP32-S2 datasheet (Espressif)](https://www.espressif.com/en/products/socs/esp32-s2)

**Buy**: [Adafruit #5325](https://www.adafruit.com/product/5325)

**Use instructions/Tutorials**: For CircuitPython, drag the `.uf2`/firmware per the Learn guide, then edit `code.py` on the CIRCUITPY drive. For Arduino, install the ESP32 board package, select "Adafruit QT Py ESP32-S2", hold BOOT + tap RESET to enter the bootloader if needed. Connect a STEMMA QT sensor and scan the I2C bus first to confirm the address.

**Arduino IDE sketches**: Board package: `esp32` (Espressif). Wi-Fi + I2C scan starting point:
```cpp
#include <WiFi.h>
#include <Wire.h>
void setup() {
  Serial.begin(115200);
  Wire.begin();               // STEMMA QT
  WiFi.begin("SSID", "PASS");
  while (WiFi.status() != WL_CONNECTED) { delay(200); Serial.print("."); }
  Serial.println(WiFi.localIP());
  for (uint8_t a = 1; a < 127; a++) {   // find attached I2C sensors
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) { Serial.print("I2C 0x"); Serial.println(a, HEX); }
  }
}
void loop() {}
```

**Relevant software files**: N/A (CircuitPython `code.py` or Arduino sketch).

**Extra and gratuitous information and images**: ESP32-S2, 240 MHz, 4 MB flash / 2 MB PSRAM, Wi-Fi b/g/n, **no BLE**. Native USB (TinyUSB). STEMMA QT / Qwiic I2C. Reset + BOOT buttons, RGB NeoPixel + user LED on board. Castellated + through-hole pads.
![Adafruit QT Py ESP32-S2 (Adafruit 5325)](adafruit-qt-py-esp32-s2-adafruit-5325-1.jpg)