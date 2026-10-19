# Adafruit METRO 328 (Arduino Compatible)

Category: PROCESSING
Modality: SYSTEMS
Type: Microcontroller board
Added: September 2, 2026
Senses: N/A
Actuates: N/A — the board that runs your code and drives everything else
Connection: 20 digital I/O (6 PWM) · 6 analog in · hardware SPI, I2C, UART · micro-USB (CP2104) · 2.1 mm barrel jack
Status: Done
Voltage: **5 V logic** — the only 5 V board in a lab that is otherwise 3.3 V
Published: Yes

**Principle**: A faithful clone of the Arduino Uno: ATmega328 at 16 MHz with the Optiboot bootloader, the Uno board outline, the Uno pinout, and full compatibility with "Classic" and R3 shields. In the Arduino IDE you select **Arduino UNO** and everything behaves as the tutorials say it will.

It was chosen over a real Uno for one specific reason: it is a **genuinely good 5 V board**. Adafruit fixed the Uno's weakest points — a genuine CP2104 USB-serial chip instead of the flaky clone chips, proper regulators, and pre-soldered headers — while keeping the part that matters here, which is that it thinks and speaks in 5 volts.

**Function**: 32 KB flash (31.5 KB after the bootloader), 2 KB RAM. 20 digital I/O, 6 of them PWM across three timers (one 16-bit, two 8-bit), 6 analog inputs, and hardware SPI/I2C/UART. Powered over micro-USB or a 7–9 V DC barrel jack with polarity protection, auto-switching between the two. On-board 5 V regulator (~800 mA peak) and 3.3 V regulator (~150 mA peak).

**Voltage**: **5 V logic, and that is the point.** Nearly everything else here — Feathers, QT Py, Pi, Trill — is 3.3 V. When you meet a 5 V sensor, a 5 V shield, a classic robotics part or a piece of logic that needs a real 5 V high, this is the board that talks to it directly instead of through a level shifter. Its inputs also read 3.3 V signals happily, so it can listen to 3.3 V parts without conversion; it is only the other direction that needs care.

**Typical use**:
- **Anything shield-shaped.** Two decades of Arduino shields and 5 V add-ons plug straight on. If a project starts from an existing Uno tutorial or a shield, this is the board.
- **Teaching the fundamentals.** No WiFi, no OS, no bootloader modes to get stuck in, 2 KB of RAM and a single loop — a small enough machine that a beginner can hold the whole thing in their head, which is exactly what the ESP32s are too big and clever for.

**Good for**:
- 5 V logic without shifters, in a 3.3 V lab
- Shield compatibility and an enormous body of existing tutorials
- Robust and hard to brick — a plain serial bootloader, no double-tap bootloader states, no UF2 drive to fall into
- Deterministic: one program, one loop, no scheduler surprises

**Bad for**:
- **Wireless.** No WiFi, no Bluetooth. Use an ESP32 board.
- **Memory.** 2 KB of RAM is enough for a display buffer *or* your data, rarely both — the SSD1306 alone wants 1 KB.
- **Speed and maths.** 16 MHz, 8-bit, no floating-point unit. Audio DSP and anything numeric belongs elsewhere.
- **3.3 V-only sensors driven from its outputs** — a 5 V output into a 3.3 V part is how sensors die. Shift down.

**Mini Jack connection diagram**: N/A — a board, not a patchable module. Its pins reach jacks and breadboards like any other host.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page](https://www.adafruit.com/product/2488) · [Adafruit learn guide](https://learn.adafruit.com/adafruit-metro-328-arduino-compatible) · [Arduino language reference](https://docs.arduino.cc/language-reference/)

**Buy**: [Adafruit #2488](https://www.adafruit.com/product/2488)

**Use instructions/Tutorials**: Plug in micro-USB, choose **Arduino UNO** as the board and the CP2104 port, and upload. Headers are pre-soldered, so it works out of the box.

Two practical notes:

- **Powering from the barrel jack wants 7–9 V**, not 12 V. The linear regulator burns the difference as heat, so a 12 V supply into a busy board gets uncomfortably hot. The lab's adjustable supply set to 9 V is the right source.
- **It can be converted to 3.3 V logic** by a jumper modification on the board, which also drops it to 8 MHz. Almost never what you want here — the whole reason to reach for this board is the 5 V.

**Arduino IDE sketches**: No library needed; select **Arduino UNO**.
```cpp
// The 5V board reading a 5V sensor directly — no level shifter in sight.
const int SENSOR = A0;
const int LED    = 13;      // on-board LED

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  int v = analogRead(SENSOR);          // 0..1023 across 0..5V
  Serial.println(v);
  digitalWrite(LED, v > 512);
  delay(20);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: ATmega328 @ 16 MHz, Optiboot; genuine CP2104 USB-serial (since the 2018 revision); 53 × 71 mm, 13 mm tall with the barrel jack, 19 g; pre-soldered headers since 2017. See `physical-library/BOXES.md`.
![Adafruit METRO 328 (Arduino Compatible)](adafruit-metro-328-arduino-compatible-1.jpg)