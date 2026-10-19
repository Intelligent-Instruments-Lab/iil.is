# ESP32 TTGO T7 v1.3 Mini32 (LilyGO)

Category: PROCESSING
Modality: ESP32
Type: Integrated System
Added: January 18, 2023 4:18 PM
Senses: N/A — it is the host; sensors connect to it
Actuates: N/A — it runs the code that reads sensors and drives outputs
Connection: Micro-USB (CH34x serial) · WiFi · Bluetooth · 2.54 mm headers · JST battery connector
Status: Done
Voltage: 3.3 V logic, not 5 V tolerant. Power from USB, a LiPo on the battery connector, or 5–12 V unregulated into the 5V pin
Published: Yes

**Principle**: An ESP32 on a small breakout. The ESP32 is a dual-core 240 MHz microcontroller with **WiFi and Bluetooth on the die** — that is the whole reason to reach for one instead of an Arduino. It also brings capacitive touch inputs, two DACs and far more RAM, at the cost of a 3.3 V world where an Arduino tolerated 5 V. This particular board is LilyGO's **T7 v1.3 "Mini32"**: the ESP32 module, a USB-serial chip, a regulator and a LiPo connector, and little else.

**Function**: The host for a wireless instrument or sensor node. Code it in the Arduino IDE, PlatformIO or MicroPython; it reads sensors over I2C, SPI or the analog pins and sends the result onward over WiFi — OSC and MIDI over the network are the usual pattern — or over Bluetooth, or to whatever you wire to it.

**Voltage**: 3.3 V logic. **Nothing on this board is 5 V tolerant**: a 5 V sensor output on a GPIO can damage it, so use a level shifter. Power from USB, from a LiPo on the JST connector, or from an unregulated 5–12 V supply into the 5V pin and GND.

**Typical use**:
- Wireless sensor nodes and instruments — the board reads the sensors and streams OSC or MIDI over WiFi to a laptop, with no cable to trip over.
- Battery-powered pieces that must keep running unplugged: the LiPo connector and the deep-sleep modes are both on board.

**Good for**:
- WiFi and Bluetooth without an add-on radio, which is the entire argument for it
- Two cores and plenty of RAM — networking on one, your loop on the other
- Capacitive touch pins straight on the chip; see the ESP-32 touch sensor entry
- Runs from a LiPo and charges over USB; deep sleep measured in microamps

**Bad for**:
- Audio-rate work and hard real-time timing — WiFi activity steals cycles at unpredictable moments
- Anything that assumes 5 V tolerance; it has none
- Clean analog input: the ADC is noisy and non-linear near the rails, and **ADC2 cannot be read while WiFi is on**
- A weak supply — the radio draws current in bursts on transmit, and an undersized USB port shows up as random reboots rather than as an obvious power fault

**Typical gotchas — the four things that cost a day with this board**:

**1 · The USB port may not appear at all.** The serial chip is a **CH34x**, which macOS has no driver for. Install it from [wch.cn](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html) following the [WCH instructions](https://github.com/WCHSoftGroup/ch34xser_macos). Until then the board is invisible to the IDE and looks dead.

**2 · The I2C pins are mislabelled.** The published pinout names the wrong pins for SDA and SCL, so I2C fails out of the box with nothing pointing at the cause. Fix it in the board's `pin_arduino.h`:

```c
static const uint8_t SDA = 19;
static const uint8_t SCL = 23;
```

On macOS that file is inside the hidden Library folder — Finder's *Go* menu with alt/opt held — at a path like `~/Library/Arduino15/packages/esp32/hardware/esp32/3.1.0/variants/ttgo-t7-v13-mini32`. **Every ESP32 core update resets the file**, and I2C silently stops working until you edit it again.

**3 · OSC and analog input can collide.** On some systems, instantiating OSC conflicts with certain ADC pins; prefer `analogRead` on **pin 32**.

**4 · A sketch that will not upload.** Current spikes can leave the flash status in a state that blocks uploads. Clear it once with `esptool.py write_flash_status --non-volatile 0`.

**Mini Jack connection diagram**: N/A — a host board, not a patchable element. Sensors reach it over I2C (see the pin warning above), SPI or the analog pins.

**Component diagram**:

![TTGO pinout — note that SDA and SCL are not labelled correctly here](esp-32-ttgo-3.jpeg)

![TTGO board dimensions](esp-32-ttgo-2.jpeg)

**Links**: [LilyGO ESP32-MINI-32 V1.3 repository](https://github.com/LilyGO/ESP32-MINI-32-V1.3) · [CH34x macOS driver](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html) · [CH34x install instructions](https://github.com/WCHSoftGroup/ch34xser_macos)

**Buy**: [LilyGO product page](http://www.lilygo.cn/prod_view.aspx?TypeId=50063&Id=1258)

**Use instructions/Tutorials**: Install the ESP32 boards package in the Arduino IDE, install the CH34x driver, then select the TTGO T7 v1.3 Mini32 variant. Apply the `pin_arduino.h` edit above before expecting I2C to work, and re-apply it after every core update. For battery use, a LiPo plugs into the JST connector and charges over USB.

**Arduino IDE sketches**: Standard ESP32 core — a WiFi connection is four lines.
```cpp
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  WiFi.begin("ssid", "password");
  while (WiFi.status() != WL_CONNECTED) { delay(250); Serial.print('.'); }
  Serial.println(WiFi.localIP());
}
void loop() {}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: ESP32 dual-core at 240 MHz, WiFi b/g/n and Bluetooth, capacitive touch inputs, two DACs, CH34x USB-serial, JST LiPo connector with charging, 3.3 V logic throughout. The pinout image above is the one that shipped with the board — it is the document with the wrong I2C labels, kept because it is otherwise the clearest view of the pin layout.

![ESP32 TTGO board](esp-32-ttgo-4.jpg)

![ESP32 TTGO](esp-32-ttgo-1.jpeg)
